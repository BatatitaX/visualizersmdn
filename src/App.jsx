import { useEffect, useState } from 'react'
import preverLogo from './assets/brand/prever-logo.png'
import preverLogoLight from './assets/brand/prever-logo-light.png'
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
import medicosSemFronteirasLogo from './assets/ongs/medicos-sem-fronteiras.png'
import cruzVermelhaLogo from './assets/ongs/cruz-vermelha-brasileira.png'
import unicefLogo from './assets/ongs/unicef.png'
import saveTheChildrenLogo from './assets/ongs/save-the-children.png'
import planInternationalLogo from './assets/ongs/plan-international-brasil.png'
import greenpeaceLogo from './assets/ongs/greenpeace.png'
import wwfLogo from './assets/ongs/wwf-brasil.png'
import sosMataAtlanticaLogo from './assets/ongs/sos-mata-atlantica.png'
import anistiaInternacionalLogo from './assets/ongs/anistia-internacional-brasil.png'
import humanRightsWatchLogo from './assets/ongs/human-rights-watch.png'
import oxfamLogo from './assets/ongs/oxfam-brasil.png'
import careBrasilLogo from './assets/ongs/care-brasil.png'
import habitatBrasilLogo from './assets/ongs/habitat-brasil.png'

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

const ongs = [
  {
    slug: 'medicos-sem-fronteiras',
    name: 'Médicos Sem Fronteiras',
    shortName: 'MSF',
    category: 'Saúde',
    categoryKind: 'health',
    description: 'Organização humanitária internacional que presta assistência médica a populações em crise em mais de 70 países, incluindo zonas de conflito armado e epidemias.',
    profile: 'Suas equipes levam cuidados de saúde a contextos em que conflitos, surtos, desastres ou exclusão tornam o atendimento urgente e difícil de alcançar. Além da resposta médica, a organização compartilha relatos de campo para dar visibilidade às crises humanitárias.',
    focus: ['Emergências médicas', 'Conflitos e epidemias', 'Ajuda humanitária'],
    href: 'https://www.msf.org.br/',
    logo: medicosSemFronteirasLogo,
  },
  {
    slug: 'cruz-vermelha-brasileira',
    name: 'Cruz Vermelha Brasileira',
    shortName: 'Cruz Vermelha',
    category: 'Saúde',
    categoryKind: 'health',
    description: 'Presente no Brasil há mais de 130 anos, atua em situações de emergência, saúde e assistência às populações vulneráveis.',
    profile: 'A rede mobiliza voluntários, profissionais e recursos para prevenir riscos, preparar comunidades e responder a emergências. O apoio pode chegar por ações de saúde, assistência humanitária e reconstrução de vínculos locais.',
    focus: ['Emergências', 'Saúde comunitária', 'Assistência humanitária'],
    href: 'https://www.cruzvermelha.org.br/',
    logo: cruzVermelhaLogo,
  },
  {
    slug: 'unicef',
    name: 'Fundo das Nações Unidas para a Infância',
    shortName: 'UNICEF',
    category: 'Educação',
    categoryKind: 'education',
    description: 'Agência da ONU que trabalha pelo desenvolvimento e proteção dos direitos de crianças e adolescentes, com foco em educação, saúde, nutrição e proteção contra violência.',
    profile: 'O trabalho combina programas de campo, produção de evidências e articulação com governos e comunidades. A prioridade é garantir que crianças e adolescentes, especialmente os mais vulneráveis, possam aprender, crescer com saúde e viver protegidos.',
    focus: ['Direitos da infância', 'Educação e saúde', 'Proteção contra violência'],
    href: 'https://www.unicef.org/brazil/',
    logo: unicefLogo,
  },
  {
    slug: 'save-the-children',
    name: 'Save The Children',
    shortName: 'Save The Children',
    category: 'Educação',
    categoryKind: 'education',
    description: 'Organização global dedicada a garantir que toda criança tenha acesso à educação, saúde e proteção, inclusive em situações de emergência.',
    profile: 'A organização desenvolve iniciativas voltadas à sobrevivência, à aprendizagem e à proteção da infância. Em crises, trabalha para que crianças continuem recebendo cuidado e tenham espaços seguros para se desenvolver.',
    focus: ['Educação', 'Saúde infantil', 'Proteção em emergências'],
    href: 'https://www.savethechildren.org.br/',
    logo: saveTheChildrenLogo,
  },
  {
    slug: 'plan-international-brasil',
    name: 'Plan International Brasil',
    shortName: 'Plan International',
    category: 'Educação',
    categoryKind: 'education',
    description: 'Apoia comunidades vulneráveis com programas de educação, proteção e desenvolvimento econômico para meninas e mulheres.',
    profile: 'Seus projetos fortalecem oportunidades, participação e autonomia, com atenção especial às barreiras enfrentadas por meninas. A atuação aproxima famílias, escolas, comunidades e poder público em torno de mudanças duradouras.',
    focus: ['Direitos das meninas', 'Educação', 'Igualdade de gênero'],
    href: 'https://www.planinternational.org.br/',
    logo: planInternationalLogo,
  },
  {
    slug: 'greenpeace',
    name: 'Greenpeace',
    shortName: 'Greenpeace',
    category: 'Meio Ambiente',
    categoryKind: 'environment',
    description: 'Organização global de defesa ambiental que realiza campanhas contra o desmatamento, a poluição dos oceanos e as mudanças climáticas.',
    profile: 'A atuação reúne investigação, mobilização pública e campanhas para pressionar por soluções ambientais. No Brasil, temas ligados à Amazônia, ao clima e à transição para modelos sustentáveis ocupam lugar central.',
    focus: ['Florestas', 'Oceanos', 'Clima'],
    href: 'https://www.greenpeace.org/brasil/',
    logo: greenpeaceLogo,
  },
  {
    slug: 'wwf-brasil',
    name: 'World Wide Fund for Nature',
    shortName: 'WWF Brasil',
    category: 'Meio Ambiente',
    categoryKind: 'environment',
    description: 'Uma das maiores organizações de conservação do mundo, atua na proteção da biodiversidade, florestas, rios e oceanos.',
    profile: 'O WWF-Brasil trabalha com ciência, projetos de conservação e diálogo com comunidades, empresas e governos. As ações buscam proteger espécies e paisagens ao mesmo tempo que promovem o uso responsável dos recursos naturais.',
    focus: ['Biodiversidade', 'Florestas', 'Rios e oceanos'],
    href: 'https://www.wwf.org.br/',
    logo: wwfLogo,
  },
  {
    slug: 'sos-mata-atlantica',
    name: 'SOS Mata Atlântica',
    shortName: 'SOS Mata Atlântica',
    category: 'Meio Ambiente',
    categoryKind: 'environment',
    description: 'Monitora o desmatamento, financia a restauração florestal e educa comunidades para proteger um dos biomas mais ameaçados do planeta.',
    profile: 'A fundação combina monitoramento, restauração, educação e mobilização para ampliar a proteção da Mata Atlântica. Seus dados e projetos ajudam a transformar conservação em ação pública e participação social.',
    focus: ['Mata Atlântica', 'Restauração', 'Educação ambiental'],
    href: 'https://www.sosma.org.br/',
    logo: sosMataAtlanticaLogo,
  },
  {
    slug: 'anistia-internacional-brasil',
    name: 'Anistia Internacional Brasil',
    shortName: 'Anistia Internacional',
    category: 'Direitos Humanos',
    categoryKind: 'rights',
    description: 'Movimento global que pesquisa e denuncia violações de direitos humanos e combate a tortura, a discriminação e a pena de morte.',
    profile: 'A organização documenta violações, mobiliza apoiadores e dialoga com autoridades para cobrar mudanças. Suas campanhas defendem dignidade, liberdade e justiça para pessoas e grupos ameaçados.',
    focus: ['Liberdade', 'Combate à tortura', 'Não discriminação'],
    href: 'https://anistia.org.br/',
    logo: anistiaInternacionalLogo,
  },
  {
    slug: 'human-rights-watch',
    name: 'Human Rights Watch',
    shortName: 'Human Rights Watch',
    category: 'Direitos Humanos',
    categoryKind: 'rights',
    description: 'Organização independente que investiga abusos de direitos humanos, publica relatórios e pressiona governos e empresas por mudanças.',
    profile: 'Pesquisadores reúnem evidências e depoimentos para expor abusos e ampliar a responsabilização. Os relatórios servem de base para incidência junto a governos, instituições internacionais e sociedade civil.',
    focus: ['Investigação', 'Relatórios', 'Incidência pública'],
    href: 'https://www.hrw.org/',
    logo: humanRightsWatchLogo,
  },
  {
    slug: 'oxfam-brasil',
    name: 'Oxfam Brasil',
    shortName: 'Oxfam Brasil',
    category: 'Assistência Social',
    categoryKind: 'social',
    description: 'Combate a pobreza e as desigualdades econômicas e sociais por meio de projetos, resposta humanitária e campanhas de incidência política.',
    profile: 'A Oxfam Brasil articula pesquisas, campanhas e trabalho com parceiros para enfrentar desigualdades estruturais. As iniciativas conectam justiça econômica, participação social e resposta a situações de vulnerabilidade.',
    focus: ['Desigualdades', 'Resposta humanitária', 'Justiça econômica'],
    href: 'https://www.oxfam.org.br/',
    logo: oxfamLogo,
  },
  {
    slug: 'care-brasil',
    name: 'CARE Brasil',
    shortName: 'CARE Brasil',
    category: 'Assistência Social',
    categoryKind: 'social',
    description: 'Trabalha para erradicar a pobreza com foco no empoderamento de mulheres e meninas e no desenvolvimento comunitário sustentável.',
    profile: 'Os programas buscam fortalecer autonomia, renda, segurança e capacidade de resposta das comunidades. Mulheres e meninas são protagonistas na construção de soluções locais mais justas e resilientes.',
    focus: ['Mulheres e meninas', 'Emergências', 'Desenvolvimento sustentável'],
    href: 'https://www.care.org.br/',
    logo: careBrasilLogo,
  },
  {
    slug: 'habitat-brasil',
    name: 'Habitat para a Humanidade Brasil',
    shortName: 'Habitat Brasil',
    category: 'Assistência Social',
    categoryKind: 'social',
    description: 'Constrói e reforma moradias dignas para famílias de baixa renda, promovendo habitação acessível, saúde, segurança e oportunidades.',
    profile: 'A organização atua para reduzir a inadequação habitacional por meio de melhorias, acesso à água, saneamento e mobilização comunitária. Moradia digna é tratada como ponto de partida para saúde, proteção e novas oportunidades.',
    focus: ['Moradia digna', 'Melhorias habitacionais', 'Água e saneamento'],
    href: 'https://www.habitatbrasil.org.br/',
    logo: habitatBrasilLogo,
  },
]

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

const CONTACT_EMAIL = 'smdn.pi@outlook.com'
const CONTACT_SUBJECT = 'Contato PREVER'

const encodedContactEmail = encodeURIComponent(CONTACT_EMAIL)
const encodedContactSubject = encodeURIComponent(CONTACT_SUBJECT)
const contactMailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodedContactSubject}`
const gmailWebComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedContactEmail}&su=${encodedContactSubject}`

const connectCards = [
  {
    title: 'Canal Direto',
    text: 'Dúvidas, propostas ou investimento: fale diretamente pelo e-mail e receba acolhimento personalizado.',
    action: 'Enviar email',
    icon: mailIcon,
    kind: 'email',
    href: contactMailtoUrl,
  },
  {
    title: 'Repositório Tech',
    text: 'O repositório técnico do projeto está temporariamente restrito à equipe de desenvolvimento.',
    action: 'Ver no GitHub',
    icon: githubOutlineIcon,
    kind: 'github',
  },
  {
    title: 'Solução Mobile',
    text: 'Receba o acesso em breve e veja a experiência de campo do cidadão conectado.',
    action: 'Baixar o App',
    icon: downloadIcon,
  },
]

function BrandLogo({ className = '', variant = 'auto' }) {
  return (
    <span className={`preverLogoFrame preverLogoFrame--${variant} ${className}`} aria-hidden="true">
      <img className="preverLogo preverLogo--dark" src={preverLogo} alt="" />
      <img className="preverLogo preverLogo--light" src={preverLogoLight} alt="" />
    </span>
  )
}

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

function getRouteFromHash() {
  const hash = window.location.hash || '#home'

  if (hash === '#/ongs' || hash === '#/ongs/') {
    return { type: 'directory' }
  }

  if (hash.startsWith('#/ongs/')) {
    return { type: 'detail', slug: decodeURIComponent(hash.slice('#/ongs/'.length)) }
  }

  return { type: 'landing', anchor: hash.startsWith('#') ? hash.slice(1) : 'home' }
}

function getWebsitePreviewUrl(url, width, height) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`
}

function WebsitePreview({ ong, mode = 'wide', caption }) {
  const [hasError, setHasError] = useState(false)
  const isPortrait = mode === 'portrait'
  const imageUrl = getWebsitePreviewUrl(ong.href, isPortrait ? 720 : 1280, isPortrait ? 960 : 720)

  return (
    <figure className={`ongWebsitePreview ongWebsitePreview--${mode}`}>
      <div className="ongWebsitePreviewFrame">
        {hasError ? (
          <div className="ongWebsitePreviewFallback">
            <img src={ong.logo} alt={`Logo da ${ong.name}`} />
            <p>A prévia não carregou neste dispositivo.</p>
            <a href={ong.href} target="_blank" rel="noreferrer">Abrir site oficial ↗</a>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Captura do site oficial da ${ong.name}`}
            loading={isPortrait ? 'lazy' : 'eager'}
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <figcaption>
        <span>{caption}</span>
        <small>Fonte: site oficial</small>
      </figcaption>
    </figure>
  )
}

function OngDirectoryPage() {
  const categories = ['Todas', ...new Set(ongs.map((ong) => ong.category))]
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const visibleOngs = selectedCategory === 'Todas'
    ? ongs
    : ongs.filter((ong) => ong.category === selectedCategory)

  return (
    <section className="ongRoutePage ongDirectoryPage" aria-labelledby="directory-title">
      <div className="ongRouteInner">
        <a className="ongBackLink" href="#ongs">← Voltar para a apresentação</a>

        <div className="ongRouteHeading">
          <div>
            <p className="ongsEyebrow">Rede de apoio PREVER</p>
            <h1 id="directory-title">Todas as ONGs</h1>
          </div>
          <p>
            Conheça organizações que atuam em saúde, educação, meio ambiente,
            direitos humanos e assistência social. Selecione uma para ver seu perfil.
          </p>
        </div>

        <div className="ongCategoryFilters" aria-label="Filtrar ONGs por área">
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? 'isActive' : ''}
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="ongsGrid ongRouteGrid" role="list" aria-live="polite">
          {visibleOngs.map((ong) => (
            <a
              className={`ongDirectoryCard ongDirectoryCard--${ong.categoryKind}`}
              href={`#/ongs/${ong.slug}`}
              role="listitem"
              key={ong.name}
              aria-label={`${ong.name}: conhecer a organização`}
            >
              <span className="ongDirectoryLogo">
                <img src={ong.logo} alt="" aria-hidden="true" />
              </span>
              <span className="ongDirectoryText">
                <small>{ong.category}</small>
                <strong>{ong.shortName}</strong>
                <span>Ver perfil completo</span>
              </span>
              <span className="ongDirectoryArrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>

        <p className="ongsDisclaimer">
          O PREVER não possui vínculo com as organizações listadas e não retém nenhuma porcentagem das doações.
          Todo apoio é realizado diretamente nos canais oficiais de cada instituição.
        </p>
      </div>
    </section>
  )
}

function OngDetailPage({ ong }) {
  if (!ong) {
    return (
      <section className="ongRoutePage ongNotFound" aria-labelledby="ong-not-found-title">
        <div className="ongRouteInner">
          <p className="ongsEyebrow">Diretório PREVER</p>
          <h1 id="ong-not-found-title">ONG não encontrada</h1>
          <p>O endereço acessado não corresponde a uma organização do diretório.</p>
          <a className="ongsPrimaryAction" href="#/ongs">Ver todas as ONGs</a>
        </div>
      </section>
    )
  }

  return (
    <section className={`ongRoutePage ongProfilePage ongProfilePage--${ong.categoryKind}`} aria-labelledby="ong-profile-title">
      <div className="ongRouteInner">
        <a className="ongBackLink" href="#/ongs">← Todas as ONGs</a>

        <div className="ongProfileHero">
          <div className="ongProfileLogo">
            <img src={ong.logo} alt={`Logo da ${ong.name}`} />
          </div>

          <article className="ongProfileCopy">
            <p className="ongsEyebrow">{ong.category}</p>
            <h1 id="ong-profile-title">{ong.name}</h1>
            <p className="ongProfileLead">{ong.description}</p>
            <p>{ong.profile}</p>

            <div className="ongFocusList" aria-label="Principais frentes de atuação">
              {ong.focus.map((item) => <span key={item}>{item}</span>)}
            </div>

            <div className="ongProfileActions">
              <a className="ongOfficialAction" href={ong.href} target="_blank" rel="noreferrer">
                Visitar e apoiar no site oficial <span aria-hidden="true">↗</span>
              </a>
              <a className="ongSecondaryAction" href="#/ongs">Conhecer outras ONGs</a>
            </div>
          </article>
        </div>

        <div className="ongProfileGalleryHeading">
          <div>
            <p className="ongsEyebrow">Conheça por dentro</p>
            <h2>Um olhar sobre a organização</h2>
          </div>
          <p>Prévias atualizadas diretamente do site oficial da organização.</p>
        </div>

        <div className="ongProfileGallery">
          <WebsitePreview ong={ong} caption="Site oficial — visão geral" />
          <WebsitePreview ong={ong} mode="portrait" caption="Conteúdo e campanhas" />
          <figure className="ongBrandPanel">
            <div><img src={ong.logo} alt={`Identidade visual da ${ong.name}`} /></div>
            <figcaption>
              <span>Identidade da organização</span>
              <small>Material do diretório PREVER</small>
            </figcaption>
          </figure>
        </div>

        <aside className="ongSupportNotice">
          <div>
            <strong>O apoio acontece no canal oficial.</strong>
            <p>O PREVER apresenta a organização, mas não recebe nem intermedeia doações.</p>
          </div>
          <a href={ong.href} target="_blank" rel="noreferrer">Acessar {ong.shortName} ↗</a>
        </aside>
      </div>
    </section>
  )
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash)
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })
  const [phone, setPhone] = useState('')
  const [isAppModalOpen, setIsAppModalOpen] = useState(false)
  const [modalKind, setModalKind] = useState('mobile')
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [activeOngIndex, setActiveOngIndex] = useState(0)

  const activeOng = ongs[activeOngIndex]
  const selectedOng = route.type === 'detail'
    ? ongs.find((ong) => ong.slug === route.slug)
    : undefined

  useEffect(() => {
    function handleHashChange() {
      setRoute(getRouteFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (route.type === 'landing') {
      document.title = 'PREVER | Prevenção e monitoramento'

      if (route.anchor) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById(route.anchor)?.scrollIntoView()
          })
        })
      }
      return
    }

    document.title = route.type === 'detail' && selectedOng
      ? `${selectedOng.shortName} | ONGs PREVER`
      : 'Todas as ONGs | PREVER'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route, selectedOng])

  useEffect(() => {
    function updateHeaderState() {
      setIsHeaderScrolled(window.scrollY > 28)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

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

  function openNoticeModal(kind) {
    setModalKind(kind)
    setIsAppModalOpen(true)
  }

  function handleMobileAppClick() {
    openNoticeModal('mobile')
  }

  function handleGithubClick() {
    openNoticeModal('github')
  }

  function showPreviousOng() {
    setActiveOngIndex((currentIndex) => (currentIndex - 1 + ongs.length) % ongs.length)
  }

  function showNextOng() {
    setActiveOngIndex((currentIndex) => (currentIndex + 1) % ongs.length)
  }

  function handleEmailClick(event) {
    event.preventDefault()

    const userAgent = window.navigator.userAgent || ''
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent)

    if (isMobile) {
      // Usa o protocolo padrão de e-mail do sistema. No Android, isso abre
      // o Gmail diretamente quando ele está definido como app padrão.
      window.location.href = contactMailtoUrl
      return
    }

    window.open(gmailWebComposeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="siteShell">
      <header
        className={`siteHeader${isHeaderScrolled || route.type !== 'landing' ? ' isScrolled' : ''}`}
        id="home"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty('--header-glow-x', `${event.clientX - bounds.left}px`)
          event.currentTarget.style.setProperty('--header-glow-y', `${event.clientY - bounds.top}px`)
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--header-glow-x', '50%')
          event.currentTarget.style.setProperty('--header-glow-y', '50%')
        }}
      >
        <a className="brand" href="#home" aria-label="PREVER — voltar ao início">
          <BrandLogo variant="dark-background" />
        </a>
        <nav className="navLinks" aria-label="Navegação principal">
          <a href="#home" aria-current={route.type === 'landing' && route.anchor === 'home' ? 'page' : undefined}>Home</a>
          <a href="#/ongs" aria-current={route.type !== 'landing' ? 'page' : undefined}>ONGs</a>
          <a href="#tech" aria-current={route.type === 'landing' && route.anchor === 'tech' ? 'page' : undefined}>Tech</a>
        </nav>
        <a className="navContact" href="#contact">
          Entrar em contato
        </a>
      </header>

      <main>
        {route.type === 'directory' ? (
          <OngDirectoryPage />
        ) : route.type === 'detail' ? (
          <OngDetailPage ong={selectedOng} />
        ) : (
          <>
        <section className="heroSection" aria-label="Apresentação inicial">
          <div className="heroCopy">
            <h1>Acreditamos que a tecnologia e a colaboração cidadã mudam o mundo!</h1>
            <div className="heroActions">
              <a href={SHOW_SYSTEM_SECTION ? '#system' : '#ongs'}>Conhecer o PREVER</a>
              <a href="#contact">Entrar em Contato</a>
            </div>
          </div>
          <div className="wave waveDeep" />
          <div className="wave waveMid" />
          <div className="wave waveLight" />
        </section>

        <section className="missionSection" aria-label="Missão PREVER">
          <div className="pinOutline" aria-hidden="true" />
          <article className="missionText">
            <h2>Conectando inteligência climática e colaboração cidadã para salvar vidas.</h2>
            <p>
              O PREVER resolve a falha no envio de alertas de desastres no Vale do Paraíba ao unir inteligência climática e colaboração cidadã. A plataforma cruza dados meteorológicos oficiais com relatos em tempo real da comunidade (crowdsourcing), transformando mapas estáticos em ações preventivas imediatas e unificando as informações para a Defesa Civil, SAMU e Bombeiros para salvar vidas.
            </p>
          </article>
        </section>

        <section className="ongsSection" id="ongs" aria-labelledby="ongs-title">
          <div className="ongsIntro">
            <article className="ongsCopy">
              <p className="ongsEyebrow">Rede de apoio</p>
              <h2 id="ongs-title">Apoie quem está na linha de frente</h2>
              <p>
                Acesse informações, locais de atuação e links oficiais para apoiar diretamente
                organizações que ajudam a prevenir riscos, responder a emergências e reconstruir comunidades.
              </p>
              <a className="ongsPrimaryAction" href="#/ongs">Conheça as ONGs</a>
            </article>

            <article
              className={`ongSpotlight ongSpotlight--${activeOng.categoryKind}`}
              aria-live="polite"
            >
              <div className="ongSpotlightTopline">
                <span>{activeOng.category}</span>
                <span>{String(activeOngIndex + 1).padStart(2, '0')} / {ongs.length}</span>
              </div>

              <div className="ongSpotlightLogo">
                <img src={activeOng.logo} alt={`Logo da ${activeOng.name}`} />
              </div>

              <div className="ongSpotlightContent">
                <h3>{activeOng.name}</h3>
                <p>{activeOng.description}</p>
                <a href={`#/ongs/${activeOng.slug}`}>
                  Conhecer esta ONG <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="ongCarouselControls" aria-label="Navegação entre ONGs">
                <button type="button" onClick={showPreviousOng} aria-label="ONG anterior">←</button>
                <div className="ongCarouselDots">
                  {ongs.map((ong, index) => (
                    <button
                      className={index === activeOngIndex ? 'isActive' : ''}
                      type="button"
                      key={ong.name}
                      onClick={() => setActiveOngIndex(index)}
                      aria-label={`Mostrar ${ong.name}`}
                      aria-current={index === activeOngIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button type="button" onClick={showNextOng} aria-label="Próxima ONG">→</button>
              </div>
            </article>
          </div>

          <p className="ongsDisclaimer">
            O PREVER não possui vínculo com as organizações listadas e não retém nenhuma porcentagem das doações.
            O apoio é realizado diretamente nos canais oficiais de cada instituição.
          </p>
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
              <img className="dashboardMockup" src={dashboardMobileMockup} alt="Dashboard web e mobile do PREVER" />
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
                placeholder="Olá, gostaria de conhecer melhor o PREVER e entender como ele pode ajudar na gestão de riscos da minha região."
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
                ) : card.kind === 'email' ? (
                  <a
                    className="connectAction"
                    href={card.href}
                    onClick={handleEmailClick}
                  >
                    {card.action}
                  </a>
                ) : card.kind === 'github' ? (
                  <button className="connectAction" type="button" onClick={handleGithubClick}>
                    {card.action}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="siteFooter">
        <BrandLogo className="footerBrandLogo" variant="dark-background" />
        <small>PREVER — Prevenção, monitoramento e resposta a desastres naturais</small>
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
              <img src={modalKind === 'github' ? githubOutlineIcon : downloadIcon} alt="" />
            </div>

            <h2 id="app-modal-title">
              {modalKind === 'github' ? 'Indisponível no momento' : 'Aplicativo em desenvolvimento'}
            </h2>
            <p id="app-modal-description">
              {modalKind === 'github'
                ? 'O repositório do PREVER não está público no momento.'
                : 'A solução mobile do PREVER ainda está sendo preparada. O acesso será disponibilizado por aqui em breve.'}
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
