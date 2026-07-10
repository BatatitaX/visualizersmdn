# Visualizer SMDN

Landing page do projeto SMDN construída com React e Vite.

## Instalação

```bash
npm install
npm run dev
```

## Formulário de contato

O formulário usa uma função serverless em `api/contact.js` e envia a mensagem diretamente pelo SMTP do Gmail.

A mensagem é enviada para `smdn.pi@outlook.com`, com cópia para o e-mail digitado no formulário e com o seguinte assunto:

```text
Formulário Visualizer SMDN
```

O corpo contém:

```text
Nome: ...
Telefone: ...
Texto: ...
```

### Configuração gratuita do Gmail

1. Escolha uma conta Gmail que será usada como remetente técnico.
2. Ative a verificação em duas etapas nessa Conta Google.
3. Gere uma senha de app de 16 caracteres para o Visualizer.
4. Copie `.env.example` para `.env.local`.
5. Preencha as variáveis:

```env
GMAIL_USER=seu.remetente@gmail.com
GMAIL_APP_PASSWORD=senha_de_app_com_16_caracteres
GMAIL_SENDER_NAME=Visualizer SMDN
```

Não use a senha normal da Conta Google. O arquivo `.env.local` não deve ser enviado ao GitHub.

Depois de alterar `.env.local`, reinicie `npm run dev`.

### Vercel

Em **Settings → Environment Variables**, adicione:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `GMAIL_SENDER_NAME` — opcional

Depois faça um novo deploy.

Se o repositório contiver uma pasta externa `Visualizer-SMDN`, configure a raiz do projeto da Vercel como `Visualizer-SMDN/SMDN-viwer`. Se `package.json` estiver diretamente na raiz do repositório, nenhuma alteração é necessária.

## Build

```bash
npm run build
```
