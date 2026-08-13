import nodemailer from 'nodemailer'

const DESTINATION_EMAIL = 'smdn.pi@outlook.com'
const EMAIL_SUBJECT = 'Formulário PREVER'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseRequestBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return null
    }
  }

  return body && typeof body === 'object' ? body : null
}

function cleanSingleLine(value, maxLength) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function cleanMessage(value, maxLength) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, maxLength)
}

function getMailConfiguration() {
  const user = cleanSingleLine(process.env.GMAIL_USER, 254).toLowerCase()
  const password = String(process.env.GMAIL_APP_PASSWORD ?? '').replace(/\s+/g, '')
  const senderName = cleanSingleLine(
    process.env.GMAIL_SENDER_NAME || 'PREVER',
    100,
  )

  if (!EMAIL_PATTERN.test(user) || !password) {
    return null
  }

  return { user, password, senderName }
}

function createTransport({ user, password }) {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: password,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })
}

function getMailErrorMessage(error) {
  const code = String(error?.code ?? '').toUpperCase()
  const responseCode = Number(error?.responseCode ?? 0)

  if (code === 'EAUTH' || responseCode === 535) {
    return 'O Gmail recusou a autenticação. Confira o e-mail e a senha de app configurados.'
  }

  if (['ECONNECTION', 'ETIMEDOUT', 'ESOCKET', 'ECONNRESET'].includes(code)) {
    return 'Não foi possível conectar ao Gmail. Tente novamente em alguns instantes.'
  }

  return 'Não foi possível enviar o formulário. Tente novamente mais tarde.'
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ message: 'Método não permitido.' })
  }

  const body = parseRequestBody(request.body)

  if (!body) {
    return response.status(400).json({ message: 'Dados do formulário inválidos.' })
  }

  // Campo invisível: robôs costumam preenchê-lo, pessoas não.
  if (cleanSingleLine(body.website, 200)) {
    return response.status(200).json({
      ok: true,
      message: 'Formulário enviado com sucesso.',
    })
  }

  const name = cleanSingleLine(body.name, 120)
  const email = cleanSingleLine(body.email, 254).toLowerCase()
  const phone = cleanSingleLine(body.phone, 30)
  const message = cleanMessage(body.message, 5000)

  if (!name || !email || !phone || !message) {
    return response.status(400).json({ message: 'Preencha todos os campos obrigatórios.' })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return response.status(400).json({ message: 'Informe um endereço de e-mail válido.' })
  }

  const mailConfiguration = getMailConfiguration()

  if (!mailConfiguration) {
    return response.status(503).json({
      message: 'O Gmail ainda não foi configurado. Confira o arquivo .env.local e reinicie o npm run dev.',
    })
  }

  const transporter = createTransport(mailConfiguration)
  const text = `Nome: ${name}\nTelefone: ${phone}\nTexto: ${message}`

  try {
    const info = await transporter.sendMail({
      from: `"${mailConfiguration.senderName.replace(/"/g, '')}" <${mailConfiguration.user}>`,
      to: DESTINATION_EMAIL,
      cc: email,
      replyTo: email,
      subject: EMAIL_SUBJECT,
      text,
    })

    if (!info.accepted?.length) {
      throw Object.assign(new Error('Nenhum destinatário aceito pelo servidor.'), {
        code: 'EENVELOPE',
      })
    }

    return response.status(200).json({
      ok: true,
      message: 'Formulário enviado com sucesso. Uma cópia foi enviada ao e-mail informado.',
    })
  } catch (error) {
    console.error('Falha ao enviar formulário pelo Gmail:', {
      code: error?.code,
      responseCode: error?.responseCode,
      message: error?.message,
    })

    return response.status(502).json({
      message: getMailErrorMessage(error),
    })
  } finally {
    transporter.close()
  }
}
