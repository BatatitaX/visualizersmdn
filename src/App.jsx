import { useEffect, useMemo, useState } from 'react'
import smdnLogo from './assets/brand/smdn-logo.svg'

const carouselSlides = [
  {
    eyebrow: 'Dashboard Web',
    title: 'Panorama operacional',
    text: 'Mapa, alertas ativos, ocorrências críticas e leitura rápida da situação municipal.',
    badge: '01',
    items: ['Alertas', 'Mapa', 'Ocorrências'],
  },
  {
    eyebrow: 'Aplicativo Mobile',
    title: 'Alerta na palma da mão',
    text: 'O cidadão acompanha riscos, consulta mapa e aciona suporte em momentos de emergência.',
    badge: '02',
    items: ['SOS', 'Mapa', 'Relato'],
  },
  {
    eyebrow: 'Prevenção',
    title: 'Informação antes do desastre',
    text: 'Guia de sobrevivência, clima e orientação visual para reduzir exposição ao risco.',
    badge: '03',
    items: ['Clima', 'Guia', 'Chat'],
  },
  {
    eyebrow: 'Gestão integrada',
    title: 'Dados para tomada de decisão',
    text: 'A Defesa Civil acompanha registros, auditoria e distribuição dos alertas em tempo real.',
    badge: '04',
    items: ['Auditoria', 'Relatórios', 'Usuários'],
  },
]

const highlights = [
  'Alertas em tempo real',
  'Mapa de risco',
  'Ocorrências críticas',
  'Experiência mobile integrada',
]

const features = [
  'Apresentação única para telão, banca ou demonstração.',
  'Visual escuro alinhado ao painel SMDN Web.',
  'Carrossel automático com controle manual quando pausado.',
]

function AccessibilityMenu({ accessibility, setAccessibility }) {
  const [open, setOpen] = useState(false)

  function toggle(key) {
    setAccessibility((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  function increaseFont() {
    setAccessibility((current) => ({
      ...current,
      fontScale: Math.min(current.fontScale + 0.08, 1.24),
    }))
  }

  function decreaseFont() {
    setAccessibility((current) => ({
      ...current,
      fontScale: Math.max(current.fontScale - 0.08, 0.9),
    }))
  }

  function reset() {
    setAccessibility({
      highContrast: false,
      reduceMotion: false,
      fontScale: 1,
    })
  }

  return (
    <div className="accessMenu">
      <button
        type="button"
        className="accessTrigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span aria-hidden="true">⚙</span>
        Acessibilidade
      </button>

      {open && (
        <div className="accessDropdown" role="dialog" aria-label="Opções de acessibilidade">
          <div className="accessHeader">
            <strong>Acessibilidade</strong>
            <span>Personalize a visualização</span>
          </div>

          <div className="accessGrid">
            <button type="button" onClick={decreaseFont}>A-</button>
            <button type="button" onClick={increaseFont}>A+</button>
            <button
              type="button"
              className={accessibility.highContrast ? 'active' : ''}
              onClick={() => toggle('highContrast')}
              aria-pressed={accessibility.highContrast}
            >
              Alto contraste
            </button>
            <button
              type="button"
              className={accessibility.reduceMotion ? 'active' : ''}
              onClick={() => toggle('reduceMotion')}
              aria-pressed={accessibility.reduceMotion}
            >
              Reduzir movimento
            </button>
            <button type="button" onClick={reset} className="wide">
              Restaurar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CarouselMock({ paused, setPaused }) {
  const [index, setIndex] = useState(0)
  const active = carouselSlides[index]

  useEffect(() => {
    if (paused) return undefined

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % carouselSlides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [paused])

  function previousSlide() {
    setIndex((current) => (current - 1 + carouselSlides.length) % carouselSlides.length)
  }

  function nextSlide() {
    setIndex((current) => (current + 1) % carouselSlides.length)
  }

  return (
    <section className="visualFrame" aria-label="Carrossel de apresentação do SMDN">
      <div className="visualHeader">
        <div>
          <span className="visualKicker">Demonstração visual</span>
          <h2>{active.title}</h2>
        </div>

        <button
          type="button"
          className={`presentationButton ${paused ? 'paused' : ''}`}
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
        >
          {paused ? 'Continuar apresentação' : 'Apresentação automática'}
        </button>
      </div>

      <p className="visualDescription">{active.text}</p>

      <div className="carouselArea">
        {paused && (
          <>
            <button
              type="button"
              className="carouselArrow left"
              onClick={previousSlide}
              aria-label="Slide anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="carouselArrow right"
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              ›
            </button>
          </>
        )}

        <div className="screenMockup">
          <div className="mockTopbar">
            <span>{active.eyebrow}</span>
            <strong>{active.badge}</strong>
          </div>

          <div className="mockContent">
            <div className="mockMap">
              <span className="pin pinA" />
              <span className="pin pinB" />
              <span className="pin pinC" />
              <div className="routeLine" />
            </div>

            <div className="mockPanel">
              <strong>{active.title}</strong>
              <p>{active.text}</p>

              <div className="mockList">
                {active.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="carouselDots" aria-label="Indicadores do carrossel">
          {carouselSlides.map((slide, slideIndex) => (
            <button
              key={slide.badge}
              type="button"
              className={slideIndex === index ? 'active' : ''}
              onClick={() => {
                setIndex(slideIndex)
                setPaused(true)
              }}
              aria-label={`Ir para ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [paused, setPaused] = useState(false)
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    reduceMotion: false,
    fontScale: 1,
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', accessibility.fontScale)
  }, [accessibility.fontScale])

  const shellClass = useMemo(
    () =>
      [
        'viewerLanding',
        accessibility.highContrast ? 'highContrast' : '',
        accessibility.reduceMotion ? 'reduceMotion' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [accessibility]
  )

  return (
    <div className={shellClass}>
      <div className="ambientGlow ambientGlowLeft" />
      <div className="ambientGlow ambientGlowRight" />

      <header className="topBar">
        <a className="brandLink" href="#conteudo-principal" aria-label="SMDN Viewer">
          <img src={smdnLogo} alt="SMDN Viewer" className="brandLogo" />
        </a>

        <AccessibilityMenu accessibility={accessibility} setAccessibility={setAccessibility} />
      </header>

      <main id="conteudo-principal" className="heroSection">
        <section className="heroCopy">
          <span className="eyebrow">SMDN · Sistema de Monitoramento de Desastres Naturais</span>

          <h1>
            Monitore riscos, apresente o sistema e convide seu público:
            <span> instale já nosso aplicativo.</span>
          </h1>

          <p className="lead">
            Uma vitrine visual do SMDN para rodar em telão, banca ou demonstração,
            mantendo a identidade do painel web e destacando o aplicativo mobile.
          </p>

          <div className="chipRow" aria-label="Destaques do sistema">
            {highlights.map((item) => (
              <span key={item} className="chip">{item}</span>
            ))}
          </div>

          <div className="ctaRow">
            <button type="button" className="primaryButton">Instale já nosso aplicativo</button>
            <button type="button" className="ghostButton">Conheça o ecossistema SMDN</button>
          </div>

          <ul className="featureList">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <CarouselMock paused={paused} setPaused={setPaused} />
      </main>
    </div>
  )
}
