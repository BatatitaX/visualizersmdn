import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contactHandler from './api/contact.js'

const MAX_REQUEST_SIZE = 64 * 1024

async function readJsonBody(request) {
  const chunks = []
  let receivedBytes = 0

  for await (const chunk of request) {
    receivedBytes += chunk.length

    if (receivedBytes > MAX_REQUEST_SIZE) {
      throw new Error('REQUEST_TOO_LARGE')
    }

    chunks.push(chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')

  if (!rawBody) {
    return null
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    return null
  }
}

function createResponseAdapter(response) {
  return {
    setHeader(name, value) {
      response.setHeader(name, value)
      return this
    },
    status(statusCode) {
      response.statusCode = statusCode
      return this
    },
    json(payload) {
      response.setHeader('Content-Type', 'application/json; charset=utf-8')
      response.end(JSON.stringify(payload))
      return this
    },
  }
}

function contactApiPlugin() {
  return {
    name: 'smdn-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (request, response) => {
        try {
          request.body = await readJsonBody(request)
          await contactHandler(request, createResponseAdapter(response))
        } catch (error) {
          const requestTooLarge = error instanceof Error && error.message === 'REQUEST_TOO_LARGE'

          response.statusCode = requestTooLarge ? 413 : 500
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify({
            message: requestTooLarge
              ? 'O conteúdo enviado é muito grande.'
              : 'Erro interno ao processar o formulário.',
          }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  for (const key of ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'GMAIL_SENDER_NAME']) {
    if (env[key]) {
      process.env[key] = env[key]
    }
  }

  const gmailConfigured = Boolean(
    process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD,
  )

  console.info(
    `[formulário] Gmail ${gmailConfigured ? 'configurado' : 'não configurado'}.`,
  )

  return {
    plugins: [react(), contactApiPlugin()],
  }
})
