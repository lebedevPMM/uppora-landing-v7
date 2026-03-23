import { useEffect, useRef, useState } from 'react'
import './RoadmapV2.css'

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('active'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Timeline progress hook ─── */
function useTimelineProgress() {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setHeight(docH > 0 ? (scrollTop / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return height
}

/* ─── Section wrapper with reveal ─── */
function Section({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  const ref = useReveal()
  return (
    <section ref={ref} id={id} className={`rv2-reveal relative pt-32 mb-48 ${className}`}>
      {children}
    </section>
  )
}

/* ─── Feature panel card ─── */
function FeaturePanel({
  icon,
  code,
  title,
  description,
  iconClass = 'rv2-icon-luminous',
  rightLabel,
  className = '',
}: {
  icon: React.ReactNode
  code?: string
  title: string
  description: string
  iconClass?: string
  rightLabel?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rv2-panel rv2-panel-hoverable ${className}`} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span className={iconClass}>{icon}</span>
        </div>
        {rightLabel || (code && <span className="rv2-micro-label" style={{ opacity: 0.3 }}>{code}</span>)}
      </div>
      <div>
        <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function RoadmapV2() {
  const progressHeight = useTimelineProgress()
  const heroRef = useReveal()

  return (
    <div className="roadmap-v2">
      {/* Ambient glows */}
      <div className="rv2-ambient-glow" style={{ background: 'var(--emerald-900)', width: 600, height: 600, top: -100, left: '50%', transform: 'translateX(-50%)' }} />
      <div className="rv2-ambient-glow" style={{ background: 'rgba(6,78,59,0.4)', width: 800, height: 800, top: '40%', right: -200 }} />
      <div className="rv2-ambient-glow" style={{ background: 'rgba(6,78,59,0.3)', width: 1000, height: 1000, bottom: -200, left: -300 }} />

      {/* Timeline spine (desktop) */}
      <div className="rv2-timeline-spine" style={{ display: 'none' }}>
        <div className="rv2-timeline-progress" style={{ height: `${progressHeight}%` }} />
      </div>
      <style>{`@media(min-width:1024px){.rv2-timeline-spine{display:block!important}}`}</style>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', padding: '8rem 1.5rem 16rem' }}>

        {/* ═══ HERO ═══ */}
        <section ref={heroRef} id="hero" className="rv2-reveal" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', marginBottom: '12rem' }}>
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))', maxWidth: '48rem', position: 'relative' }}>
            {/* Active node indicator */}
            <div style={{ position: 'absolute', left: -48, top: '50%', display: 'flex', alignItems: 'center' }} className="hidden lg:flex">
              <div style={{ position: 'relative', width: 12, height: 12 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--emerald-500)', borderRadius: '50%', zIndex: 10, border: '1px solid var(--emerald-300)' }} />
                <div className="rv2-pulse-ring" />
              </div>
              <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 32, height: 1, background: 'rgba(16,185,129,0.5)', display: 'block' }} />
                <span className="rv2-micro-label" style={{ color: 'var(--emerald-400)' }}>Вы здесь</span>
              </div>
            </div>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', marginBottom: '2rem' }}>
              <span className="rv2-animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)', display: 'block' }} />
              <span className="rv2-micro-label">RELEASE 0.39 / ROADMAP</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '2rem' }}>
              Мы строим Uppora{' '}
              <br />
              <span style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, var(--emerald-300), var(--emerald-500))' }}>
                вместе с авторами.
              </span>
              <br />Вот что вас ждёт.
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--muted)', maxWidth: '40rem', lineHeight: 1.6, marginBottom: '3rem' }}>
              Прозрачный план развития платформы — от альфы до релиза. Конкретные даты, конкретные функции. Без «скоро» и «в планах».
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
                <a href="#cta" className="rv2-btn-luminous" style={{ padding: '1rem 2rem', borderRadius: 12, fontWeight: 500, letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                  Присоединиться к альфе
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transition: 'transform 0.3s' }}><path strokeLinecap="square" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
                    <svg width="16" height="16" fill="var(--emerald-500)" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span>Founding Creator</span>
                  </div>
                  <span className="rv2-micro-label" style={{ marginTop: 4 }}>Осталось 14 / 50 мест</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ СЕЙЧАС ═══ */}
        <Section id="now">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span className="rv2-micro-label" style={{ padding: '4px 8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald-400)', borderRadius: 4 }}>
                🟢 LIVE
              </span>
              <span className="rv2-micro-label" style={{ color: 'var(--muted)' }}>Март 2026</span>
            </div>

            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', marginBottom: 16 }}>
              Это не обещания.<br />Это уже работает.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '4rem', maxWidth: '36rem' }}>
              Uppora принимает реальные донаты от реальных людей. Прямо сейчас.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 20 }} className="rv2-grid-now">
              <style>{`.rv2-grid-now{grid-template-columns:1fr}@media(min-width:768px){.rv2-grid-now{grid-template-columns:repeat(2,1fr)}}@media(min-width:768px){.rv2-grid-now>.rv2-card-wide{grid-column:span 2}}@media(min-width:1024px){.rv2-grid-now>.rv2-card-wide{grid-column:span 1}}`}</style>
              <FeaturePanel
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                code="FEAT_01"
                title="Донат в один клик"
                description="Донатер не регистрируется, не создаёт аккаунт, не подтверждает email. Открыл ссылку → выбрал сумму → оплатил. 30 секунд."
              />
              <FeaturePanel
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                code="FEAT_02"
                title="Мгновенный вывод"
                description="Деньги приходят на вашу карту. Не через неделю, не через модерацию, не через минимальный порог. Вывел — получил."
              />
              <FeaturePanel
                icon={<span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.125rem', fontWeight: 700 }}>0%</span>}
                code="FEAT_03"
                title="0% комиссия на альфе"
                description="Во время альфа-тестирования — никакой комиссии. Получили 5,000₽ — на карте 5,000₽. Для сравнения: Boosty берёт 10%."
              />
              <FeaturePanel
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                code="FEAT_04"
                title="Персональная страница"
                description="Ваша страница на uppora.org. Мы настроим её сами — от вас: фото, пара предложений о себе, и 5 минут в чате."
              />
              <FeaturePanel
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                code="FEAT_05"
                title="Личный кабинет"
                description="Баланс в реальном времени. Каждый донат отображается моментально. История всех транзакций в одном месте."
                className="rv2-card-wide"
              />
              <FeaturePanel
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#eab308' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title="Безопасная сделка"
                description="Все платежи проходят через эскроу Т-Банка. Данные карт хранятся на стороне банка. Уровень безопасности — банковский."
                iconClass="rv2-icon-luminous"
                className="rv2-card-wide"
                rightLabel={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
                    <span className="rv2-micro-label" style={{ opacity: 0.5 }}>T-BANK ESCROW</span>
                  </div>
                }
              />
            </div>
          </div>
        </Section>

        {/* ═══ АПРЕЛЬ ═══ */}
        <Section id="april">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))', display: 'flex', gap: '4rem', alignItems: 'flex-start' }} className="rv2-april-layout">
            <style>{`.rv2-april-layout{flex-direction:column}@media(min-width:1024px){.rv2-april-layout{flex-direction:row}}`}</style>
            {/* Left: text + features */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span className="rv2-micro-label rv2-animate-pulse" style={{ padding: '4px 8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald-400)', borderRadius: 4 }}>
                  ⏳ ЧЕРЕЗ 3 НЕДЕЛИ
                </span>
                <span className="rv2-micro-label" style={{ color: 'var(--muted)' }}>15 Апреля 2026</span>
              </div>

              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', marginBottom: 16 }}>
                Uppora становится вашим<br />ежедневным инструментом
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '3rem' }}>
                Платформа перестаёт быть «просто страницей». Появляется обратная связь, уведомления и PWA приложение.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                <div className="rv2-step-line" />
                {[
                  { num: '01', title: 'PWA — приложение на телефоне', desc: 'Добавляете Uppora на главный экран — работает как нативное приложение. Push-уведомления, быстрый доступ.' },
                  { num: '02', title: 'Комментарии от донатеров', desc: 'Впервые увидите не просто цифру, а человека. Слова благодарности, вопросы. Вы отвечаете прямо в кабинете.' },
                  { num: '03', title: 'Уведомления в реальном времени', desc: 'Push на телефон и email о каждом новом донате. Не надо заходить и проверять — Uppora сама скажет.' },
                  { num: '04', title: 'Профиль автора & Подписчики', desc: 'Полноценная визитка. Люди могут подписаться на ваш проект. Начало аудитории внутри платформы.' },
                ].map((f) => (
                  <div key={f.num} style={{ position: 'relative', paddingLeft: 40 }}>
                    <div className="rv2-step-num">{f.num}</div>
                    <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 4 }}>{f.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div style={{ flex: 1, width: '100%', maxWidth: 384, margin: '0 auto' }} className="lg:mt-12">
              <div className="rv2-mockup-container" style={{ height: 500, padding: 16, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div className="rv2-mockup-shine" />

                {/* Status bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 8px', opacity: 0.5 }}>
                  <span className="rv2-micro-label">14:02</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 12, height: 8, border: '1px solid rgba(255,255,255,0.4)' }} />
                    <div style={{ width: 16, height: 8, border: '1px solid rgba(255,255,255,0.4)' }} />
                  </div>
                </div>

                {/* Notification — slides up on mockup hover */}
                <div className="rv2-panel rv2-mockup-notification" style={{ padding: 16, margin: '16px 8px 0', backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div className="rv2-animate-pulse" style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--emerald-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" fill="black" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                    </div>
                    <span className="rv2-animate-pulse" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--emerald-300)', textTransform: 'uppercase' }}>
                      Uppora &bull; сейчас
                    </span>
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>
                    Новый донат: <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>500₽ от Михаила</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    &laquo;Спасибо за вчерашнюю лекцию! Жду следующую.&raquo;
                  </div>
                </div>

                {/* Ghost items */}
                <div style={{ position: 'absolute', bottom: 40, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 12, opacity: 0.2, pointerEvents: 'none' }}>
                  {[24, 32, 20].map((w, i) => (
                    <div key={i} style={{ height: 64, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                      <div style={{ marginLeft: 16, height: 8, width: w * 4, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ МАЙ ═══ */}
        <Section id="may">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span className="rv2-micro-label" style={{ padding: '4px 8px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: 'var(--emerald-300)', borderRadius: 4 }}>
                📅 1 МАЯ
              </span>
              <span className="rv2-micro-label" style={{ color: 'var(--muted)' }}>Официальная Бета</span>
            </div>

            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', marginBottom: 16 }}>
              Двери открыты.<br />Но вы — уже внутри.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '4rem', maxWidth: '40rem' }}>
              Открытая регистрация для всех. Те, кто пришёл раньше — уже освоились, набрали подписчиков и получили статус Founding Creator.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', position: 'relative' }} className="rv2-grid-may">
              <style>{`.rv2-grid-may{grid-template-columns:1fr}@media(min-width:768px){.rv2-grid-may{grid-template-columns:repeat(3,1fr)}}`}</style>
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, opacity: 0.1, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', animation: 'rv2-spin-slow 60s linear infinite' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="rv2-panel" style={{ padding: '2rem', zIndex: 10, borderTopColor: 'rgba(16,185,129,0.4)', transition: 'all 0.3s' }}>
                <div className="rv2-micro-label" style={{ color: 'var(--emerald-400)', marginBottom: 16 }}>ACCESS_OPEN</div>
                <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: 12 }}>Открытая регистрация</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Любой автор может зарегистрироваться. Приглашение больше не нужно. Масштабирование платформы.</p>
              </div>

              <div className="rv2-panel" style={{ padding: '2rem', zIndex: 10 }}>
                <div className="rv2-micro-label" style={{ opacity: 0.5, marginBottom: 16 }}>SYS_SECURE</div>
                <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: 12 }}>Модерация и безопасность</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Фильтр токсичных комментариев. Вход через VK/Yandex в один клик. 2FA для защиты аккаунта.</p>
              </div>

              <div className="rv2-panel" style={{ padding: '2rem', zIndex: 10 }}>
                <div className="rv2-micro-label" style={{ opacity: 0.5, marginBottom: 16 }}>DATA_ANALYTICS</div>
                <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: 12 }}>Расширенная статистика</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Фильтры по дате, сумме, источнику. Экспорт данных. Полная картина: кто, сколько, когда, откуда.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ ЛЕТО ═══ */}
        <Section id="summer">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span className="rv2-micro-label rv2-animate-pulse" style={{ padding: '4px 8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald-400)', borderRadius: 4 }}>
                ☀️ ЛЕТО 2026
              </span>
              <span className="rv2-micro-label" style={{ color: 'var(--muted)' }}>Инструменты роста</span>
            </div>

            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', marginBottom: 16 }}>
              Теперь Uppora<br />помогает вам расти
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '4rem', maxWidth: '36rem' }}>
              До этого момента платформа принимала деньги. Теперь — помогает зарабатывать больше.
            </p>

            <div style={{ display: 'grid', gap: '2rem 3rem' }} className="rv2-grid-summer">
              <style>{`.rv2-grid-summer{grid-template-columns:1fr}@media(min-width:768px){.rv2-grid-summer{grid-template-columns:repeat(2,1fr);gap:2rem 3rem}}`}</style>
              {[
                { title: 'Детальные отчёты', desc: 'Откуда приходят донатеры, средний чек, динамика. Данные → понимание → решения → рост.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />, emeraldHover: true, hasDot: true },
                { title: 'Рейтинги и голосования', desc: 'Спросите аудиторию: какую тему раскрыть следующей? Голосование прямо на странице.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />, emeraldHover: true },
                { title: 'Блог на странице проекта', desc: 'Публикуйте обновления, закулисье. Не нужен отдельный сайт или канал — всё в одном месте.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />, emeraldHover: false },
                { title: 'Виджеты для встраивания', desc: 'Кнопка "Поддержать" для вашего сайта или блога. Одна строка кода — донатеры приходят отовсюду.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, emeraldHover: false },
                { title: 'Верификация проекта', desc: 'Подтверждённый проект = галочка доверия. Донатеры видят проверку, конверсия растёт.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />, emeraldHover: false },
                { title: 'Расширенный профиль', desc: 'Портфолио работ, интеграция с соцсетями. Полноценная визитка для любой аудитории.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />, emeraldHover: false },
              ].map((f) => (
                <div key={f.title} className={`rv2-summer-feature ${!f.emeraldHover ? 'rv2-amber-hover' : ''}`}>
                  <div className="rv2-feature-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">{f.icon}</svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {f.title}
                      {f.hasDot && <span className="rv2-animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(16,185,129,0.5)', display: 'inline-block' }} />}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ СЕНТЯБРЬ ═══ */}
        <Section id="september">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span className="rv2-micro-label" style={{ padding: '4px 8px', background: '#fff', border: '1px solid #fff', color: '#000', borderRadius: 4, fontWeight: 700 }}>
                🚀 РЕЛИЗ
              </span>
              <span className="rv2-micro-label" style={{ color: 'var(--muted)' }}>1 Сентября 2026</span>
            </div>

            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', marginBottom: 16 }}>
              Полная платформа.<br />Самая низкая комиссия.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '36rem' }}>
              Uppora — не эксперимент. Это платформа, которая работает для авторов.
            </p>

            {/* 3 cards */}
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '4rem' }} className="rv2-grid-sept">
              <style>{`.rv2-grid-sept{grid-template-columns:1fr}@media(min-width:768px){.rv2-grid-sept{grid-template-columns:repeat(3,1fr)}}`}</style>
              <div className="rv2-panel" style={{ padding: '1.5rem', borderTopColor: 'rgba(16,185,129,0.3)', transition: 'all 0.3s' }}>
                <h4 style={{ fontWeight: 500, marginBottom: 8, color: 'white' }}>Каталог авторов</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Входящий трафик от платформы. Новые донатеры находят вас без вашего участия.</p>
              </div>
              <div className="rv2-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 500, marginBottom: 8, color: 'white' }}>Лента активности</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Ваши обновления видят все подписчики. Без алгоритмов, без оплаты за охват.</p>
              </div>
              <div className="rv2-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 500, marginBottom: 8, color: 'white' }}>Стабильность 99.5%</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Мониторинг 24/7, автоматические бэкапы, CDN. Техника работает незаметно.</p>
              </div>
            </div>

            {/* Comparison table */}
            <div className="rv2-panel" style={{ overflow: 'auto' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)' }}>
                <span className="rv2-micro-label">SYS.COMPARE_MATRIX</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(239,68,68,0.5)' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(234,179,8,0.5)' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(34,197,94,0.5)' }} />
                </div>
              </div>
              <table className="rv2-tech-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr className="rv2-micro-label" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <th style={{ width: '33%' }}>Параметр</th>
                    <th style={{ color: 'var(--emerald-400)', background: 'rgba(16,185,129,0.1)' }}>Uppora</th>
                    <th>Boosty</th>
                    <th>Донатион</th>
                    <th>VK Donut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Комиссия</td>
                    <td style={{ color: 'var(--emerald-400)', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(16,185,129,0.1)', fontWeight: 600 }}>4%</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>10%</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>12%</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>10%</td>
                  </tr>
                  <tr>
                    <td>НДФЛ</td>
                    <td style={{ color: 'var(--emerald-300)', background: 'rgba(16,185,129,0.1)' }}>0% <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>(дарение)</span></td>
                    <td>13%</td>
                    <td>13%</td>
                    <td>13%</td>
                  </tr>
                  <tr>
                    <td>Регистрация донатера</td>
                    <td style={{ color: 'var(--emerald-400)', background: 'rgba(16,185,129,0.1)', fontWeight: 600 }}>Нет</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Да</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Да</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Да</td>
                  </tr>
                  <tr>
                    <td>Мгновенный вывод</td>
                    <td style={{ color: 'var(--emerald-400)', background: 'rgba(16,185,129,0.1)', fontWeight: 600 }}>Да</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>(1-5 дн)</span></td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет</td>
                  </tr>
                  <tr>
                    <td>QR для офлайна</td>
                    <td style={{ color: 'var(--emerald-400)', background: 'rgba(245,158,11,0.05)' }}>Да</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет</td>
                    <td style={{ color: 'rgba(248,113,113,0.7)' }}>Нет</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* ═══ CTA ═══ */}
        <Section id="cta" className="pb-32">
          <div style={{ marginLeft: 'max(0px, calc(50% - 320px + 48px))' }}>
            <div className="rv2-panel" style={{ padding: '4px 8px', borderColor: 'rgba(16,185,129,0.3)', position: 'relative', overflow: 'hidden', transition: 'all 0.5s' }}>
              {/* Glow overlay — uses Tailwind-style pulse */}
              <div className="rv2-animate-pulse" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(16,185,129,0.1), transparent)', pointerEvents: 'none' }} />

              <div style={{ background: 'var(--void)', borderRadius: 12, padding: '2rem', position: 'relative', zIndex: 10 }} className="rv2-cta-inner">
                <style>{`@media(min-width:768px){.rv2-cta-inner{padding:3rem}}`}</style>
                <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16, color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to bottom, white, rgba(255,255,255,0.6))' }}>
                    50 Founding Creators.<br />Навсегда в истории.
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: '1.125rem' }}>
                    Это не маркетинговый трюк. 50 мест — реальное ограничение альфы. Когда закончатся — закончатся.
                  </p>
                </div>

                {/* Perks grid */}
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '4rem' }} className="rv2-grid-perks">
                  <style>{`.rv2-grid-perks{grid-template-columns:1fr}@media(min-width:640px){.rv2-grid-perks{grid-template-columns:repeat(2,1fr)}}`}</style>
                  {[
                    { icon: <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25rem', color: 'var(--emerald-400)' }}>0%</span>, title: 'Комиссия на альфе', desc: 'Экономия ~1,000₽/мес при обороте 25k в сравнении с аналогами.' },
                    { icon: <svg width="24" height="24" fill="var(--emerald-500)" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>, title: 'Значок навсегда', desc: 'Founding Creator — как первые пользователи Instagram. Статус, который не покупается.' },
                    { icon: <svg width="24" height="24" fill="none" stroke="var(--emerald-400)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>, title: 'Прямой доступ к команде', desc: 'Личный чат с основателями. Ваши пожелания = наш приоритет.' },
                    { icon: <svg width="24" height="24" fill="none" stroke="var(--emerald-400)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'Консьерж-онбординг', desc: 'Мы сами настроим страницу. Ваших усилий: 5 минут.' },
                  ].map((p) => (
                    <div key={p.title} style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ marginTop: 4, flexShrink: 0 }}>{p.icon}</div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: 4, color: 'rgba(255,255,255,0.9)' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                    <input type="text" className="rv2-input-tech" placeholder="Имя или псевдоним" required style={{ padding: '0.875rem 1rem', borderRadius: 8, fontSize: '0.875rem' }} />
                    <input type="url" className="rv2-input-tech" placeholder="Ссылка на канал / проект" required style={{ padding: '0.875rem 1rem', borderRadius: 8, fontSize: '0.875rem' }} />
                    <input type="text" className="rv2-input-tech" placeholder="Telegram (@username)" required style={{ padding: '0.875rem 1rem', borderRadius: 8, fontSize: '0.875rem' }} />
                    <button type="submit" className="rv2-btn-luminous" style={{ padding: '1rem', borderRadius: 12, fontWeight: 600, letterSpacing: '0.05em', fontSize: '0.875rem', cursor: 'pointer', marginTop: 8 }}>
                      Стать Founding Creator
                    </button>
                    <p className="rv2-micro-label" style={{ textAlign: 'center', opacity: 0.4, marginTop: 4 }}>
                      Мы свяжемся в течение 24 часов и всё настроим за вас.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </main>
    </div>
  )
}
