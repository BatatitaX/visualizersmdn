# SMDN Viewer

Projeto separado para rodar uma tela única de apresentação automática do SMDN.

## Como instalar

```bash
npm install
```

## Como rodar localmente

```bash
npm run dev
```

Abra a URL exibida pelo Vite, normalmente:

```txt
http://localhost:5173/
```

## Build

```bash
npm run build
```

## Subir no repositório novo

```bash
git clone https://github.com/BatatitaX/SMDN-viwer.git
cd SMDN-viwer
# copie todos os arquivos deste projeto para dentro da pasta clonada
npm install
npm run dev

git add .
git commit -m "feat: criar viewer automatico SMDN"
git push origin main
```

## Estrutura

```txt
SMDN-viwer/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ assets/mobile/
│  │  ├─ auth-flow.png
│  │  ├─ core-flow.png
│  │  └─ safety-profile-flow.png
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ index.html
├─ package.json
└─ README.md
```

## Observação

As imagens do fluxo mobile foram extraídas do arquivo `design mobile.docx` enviado como referência visual.
