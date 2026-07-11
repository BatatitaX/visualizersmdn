import { useEffect, useState } from 'react'
import logo from './assets/brand/logo-clara.svg'
import aiNavigationIcon from './assets/landing/ai-navigation.svg'
import criticalSecurityIcon from './assets/landing/critical-security.svg.svg'
import dashboardMobileMockup from './assets/landing/dashboard-mobile-mockup.png'
import downloadIcon from './assets/landing/download.svg'
import firebaseIcon from './assets/landing/firebase.svg'
import flutterIcon from './assets/landing/flutter.svg'
import githubOutlineIcon from './assets/landing/github-outline.svg'
import mailIcon from './assets/landing/mail.svg'
import monitoringIcon from './assets/landing/monitoring.svg'
import nodeIcon from './assets/landing/nodejs.svg'
import postgisIcon from './assets/landing/postgis.svg'
import reactIcon from './assets/landing/react.svg'
import rescueCentralizationIcon from './assets/landing/rescue-centralization.svg'
import supabaseIcon from './assets/landing/supabase.svg'
import systemHallway from './assets/landing/system-hallway.svg'
import vercelIcon from './assets/landing/vercel.svg'
import vertexIcon from './assets/landing/vertexai.svg'

const techs = [
  { name: 'React', icon: reactIcon, kind: 'react' },
  { name: 'Flutter', icon: flutterIcon, kind: 'flutter' },
  { name: 'Vercel', icon: vercelIcon, kind: 'vercel' },
  { name: 'Node.js', icon: nodeIcon, kind: 'node' },
  { name: 'Supabase', icon: supabaseIcon, kind: 'supabase' },
  { name: 'PostGIS', icon: postgisIcon, kind: 'postgis' },
  { name: 'Firebase', icon: firebaseIcon, kind: 'firebase' },
  { name: 'GitHub', icon: githubOutlineIcon, kind: 'github' },
  { name: 'VertexAI', icon: vertexIcon, kind: 'vertex' },
]

// Seção temporariamente oculta. Troque para true para reativá-la.
const SHOW_SYSTEM_SECTION = false

const featureItems = [
  {
    title: 'Navegação Assistida por IA',
    text: 'Uma IA auxiliar integrada que guia o usuário de forma intuitiva por dados complexos, facilitando o acesso a relatórios e previsões.',
    icon: aiNavigationIcon,
  },
  {
    title: 'Segurança de Nível Crítico',
    text: 'Proteção avançada com criptografia e defesa cibernética para garantir que o sistema permaneça seguro e online.',
    icon: criticalSecurityIcon,
  },
  {
    title: 'Centralização de Socorros',
    text: 'Unificação de canais de resgate, alertas e órgãos oficiais em uma única interface, eliminando falhas na comunicação de crise.',
    icon: rescueCentralizationIcon,
  },
  {
    title: 'Monitoramento Atualizado',
    text: 'Um painel moderno em tempo real que fornece dados visuais claros e práticos para decisões rápidas.',
    icon: monitoringIcon,
  },
]

const connectCards = [
  {
    title: 'Canal Direto',
    text: 'Dúvidas, propostas ou investimento: fale diretamente pelo e-mail e receba acolhimento personalizado.',
    action: 'Enviar email',
    icon: mailIcon,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=smdn.pi%40outlook.com&su=Contato%20Visualizer%20SMDN',
  },
  {
    title: 'Repositório Tech',
    text: 'Explore nossa arquitetura, acompanhe o desenvolvimento em tempo real e contribua com melhorias.',
    action: 'Ver no GitHub',
    icon: githubOutlineIcon,
    href: 'https://github.com/Beto-Ribeiro/Projeto-Integrador-SMDN',
  },
  {
    title: 'Solução Mobile',
    text: 'Receba o acesso em breve e veja a experiência de campo do cidadão conectado.',
    action: 'Baixar o App',
    icon: downloadIcon,
  },
]

function PhoneMockup({ className = '' }) {
  return (
    <div className={`phoneMockup ${className}`} aria-label="Visualização mobile do sistema">
      <div className="phoneNotch" />
      <div className="phoneScreen" />
    </div>
  )
}

function MonitorMockup({ className = '', children }) {
  return (
    <div className={`monitorMockup ${className}`} aria-label="Visualização web do sistema">
      <div className="monitorScreen">{children}</div>
    </div>
  )
}

function formatBrazilianPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (!digits) return ''
  if (digits.length === 1) return `(${digits}`
  if (digits.length === 2) return `(${digits})`

  const areaCode = digits.slice(0, 2)
  const number = digits.slice(2)

  if (number.length <= 4) {
    return `(${areaCode}) ${number}`
  }

  if (digits.length <= 10) {
    return `(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`
  }

  return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`
}

function App() {
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })
  const [phone, setPhone] = useState('')
  const [isAppModalOpen, setIsAppModalOpen] = useState(false)

  useEffect(() => {
    if (!isAppModalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsAppModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isAppModalOpen])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setFormStatus({ type: 'loading', message: 'Enviando formulário...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })

      const contentType = response.headers.get('content-type') || ''
      const isJsonResponse = contentType.includes('application/json')
      const result = isJsonResponse
        ? await response.json().catch(() => ({}))
        : {}

      if (!response.ok) {
        if (response.status === 404 || !isJsonResponse) {
          throw new Error(
            'A rota de envio não está disponível. Reinicie o projeto com npm run dev ou publique novamente na Vercel.',
          )
        }

        throw new Error(result.message || 'Não foi possível enviar o formulário.')
      }

      form.reset()
      setPhone('')
      setFormStatus({
        type: 'success',
        message: result.message || 'Formulário enviado com sucesso.',
      })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'Não foi possível enviar o formulário. Tente novamente.',
      })
    }
  }

  function handleMobileAppClick() {
    setIsAppModalOpen(true)
  }

  return (
    <div className="siteShell">
      <header className="siteHeader" id="home">
        <a className="brand" href="#home" aria-label="SMDN">
          <img src={logo} alt="SMDN" />
        </a>
        <nav className="navLinks" aria-label="Navegação principal">
          <a href="#home">Home</a>
          <a href={SHOW_SYSTEM_SECTION ? '#system' : '#tech'}>Product</a>
          <a href="#tech">Tech</a>
        </nav>
      </header>

      <main>
        <section className="heroSection" aria-label="Apresentação inicial">
          <div className="heroCopy">
            <h1>Acreditamos que a tecnologia e a colaboração cidadã mudam o mundo!</h1>
            <div className="heroActions">
              <a href={SHOW_SYSTEM_SECTION ? '#system' : '#tech'}>Acessar o Sistema</a>
              <a href="#contact">Entrar em Contato</a>
            </div>
          </div>
          <div className="wave waveDeep" />
          <div className="wave waveMid" />
          <div className="wave waveLight" />
        </section>

        <section className="missionSection" aria-label="Missão SMDN">
          <div className="pinOutline" aria-hidden="true" />
          <article className="missionText">
            <h2>Conectando inteligência climática e colaboração cidadã para salvar vidas.</h2>
            <p>
              O SMDN resolve a falha no envio de alertas de desastres no Vale do Paraíba ao unir inteligência climática e colaboração cidadã. A plataforma cruza dados meteorológicos oficiais com relatos em tempo real da comunidade (crowdsourcing), transformando mapas estáticos em ações preventivas imediatas e unificando as informações para a Defesa Civil, SAMU e Bombeiros para salvar vidas.
            </p>
          </article>
        </section>

        {SHOW_SYSTEM_SECTION && (
          <section className="systemSection" id="system" aria-label="O sistema">
            <div className="systemsTitle" aria-hidden="true">O SISTEMA</div>
            <div className="systemDevices">
              <PhoneMockup className="systemPhone" />
              <MonitorMockup className="systemMonitor">
                <img src={systemHallway} alt="Corredor claro em perspectiva" />
              </MonitorMockup>
            </div>
          </section>
        )}

        <section className="techSection" id="tech" aria-label="Tecnologias utilizadas">
          <h2>Tecnologias utilizadas:</h2>
          <div className="techGrid">
            {techs.map((tech) => (
              <article className={`techCard tech-${tech.kind}`} key={tech.name}>
                {tech.icon ? (
                  <img className="techIcon" src={tech.icon} alt="" aria-hidden="true" />
                ) : (
                  <span className="techPlaceholderIcon" aria-hidden="true">GIS</span>
                )}
                <span>{tech.name}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="featuresSection" aria-label="Novidades da gestão de desastres">
          <div className="featuresInner">
            <div className="featureIntro">
              <h2>O que trazemos de novo para a <strong>gestão de desastres?</strong></h2>
              <img className="dashboardMockup" src={dashboardMobileMockup} alt="Dashboard web e mobile do SMDN" />
            </div>

            <div className="featureList">
              {featureItems.map((item) => (
                <article className="featureItem" key={item.title}>
                  <div className="featureIcon"><img src={item.icon} alt="" aria-hidden="true" /></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contactSection" id="contact" aria-label="Contato">
          <article className="contactCopy">
            <h2>Conecte-se ao futuro da <span>gestão de riscos</span></h2>
            <p>
              Quer levar nossa tecnologia para a sua região ou entender como apoiar e investir no projeto? Dê o primeiro passo preenchendo o formulário.
            </p>
          </article>

          <form className="contactForm" onSubmit={handleSubmit}>
            <label>
              <span>Nome completo:</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                maxLength="120"
                placeholder="Nome Completo"
                required
              />
            </label>
            <label>
              <span>Email:</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                maxLength="254"
                placeholder="exemplo@gmail.com"
                required
              />
            </label>
            <label>
              <span>Telefone:</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(formatBrazilianPhone(event.target.value))}
                minLength="14"
                maxLength="15"
                pattern="\(\d{2}\) \d{4,5}-\d{4}"
                placeholder="(99) 99999-9999"
                required
              />
            </label>

            <label>
              <span>Como podemos ajudar?</span>
              <textarea
                name="message"
                rows="5"
                maxLength="5000"
                placeholder="Olá, gostaria de conhecer melhor o SMDN e entender como ele pode ajudar na gestão de riscos da minha região."
                required
              />
            </label>

            <div className="formHoneypot" aria-hidden="true">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <button type="submit" disabled={formStatus.type === 'loading'}>
              {formStatus.type === 'loading' ? 'Enviando...' : 'Enviar formulário'}
            </button>

            <p
              className={`formStatus formStatus--${formStatus.type}`}
              role="status"
              aria-live="polite"
            >
              {formStatus.message}
            </p>
          </form>
        </section>

        <section className="connectSection" aria-label="Outras formas de se conectar">
          <h2>Outras formas de se conectar</h2>
          <p className="connectLead">
            Acreditamos na transparência para salvar vidas. Baixe nossa solução mobile, acompanhe o desenvolvimento do código em tempo real, ou entre em contato direto com os desenvolvedores.
          </p>

          <div className="connectCards">
            {connectCards.map((card) => (
              <article className="connectCard" key={card.title}>
                <div className="connectCardHeader">
                  <div className="connectIcon"><img src={card.icon} alt="" aria-hidden="true" /></div>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.text}</p>
                {card.title === 'Solução Mobile' ? (
                  <button className="connectAction" type="button" onClick={handleMobileAppClick}>
                    {card.action}
                  </button>
                ) : (
                  <a
                    className="connectAction"
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card.action}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <img src={logo} alt="SMDN" />
        <small>Sistemas de Monitoramento de Desastres Naturais</small>
      </footer>

      {isAppModalOpen && (
        <div
          className="appModalBackdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsAppModalOpen(false)
            }
          }}
        >
          <section
            className="appModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-modal-title"
            aria-describedby="app-modal-description"
          >
            <button
              className="appModalClose"
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setIsAppModalOpen(false)}
            >
              ×
            </button>

            <div className="appModalIcon" aria-hidden="true">
              <img src={downloadIcon} alt="" />
            </div>

            <h2 id="app-modal-title">Aplicativo em desenvolvimento</h2>
            <p id="app-modal-description">
              A solução mobile do SMDN ainda está sendo preparada. O acesso será disponibilizado por aqui em breve.
            </p>

            <button
              className="appModalAction"
              type="button"
              autoFocus
              onClick={() => setIsAppModalOpen(false)}
            >
              Entendi
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
