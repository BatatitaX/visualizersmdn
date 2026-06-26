import { useEffect, useMemo, useRef, useState } from 'react'
import logo from './assets/brand/logo.svg'
import logoClara from './assets/brand/logo-clara.svg'
import web1 from './assets/slides/web1.jpeg'
import web2 from './assets/slides/web2.jpeg'
import web3 from './assets/slides/web3.jpeg'
import webClaro from './assets/slides/web-claro.jpeg'
import webClaro1 from './assets/slides/web-claro1.jpeg'
import webClaro2 from './assets/slides/web-claro2.jpeg'
import mob1 from './assets/slides/mob1.svg'
import mob2 from './assets/slides/mob2.svg'
import mob3 from './assets/slides/mob3.svg'

const DEFAULT_ACCESSIBILITY = {
  fontSize: 'medium',
  theme: 'system',
  highContrast: false,
  reduceMotion: false,
}

const webSlides = [
  {
    eyebrow: 'Dashboard Web',
    title: 'Painel web em tempo real',
    text: 'Mapa, alertas e ocorrências para leitura operacional rápida.',
    badge: '01',
    image: web1,
    lightImage: webClaro,
  },
  {
    eyebrow: 'Relatórios',
    title: 'Relatórios operacionais',
    text: 'Indicadores e gráficos para apoiar resposta e planejamento.',
    badge: '02',
    image: web2,
    lightImage: webClaro1,
  },
  {
    eyebrow: 'Auditoria',
    title: 'Auditoria e rastreio',
    text: 'Histórico de ações e responsáveis para controle administrativo.',
    badge: '03',
    image: web3,
    lightImage: webClaro2,
  },
]

const mobileSlides = [
  {
    eyebrow: 'Aplicativo Mobile',
    title: 'Mapa e alertas móveis',
    text: 'Riscos, localização e avisos importantes direto no celular.',
    badge: '01',
    image: mob1,
  },
  {
    eyebrow: 'Emergência',
    title: 'SOS e relato rápido',
    text: 'Pedido de ajuda e registro de ocorrência em poucos toques.',
    badge: '02',
    image: mob2,
  },
  {
    eyebrow: 'Prevenção',
    title: 'Clima e prevenção',
    text: 'Consulta de clima, guia preventivo e suporte ao cidadão.',
    badge: '03',
    image: mob3,
  },
]

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="featherIcon closeIcon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="featherIcon" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="featherIcon" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function SettingsOption({ active, children, onClick }) {
  return (
    <button type="button" className={`settingsOption ${active ? 'active' : ''}`} onClick={onClick} aria-pressed={active}>
      {children}
    </button>
  )
}

function AccessibilityMenu({ accessibility, setAccessibility }) {
  const [open, setOpen] = useState(false)

  function update(key, value) {
    setAccessibility((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function toggle(key) {
    setAccessibility((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  function reset() {
    setAccessibility(DEFAULT_ACCESSIBILITY)
  }

  return (
    <div className="accessMenu">
      <button type="button" className="accessTrigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span aria-hidden="true">⚙</span>
        Acessibilidade
      </button>

      {open && (
        <div className="accessDropdown" role="dialog" aria-label="Configurações de acessibilidade">
          <div className="accessHeader">
            <div>
              <strong>Acessibilidade</strong>
              <span>Configurações da apresentação</span>
            </div>

            <button
              type="button"
              className="accessClose"
              onClick={() => setOpen(false)}
              aria-label="Fechar acessibilidade"
            >
              <XIcon />
            </button>
          </div>

          <div className="settingsGroup">
            <span className="settingsTitle">Letras</span>
            <div className="settingsGrid four">
              <SettingsOption active={accessibility.fontSize === 'small'} onClick={() => update('fontSize', 'small')}>Pequenas</SettingsOption>
              <SettingsOption active={accessibility.fontSize === 'medium'} onClick={() => update('fontSize', 'medium')}>Médias</SettingsOption>
              <SettingsOption active={accessibility.fontSize === 'large'} onClick={() => update('fontSize', 'large')}>Grandes</SettingsOption>
              <SettingsOption active={accessibility.fontSize === 'huge'} onClick={() => update('fontSize', 'huge')}>Enormes</SettingsOption>
            </div>
          </div>

          <div className="settingsGroup">
            <span className="settingsTitle">Modo</span>
            <div className="settingsGrid three">
              <SettingsOption active={accessibility.theme === 'system'} onClick={() => update('theme', 'system')}>Sistema</SettingsOption>
              <SettingsOption active={accessibility.theme === 'light'} onClick={() => update('theme', 'light')}>Claro</SettingsOption>
              <SettingsOption active={accessibility.theme === 'dark'} onClick={() => update('theme', 'dark')}>Escuro</SettingsOption>
            </div>
          </div>

          <div className="settingsGroup">
            <span className="settingsTitle">Visualização</span>
            <div className="settingsGrid two">
              <SettingsOption active={accessibility.highContrast} onClick={() => toggle('highContrast')}>Alto contraste</SettingsOption>
              <SettingsOption active={accessibility.reduceMotion} onClick={() => toggle('reduceMotion')}>Remover animações</SettingsOption>
            </div>
          </div>

          <button type="button" className="restoreButton" onClick={reset}>
            Restaurar ao padrão
          </button>
        </div>
      )}
    </div>
  )
}

function ImageSlide({ slide, variant = 'web', onImageClick }) {
  return (
    <figure className={`imageSlide ${variant === 'mobile' ? 'mobileImageSlide' : ''}`}>
      <div className="imageSlideHeader">
        <span>{slide.eyebrow}</span>
        <strong>{slide.badge}</strong>
      </div>

      <button
        type="button"
        className="imageFrame imageOpenButton"
        onClick={() => onImageClick(slide)}
        aria-label={`Ampliar imagem ${slide.title}`}
      >
        <img
          src={slide.image}
          alt={`${slide.title} - ${slide.eyebrow}`}
          draggable="false"
          className={slide.lightImage ? 'slideImageDark' : ''}
        />
        {slide.lightImage && (
          <img
            src={slide.lightImage}
            alt={`${slide.title} - ${slide.eyebrow} em tema claro`}
            draggable="false"
            className="slideImageLight"
          />
        )}
        <span className="tapZoomHint">Toque para ampliar</span>
      </button>

      <figcaption>
        <strong>{slide.title}</strong>
        <p>{slide.text}</p>
      </figcaption>
    </figure>
  )
}

function AutoCarousel({ slides, paused, setPaused, variant = 'web' }) {
  const [index, setIndex] = useState(0)
  const [zoomedSlide, setZoomedSlide] = useState(null)
  const active = slides[index]
  const dragStartX = useRef(null)
  const dragDeltaX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    if (paused) return undefined

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [paused, slides.length])

  useEffect(() => {
    if (!zoomedSlide) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setZoomedSlide(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [zoomedSlide])

  function previousSlide() {
    setIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  function nextSlide() {
    setIndex((current) => (current + 1) % slides.length)
  }

  function startDrag(event) {
    if (event.target.closest('.imageOpenButton')) return
    dragStartX.current = event.clientX
    dragDeltaX.current = 0
    isDragging.current = true
  }

  function moveDrag(event) {
    if (!isDragging.current || dragStartX.current === null) return
    dragDeltaX.current = event.clientX - dragStartX.current
  }

  function endDrag() {
    if (!isDragging.current) return

    const distance = dragDeltaX.current
    dragStartX.current = null
    dragDeltaX.current = 0
    isDragging.current = false

    if (Math.abs(distance) < 42) return

    if (distance > 0) {
      previousSlide()
    } else {
      nextSlide()
    }
  }

  return (
    <section className={`visualFrame ${variant === 'mobile' ? 'mobileFrame' : ''}`} aria-label={`Carrossel ${variant}`}>
      <div className="visualHeader">
        <div>
          <span className="visualKicker">{variant === 'web' ? 'Web em destaque' : 'Mobile em destaque'}</span>
          <h2>{active.title}</h2>
        </div>

        <button type="button" className={`presentationButton ${paused ? 'paused' : ''}`} onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
          {paused ? 'Continuar' : 'Automático'}
        </button>
      </div>

      <p className="visualDescription">{active.text}</p>
      <p className="swipeHint">No celular, arraste para navegar pelo carrossel.</p>

      <div
        className="carouselArea"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {paused && (
          <>
            <button type="button" className="carouselArrow left" onClick={previousSlide} aria-label="Slide anterior">
              <ChevronLeftIcon />
            </button>
            <button type="button" className="carouselArrow right" onClick={nextSlide} aria-label="Próximo slide">
              <ChevronRightIcon />
            </button>
          </>
        )}

        <ImageSlide slide={active} variant={variant} onImageClick={setZoomedSlide} />

        {zoomedSlide && (
          <div className="imageZoomOverlay" role="dialog" aria-modal="true" aria-label={`Imagem ampliada ${zoomedSlide.title}`}>
            <button type="button" className="imageZoomBackdrop" onClick={() => setZoomedSlide(null)} aria-label="Fechar imagem ampliada" />

            <div className="imageZoomPanel">
              <button type="button" className="imageZoomClose" onClick={() => setZoomedSlide(null)} aria-label="Fechar imagem ampliada">
                <XIcon />
              </button>

              <img
                src={zoomedSlide.image}
                alt={`${zoomedSlide.title} ampliado`}
                draggable="false"
                className={zoomedSlide.lightImage ? 'slideImageDark' : ''}
              />
              {zoomedSlide.lightImage && (
                <img
                  src={zoomedSlide.lightImage}
                  alt={`${zoomedSlide.title} ampliado em tema claro`}
                  draggable="false"
                  className="slideImageLight"
                />
              )}
            </div>
          </div>
        )}

        <div className="carouselDots" aria-label="Indicadores do carrossel">
          {slides.map((slide, slideIndex) => (
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
  const [webPaused, setWebPaused] = useState(false)
  const [mobilePaused, setMobilePaused] = useState(false)
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const saved = window.localStorage.getItem('smdn-viewer-accessibility')
      return saved ? { ...DEFAULT_ACCESSIBILITY, ...JSON.parse(saved) } : DEFAULT_ACCESSIBILITY
    } catch {
      return DEFAULT_ACCESSIBILITY
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('smdn-viewer-accessibility', JSON.stringify(accessibility))
    } catch {
      // ignora indisponibilidade do localStorage
    }
  }, [accessibility])

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }, [])

  const shellClass = useMemo(
    () =>
      [
        'viewerLanding',
        `font-${accessibility.fontSize}`,
        `theme-${accessibility.theme}`,
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
        <div className="brandLink" aria-label="SMDN Viewer">
          <img src={logo} alt="SMDN Viewer" className="brandLogo logoLight" />
          <img src={logoClara} alt="SMDN Viewer" className="brandLogo logoDark" />
        </div>

        <AccessibilityMenu accessibility={accessibility} setAccessibility={setAccessibility} />
      </header>

      <main className="pageStack">
        <section className="webHeroSection" aria-label="Apresentação do SMDN Web">
          <article className="heroCopy">
            <span className="eyebrow">SMDN Web · painel de monitoramento</span>

            <h1>
              Para mais segurança e agilidade, SMDN apresenta seu primeiro painel web.
              <span>Em tempo real, para decisões críticas.</span>
            </h1>

            <p className="lead">
              Uma vitrine visual do sistema para apresentar o painel web, seus recursos
              operacionais e a integração com a experiência mobile.
            </p>
          </article>

          <AutoCarousel slides={webSlides} paused={webPaused} setPaused={setWebPaused} variant="web" />
        </section>

        <section className="mobileShowcase" aria-label="Apresentação do aplicativo mobile">
          <article className="mobileCopy">
            <span className="eyebrow">Aplicativo Mobile · cidadão conectado</span>
            <h2>Uma experiência pensada para quem acessa pelo celular.</h2>
            <p>
              No mobile, o viewer vira uma apresentação vertical: leitura rápida, cards empilhados,
              controles grandes e navegação confortável para toque.
            </p>
          </article>

          <AutoCarousel slides={mobileSlides} paused={mobilePaused} setPaused={setMobilePaused} variant="mobile" />
        </section>
      </main>
    </div>
  )
}
