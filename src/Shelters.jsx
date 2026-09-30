import { useEffect, useRef, useState } from 'react'

// Exemplos fictícios exclusivos da prévia visual. Não representam pedidos reais.
const requests = [
  { id: 'agua', title: 'Água potável (garrafas de 500 ml)', shelter: 'Abrigo Esperança', city: 'São José dos Campos', category: 'Água', priority: 'Urgente', target: 1000, received: 250, unit: 'garrafas', icon: 'water' },
  { id: 'higiene', title: 'Kits de higiene pessoal', shelter: 'Casa Acolher', city: 'Taubaté', category: 'Higiene', priority: 'Moderado', target: 100, received: 60, unit: 'kits', icon: 'box' },
  { id: 'alimentos', title: 'Alimentos básicos (não perecíveis)', shelter: 'Centro Solidário', city: 'Jacareí', category: 'Alimentos', priority: 'Leve', target: 500, received: 500, unit: 'kg', icon: 'heart' },
]
const filters = ['Todos', 'Urgentes', 'Em andamento', 'Concluídos']
const number = new Intl.NumberFormat('pt-BR')
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function SupportIcon({ kind = 'home', ...props }) {
  const paths = {
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7" /></>,
    water: <path d="M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Zm-3 13a3 3 0 0 0 3 3" />,
    box: <><path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10M7 5l10 4" /></>,
    heart: <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 5 3 11 8 15 5-4 13-10 8-15Z" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[kind]}</svg>
}

function PreviewDialog({ request, owner = false, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  const done = request && request.received >= request.target
  return (
    <dialog ref={dialogRef} className="shelterDialog" aria-labelledby="shelter-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="shelterDialogInner">
        <button className="shelterDialogClose" type="button" aria-label="Fechar prévia" onClick={onClose} autoFocus>×</button>
        <span className="shelterIcon"><SupportIcon kind={owner ? 'home' : request.icon} /></span>
        <p className="shelterEyebrow">Prévia visual • dados fictícios</p>
        <h2 id="shelter-dialog-title">{owner ? 'Seu abrigo nesta rede' : request.title}</h2>
        {owner ? <>
          <p>Este será o espaço para apresentar seu abrigo e compartilhar o que ele precisa receber.</p>
          <ol><li>Apresente o abrigo e sua localização.</li><li>Informe os itens necessários e as metas.</li><li>Acompanhe o apoio recebido.</li></ol>
          <p className="shelterDialogNotice">O cadastro de abrigos ainda não está disponível nesta prévia.</p>
        </> : <>
          <p>{request.shelter} · {request.city}</p>
          <dl className="shelterRequestSummary"><div><dt>Recebido</dt><dd>{number.format(request.received)} {request.unit}</dd></div><div><dt>Meta</dt><dd>{number.format(request.target)} {request.unit}</dd></div></dl>
          <p>{done ? 'Este exemplo mostra um pedido com a meta concluída.' : 'Aqui você encontrará as orientações para apoiar este pedido e combinar a entrega com o abrigo.'}</p>
          <p className="shelterDialogNotice">Este pedido é fictício. Nenhuma doação é registrada ou cobrada nesta prévia.</p>
        </>}
        <button className="shelterButton shelterButtonPrimary" type="button" onClick={onClose}>Entendi</button>
      </div>
    </dialog>
  )
}

export function ShelterSection() {
  const [active, setActive] = useState(0)
  const [ownerOpen, setOwnerOpen] = useState(false)
  const current = requests[active]
  return (
    <section className="shelterSection" id="abrigos" aria-labelledby="shelters-title">
      <div className="shelterSectionInner">
        <div className="shelterShowcase" aria-label="Exemplos de pedidos de abrigos">
          <div className="shelterShowcaseBack" aria-hidden="true" />
          <article className="shelterSpotlight">
            <span className="shelterDemoBadge">Exemplo ilustrativo</span>
            <div className="shelterSpotlightArt" aria-hidden="true"><div className="shelterArtRing" /><SupportIcon kind={current.icon} /><span className="shelterArtHeart"><SupportIcon kind="heart" /></span></div>
            <div className="shelterSpotlightCopy" aria-live="polite"><small>{current.category}</small><h3>{current.title}</h3><p>{current.shelter}</p></div>
            <a className="shelterButton shelterButtonPrimary" href="#/abrigos">Conheça e doe <span aria-hidden="true">↗</span></a>
          </article>
          <div className="shelterCarousel" aria-label="Selecionar exemplo de pedido">
            {requests.map((request, index) => <button key={request.id} type="button" aria-label={`Mostrar exemplo: ${request.title}`} aria-pressed={index === active} onClick={() => setActive(index)}><span /></button>)}
          </div>
        </div>
        <div className="shelterSectionCopy">
          <p className="shelterEyebrow">Uma rede de cuidado</p>
          <h2 id="shelters-title">Apoie quem está<br />na linha de frente</h2>
          <p>Cada abrigo tem uma necessidade. Conheça os pedidos e descubra como água, alimentos e itens essenciais podem fazer a diferença para quem precisa de acolhimento.</p>
          <div className="shelterActions"><a className="shelterButton shelterButtonPrimary" href="#/abrigos">Conhecer e doar <span aria-hidden="true">↗</span></a><button className="shelterButton shelterButtonOutline" type="button" onClick={() => setOwnerOpen(true)}>Tenho um abrigo</button></div>
          <p className="shelterPreviewNote">Prévia visual com abrigos e pedidos fictícios.</p>
        </div>
      </div>
      <p className="shelterDisclaimer">O apoio será combinado diretamente com cada abrigo. O PREVER não recebe doações nem retém porcentagens.</p>
      {ownerOpen && <PreviewDialog owner onClose={() => setOwnerOpen(false)} />}
    </section>
  )
}

export function ShelterRequestsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState(null)
  const [ownerOpen, setOwnerOpen] = useState(false)
  const visible = requests.filter((request) => {
    const done = request.received >= request.target
    const matches = filter === 'Todos' || (filter === 'Urgentes' && request.priority === 'Urgente' && !done) || (filter === 'Em andamento' && !done) || (filter === 'Concluídos' && done)
    return matches && normalize(`${request.title} ${request.shelter} ${request.city} ${request.category}`).includes(normalize(query.trim()))
  })
  function reset() { setQuery(''); setFilter('Todos') }
  return (
    <section className="shelterRequestsPage" aria-labelledby="requests-title">
      <div className="shelterRequestsInner">
        <a className="shelterBack" href="#abrigos">← Voltar para a apresentação</a>
        <div className="shelterRequestsHeading"><div><p className="shelterEyebrow">Rede de apoio aos abrigos</p><h1 id="requests-title">Todos os pedidos<span>:</span></h1><p>Pequenas contribuições. Um acolhimento melhor para todos.</p></div><button className="shelterButton shelterButtonOutline" type="button" onClick={() => setOwnerOpen(true)}>Tenho um abrigo <span aria-hidden="true">↗</span></button></div>
        <p className="shelterDemoNotice"><span aria-hidden="true">◌</span> Prévia visual · Os abrigos, pedidos e valores abaixo são fictícios.</p>
        <div className="shelterToolbar"><label className="shelterSearch"><SupportIcon kind="search" /><input type="search" aria-label="Buscar por abrigo, cidade, categoria ou pedido" placeholder="Buscar por abrigo, cidade, categoria ou pedido" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="shelterFilters" aria-label="Filtrar pedidos por situação">{filters.map((value) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div></div>
        <p className="shelterResultCount" role="status">{visible.length} {visible.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}</p>
        <div className="shelterRequestsGrid">
          {visible.map((request) => {
            const done = request.received >= request.target
            const percent = Math.min(100, Math.round(request.received / request.target * 100))
            return <article className={`shelterRequestCard shelterRequestCard--${done ? 'done' : request.priority.toLowerCase()}`} key={request.id}>
              <div className="shelterCardTop"><span className="shelterIcon"><SupportIcon kind={request.icon} /></span><span className={`shelterPriority shelterPriority--${done ? 'done' : request.priority.toLowerCase()}`}>{done ? 'Concluído' : request.priority}</span></div>
              <p className="shelterCardCategory">{request.category}</p><h2>{request.title}</h2><p className="shelterCardLocation">{request.shelter}<span>{request.city}</span></p>
              <div className="shelterProgressLabels"><span><strong>{number.format(request.received)}</strong> / {number.format(request.target)} {request.unit}</span><strong>{percent}%</strong></div><progress max="100" value={percent} aria-label={`${request.title}: ${percent}% da meta recebida`} />
              <p className="shelterRemaining">{done ? 'Meta alcançada. Cada gesto conta!' : `Faltam ${number.format(request.target - request.received)} ${request.unit} para completar a meta.`}</p>
              <div className="shelterCardActions"><button className="shelterButton shelterButtonOutline" type="button" onClick={() => setSelected(request)} aria-label={`Detalhes: ${request.title}`}>Detalhes</button><button className="shelterButton shelterButtonPrimary" type="button" onClick={() => setSelected(request)} disabled={done} aria-label={done ? `Pedido concluído: ${request.title}` : `Doar: ${request.title}`}>{done ? 'Concluído' : 'Doar'}{!done && <span aria-hidden="true">↗</span>}</button></div>
            </article>
          })}
        </div>
        {!visible.length && <div className="shelterEmpty"><SupportIcon kind="search" /><h2>Nenhum pedido encontrado</h2><p>Tente outro termo ou veja todos os pedidos disponíveis na prévia.</p><button className="shelterButton shelterButtonPrimary" type="button" onClick={reset}>Limpar busca e filtros</button></div>}
        <p className="shelterRequestsFootnote">Doar é um gesto de cuidado. Nesta prévia, você pode explorar os pedidos sem realizar uma doação.</p>
      </div>
      {selected && <PreviewDialog request={selected} onClose={() => setSelected(null)} />}
      {ownerOpen && <PreviewDialog owner onClose={() => setOwnerOpen(false)} />}
    </section>
  )
}
