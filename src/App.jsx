import { useEffect, useMemo, useState } from 'react'
import authFlow from './assets/mobile/auth-flow.png'
import coreFlow from './assets/mobile/core-flow.png'
import safetyFlow from './assets/mobile/safety-profile-flow.png'

const slides = [
  {
    id: 'overview',
    kicker: 'Visão geral',
    title: 'SMDN em execução automática',
    label: 'Dashboard Web',
    image: coreFlow,
    accent: '#7ec8ff',
    description:
      'Painel de apresentação do Sistema de Monitoramento de Desastres Naturais, pensado para rodar sozinho em telão, banca ou demonstração.',
    bullets: [
      'Centraliza alertas, ocorrências, mapa e status operacional.',
      'Mostra a jornada mobile sem trocar de página.',
      'Mantém a identidade visual escura do painel SMDN Web.',
    ],
    metric: { value: '24/7', label: 'monitoramento visual' },
  },
  {
    id: 'auth',
    kicker: 'Acesso e cadastro',
    title: 'Entrada segura para cidadão e operador',
    label: 'Login • Registro • Recuperação',
    image: authFlow,
    accent: '#93b8d0',
    description:
      'O fluxo mobile apresenta login, registro e recuperação de acesso com visual claro, reforçando segurança e continuidade do serviço.',
    bullets: [
      'Registro de novos usuários com dados de identificação.',
      'Login e recuperação de senha em etapas simples.',
      'Base visual coerente com o ecossistema SMDN.',
    ],
    metric: { value: '3', label: 'fluxos de autenticação' },
  },
  {
    id: 'sos',
    kicker: 'Emergência',
    title: 'SOS, mapa e relato em poucos toques',
    label: 'SOS • Mapa • Reportar',
    image: coreFlow,
    accent: '#ff4d4f',
    description:
      'O app mobile prioriza ações rápidas: pedir ajuda, visualizar riscos no mapa, reportar ocorrência e consultar clima.',
    bullets: [
      'Botão SOS de alta visibilidade para situações críticas.',
      'Mapa com marcadores e leitura territorial do risco.',
      'Relato com imagem, tipo de desastre, severidade e localização.',
    ],
    metric: { value: 'SOS', label: 'ação crítica em destaque' },
  },
  {
    id: 'clima',
    kicker: 'Clima e previsão',
    title: 'Condições climáticas como apoio à decisão',
    label: 'Clima • Busca • Chat',
    image: coreFlow,
    accent: '#b9d7e8',
    description:
      'A experiência mobile inclui consulta de clima, previsão local e apoio conversacional para orientar o usuário em contexto de risco.',
    bullets: [
      'Busca de cidade e cartões de temperatura por município.',
      'Previsão com ícones simples e leitura rápida.',
      'Chat de suporte visualmente integrado ao aplicativo.',
    ],
    metric: { value: '20°', label: 'exemplo climático' },
  },
  {
    id: 'guide',
    kicker: 'Prevenção',
    title: 'Guia de sobrevivência por tipo de desastre',
    label: 'Deslizamento • Enchente • Tempestade • Tornado',
    image: safetyFlow,
    accent: '#ffd166',
    description:
      'O guia mobile organiza orientações de sobrevivência e prevenção, ajudando o cidadão antes, durante e depois de eventos extremos.',
    bullets: [
      'Categorias de desastre em formato de cards expansíveis.',
      'Texto orientativo para reduzir exposição ao risco.',
      'Funciona como material educativo dentro do app.',
    ],
    metric: { value: '4', label: 'categorias de desastre' },
  },
  {
    id: 'profile',
    kicker: 'Perfil cidadão',
    title: 'Dados pessoais e informações de atendimento',
    label: 'Perfil • Saúde • Observações',
    image: safetyFlow,
    accent: '#9ee6c8',
    description:
      'A área de perfil reúne dados de identificação e informações úteis para atendimento em emergências, como alergias e observações.',
    bullets: [
      'Perfil com dados cadastrais e contato.',
      'Campos de saúde, alergias e observações.',
      'Edição simplificada para manter dados atualizados.',
    ],
    metric: { value: '1', label: 'perfil integrado' },
  },
]

const statusFeed = [
  { label: 'SOS reportado', place: 'Taubaté', tone: 'moderado' },
  { label: 'Enchente monitorada', place: 'Roseira', tone: 'grave' },
  { label: 'Deslizamento em análise', place: 'Pindamonhangaba', tone: 'critico' },
  { label: 'Previsão atualizada', place: 'São Paulo', tone: 'info' },
]

function Logo() {
  return (
    <div className="logoBlock" aria-label="SMDN Viewer">
      <div className="logoText">SMDN</div>
      <div className="logoWave" />
      <span>viewer</span>
    </div>
  )
}

function Icon({ type }) {
  const icons = {
    dashboard: '⌁',
    auth: '◫',
    sos: '⚠',
    clima: '☁',
    guide: '◆',
    profile: '◉',
  }

  return <span className="navIcon" aria-hidden="true">{icons[type] || '•'}</span>
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    if (isPaused) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 6200)

    return () => window.clearInterval(interval)
  }, [isPaused])

  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex])

  return (
    <div className="viewerShell" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <aside className="sidebar">
        <Logo />

        <nav className="slideNav" aria-label="Módulos SMDN">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`navItem ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <Icon type={slide.id} />
              <span>{slide.kicker}</span>
            </button>
          ))}
        </nav>

        <div className="operatorCard">
          <div className="avatar">AI</div>
          <div>
            <strong>Modo apresentação</strong>
            <p>{isPaused ? 'Pausado por interação' : 'Rodando automaticamente'}</p>
          </div>
        </div>
      </aside>

      <main className="stage">
        <header className="topbar">
          <div>
            <span className="eyebrow">{activeSlide.kicker}</span>
            <h1>{activeSlide.title}</h1>
          </div>

          <div className="topCards">
            <div className="topCard">
              <span>Status</span>
              <strong>Online</strong>
            </div>
            <div className="topCard alert">
              <span>Demonstração</span>
              <strong>{activeIndex + 1}/{slides.length}</strong>
            </div>
          </div>
        </header>

        <section className="contentGrid">
          <article className="heroPanel" style={{ '--accent': activeSlide.accent }}>
            <div className="heroGlow" />
            <span className="modulePill">{activeSlide.label}</span>
            <h2>{activeSlide.description}</h2>

            <ul>
              {activeSlide.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="metricRow">
              <div className="metricMain">
                <strong>{activeSlide.metric.value}</strong>
                <span>{activeSlide.metric.label}</span>
              </div>
              <div className="progressBox">
                <span>Progresso da apresentação</span>
                <div className="progressTrack">
                  <div className="progressFill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </article>

          <article className="phonePanel">
            <div className="phoneHeader">
              <div>
                <span>Mobile design</span>
                <strong>{activeSlide.label}</strong>
              </div>
              <span className="liveDot">ao vivo</span>
            </div>

            <div className="deviceFrame">
              <div className="deviceNotch" />
              <img src={activeSlide.image} alt={`Fluxo mobile: ${activeSlide.label}`} />
            </div>
          </article>
        </section>

        <section className="bottomGrid">
          <div className="mapPanel">
            <div className="mapHeader">
              <strong>Mapa operacional</strong>
              <span>Vale do Paraíba • simulação visual</span>
            </div>
            <div className="mapCanvas">
              <span className="pin pinRed" />
              <span className="pin pinYellow" />
              <span className="pin pinOrange" />
              <div className="routeLine" />
            </div>
          </div>

          <div className="feedPanel">
            <div className="feedHeader">
              <strong>Eventos recentes</strong>
              <span>atualização automática</span>
            </div>

            <div className="feedList">
              {statusFeed.map((item) => (
                <div className="feedItem" key={`${item.label}-${item.place}`}>
                  <span className={`severity ${item.tone}`} />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.place} • há poucos minutos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
