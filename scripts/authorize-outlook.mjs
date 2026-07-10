import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const ENV_PATH = resolve(process.cwd(), '.env.local')
const DEVICE_CODE_ENDPOINT = 'https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode'
const TOKEN_ENDPOINT = 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token'
const SCOPE = 'offline_access https://graph.microsoft.com/Mail.Send'

function parseEnv(content) {
  const values = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separator = line.indexOf('=')

    if (separator === -1) {
      continue
    }

    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
    values[key] = value
  }

  return values
}

function setEnvValue(content, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`^${escapedKey}=.*$`, 'm')
  const line = `${key}=${value}`

  if (pattern.test(content)) {
    return content.replace(pattern, line)
  }

  const suffix = content && !content.endsWith('\n') ? '\n' : ''
  return `${content}${suffix}${line}\n`
}

async function requestJson(url, options) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(payload?.error_description || payload?.error || 'Falha na autenticação Microsoft.')
    error.payload = payload
    error.status = response.status
    throw error
  }

  return payload
}

async function sleep(milliseconds) {
  await new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds))
}

async function main() {
  let envContent = ''

  try {
    envContent = await readFile(ENV_PATH, 'utf8')
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error
    }
  }

  const env = parseEnv(envContent)
  const clientId = process.env.MICROSOFT_CLIENT_ID || env.MICROSOFT_CLIENT_ID

  if (!clientId) {
    throw new Error('Defina MICROSOFT_CLIENT_ID no arquivo .env.local antes de autorizar o Outlook.')
  }

  const deviceCode = await requestJson(DEVICE_CODE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      scope: SCOPE,
    }),
  })

  console.log('\nAutorize a conta Outlook que enviará os formulários:')
  console.log(deviceCode.message || `Abra ${deviceCode.verification_uri} e informe o código ${deviceCode.user_code}.`)
  console.log('\nAguardando a confirmação...\n')

  let intervalSeconds = Math.max(Number(deviceCode.interval) || 5, 5)
  const expiresAt = Date.now() + (Number(deviceCode.expires_in) || 900) * 1000

  while (Date.now() < expiresAt) {
    await sleep(intervalSeconds * 1000)

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        client_id: clientId,
        device_code: deviceCode.device_code,
      }),
    })

    const token = await response.json().catch(() => null)

    if (response.ok && token?.refresh_token) {
      const updatedEnv = setEnvValue(envContent, 'MICROSOFT_REFRESH_TOKEN', token.refresh_token)
      await writeFile(ENV_PATH, updatedEnv, { encoding: 'utf8', mode: 0o600 })
      console.log('Autorização concluída. O refresh token foi salvo em .env.local.')
      console.log('Reinicie npm run dev antes de testar o formulário.')
      return
    }

    if (token?.error === 'authorization_pending') {
      continue
    }

    if (token?.error === 'slow_down') {
      intervalSeconds += 5
      continue
    }

    if (token?.error === 'authorization_declined') {
      throw new Error('A autorização foi recusada na página da Microsoft.')
    }

    if (token?.error === 'expired_token') {
      throw new Error('O código expirou. Execute npm run outlook:authorize novamente.')
    }

    throw new Error(token?.error_description || token?.error || 'A Microsoft não concluiu a autorização.')
  }

  throw new Error('O código expirou. Execute npm run outlook:authorize novamente.')
}

main().catch((error) => {
  console.error(`\nErro: ${error.message}`)
  process.exitCode = 1
})
