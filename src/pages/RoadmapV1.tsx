import './RoadmapV1.css'

/* ─── Icons (inline SVGs) ─── */
const IconBolt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)
const IconDollar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)
const IconPercent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8l-8 8" />
    <line x1="9" y1="8" x2="9.01" y2="8" />
    <line x1="15" y1="16" x2="15.01" y2="16" />
  </svg>
)
const IconLayout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)
const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconUserPlus = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)
const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconDownload = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const IconChat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconDollarSmall = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0914" strokeWidth="3">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

/* ─── Sub-components ─── */

function TimelineNode({
  label,
  phase,
  meta,
  isNow = false,
  left = '4vw',
}: {
  label: string
  phase: string
  meta: string
  isNow?: boolean
  left?: string
}) {
  return (
    <div
      className={`rm-node-container ${isNow ? 'rm-is-now' : ''}`}
      style={{ left }}
    >
      {isNow && <div className="rm-pulse-label">ВЫ ЗДЕСЬ</div>}
      <div className="rm-node-point" />
      <div className="rm-node-label">{label}</div>
      <div className="rm-node-meta">
        <span>{phase}</span>
        <span>{meta}</span>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  code,
  title,
  description,
  special = false,
  codeColor,
  iconBg,
  iconBorder,
  iconColor,
  titleColor,
}: {
  icon: React.ReactNode
  code: string
  title: string
  description: string
  special?: boolean
  codeColor?: string
  iconBg?: string
  iconBorder?: string
  iconColor?: string
  titleColor?: string
}) {
  return (
    <div className={`rm-card-tech ${special ? 'rm-card-tech-special' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: iconBg || 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${iconBorder || 'rgba(255,255,255,0.1)'}`,
            color: iconColor || '#fff',
          }}
        >
          {icon}
        </div>
        <span className="rm-font-mono" style={{ fontSize: '10px', color: codeColor || '#8c8c9e' }}>
          {code}
        </span>
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem', color: titleColor || '#fff' }}>
        {title}
      </h3>
      <p style={{ color: '#8c8c9e', fontSize: '0.875rem', fontWeight: 300 }}>{description}</p>
    </div>
  )
}

function BracketBox({
  index,
  text,
  active = false,
}: {
  index: string
  text: string
  active?: boolean
}) {
  return (
    <div
      className={`rm-bracket-box ${active ? 'rm-bracket-box-active' : ''}`}
      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}
    >
      <span className="rm-font-mono" style={{ color: '#00ff9d', fontSize: '0.875rem' }}>
        {index}
      </span>
      <span style={{ fontWeight: 300, fontSize: '1.125rem' }}>{text}</span>
    </div>
  )
}

function MayCard({
  number,
  icon,
  title,
  description,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div
      className="rm-may-card"
      style={{
        width: '33.333%',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="rm-may-card-number">{number}</div>
      <div style={{ marginBottom: '1.5rem', color: number === '1' ? '#00ff9d' : '#fff' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: '#8c8c9e', fontSize: '0.875rem', lineHeight: '1.6' }}>{description}</p>
    </div>
  )
}

/* ─── Main page ─── */

export default function RoadmapV1() {
  return (
    <div className="roadmap-v1">
      {/* Background overlays */}
      <div className="rm-noise" />
      <div className="rm-grid" />

      {/* System header */}
      <div className="rm-sys-header">
        <div>
          <span>SYS.OP // UPPORA_NET</span>
          <span>VER. 0.9.4.A</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>PROTOCOL: FOUNDATION</span>
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* Horizontal viewport */}
      <div className="rm-viewport">
        <div className="rm-track">
          {/* Global axis line */}
          <div className="rm-global-axis" />

          {/* ═══ PANEL 1: Hero ═══ */}
          <section className="rm-panel" style={{ width: '80vw' }}>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '10vh' }}>
              <h1
                className="rm-font-display"
                style={{
                  fontWeight: 300,
                  fontSize: '3.75rem',
                  letterSpacing: '0.2em',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                }}
              >
                Мы строим <span style={{ color: '#00ff9d', fontWeight: 400 }}>Uppora</span>
                <br />
                вместе с авторами.
              </h1>
              <p className="rm-section-title" style={{ fontSize: '1.875rem', marginBottom: '3rem' }}>
                Вот что вас ждёт.
              </p>

              <div
                className="rm-font-mono"
                style={{
                  fontSize: '0.875rem',
                  color: '#8c8c9e',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '3rem',
                  maxWidth: '36rem',
                  lineHeight: '1.6',
                }}
              >
                Транспарентная архитектура развития.
                <br />
                Никаких скрытых алгоритмов. Только чистый код и прямая связь с аудиторией.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                <button className="rm-btn-alpha">
                  Присоединиться к альфе
                  <IconArrow />
                </button>
                <div
                  className="rm-font-mono"
                  style={{ fontSize: '10px', color: '#8c8c9e', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  <span>50 мест Founding Creator.</span>
                  <div style={{ width: '4rem', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '76%', background: '#00ff9d' }} />
                  </div>
                  <span style={{ color: '#fff' }}>Осталось [ 12 ].</span>
                </div>
              </div>
            </div>

            <TimelineNode label="Сейчас" phase="PHASE_00 // INITIATION" meta="[ ACTIVE ]" isNow />
          </section>

          {/* ═══ PANEL 2: Current Features ═══ */}
          <section className="rm-panel" style={{ width: '100vw', paddingLeft: 0 }}>
            <div style={{ height: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="rm-section-subtitle">PHASE_00 // FEATURES</div>
              <h2 className="rm-section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Это не обещания. Это уже работает.
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  width: '100%',
                  maxWidth: '80vw',
                }}
              >
                <FeatureCard
                  icon={<IconBolt />}
                  code="MOD_01"
                  title="Донат в один клик"
                  description="Без сложной регистрации. Весь процесс занимает менее 30 секунд."
                  iconBg="rgba(0,255,157,0.1)"
                  iconBorder="rgba(0,255,157,0.3)"
                  iconColor="#00ff9d"
                />
                <FeatureCard
                  icon={<IconDollar />}
                  code="MOD_02"
                  title="Мгновенный вывод"
                  description="Деньги отправляются на вашу карту сразу после подтверждения транзакции."
                />
                <FeatureCard
                  icon={<IconPercent />}
                  code="SPECIAL"
                  title="0% комиссия на альфе"
                  description="Сравните: Boosty забирает 10%, DA — 12%. Мы оставляем 100% вам."
                  special
                  codeColor="#00ff9d"
                  iconBg="#00ff9d"
                  iconBorder="#00ff9d"
                  iconColor="#0a0914"
                  titleColor="#00ff9d"
                />
                <FeatureCard
                  icon={<IconLayout />}
                  code="MOD_03"
                  title="Персональная страница"
                  description="Чистый и минималистичный профиль автора на домене uppora.org."
                />
                <FeatureCard
                  icon={<IconMonitor />}
                  code="MOD_04"
                  title="Личный кабинет"
                  description="Дешборд с балансом в реальном времени и историей всех операций."
                />
                <FeatureCard
                  icon={<IconLock />}
                  code="SECURE"
                  title="Безопасная сделка Т-Банк"
                  description="Эскроу-счета. Данные карт обрабатываются исключительно на стороне банка."
                  iconBg="rgba(136,204,238,0.1)"
                  iconBorder="rgba(136,204,238,0.3)"
                  iconColor="#88ccee"
                />
              </div>
            </div>

            <div className="rm-vertical-line" style={{ left: '-2vw', top: '10vh', height: '50vh' }} />
          </section>

          {/* ═══ PANEL 3: April — Beta 1 ═══ */}
          <section className="rm-panel" style={{ width: '110vw' }}>
            <div style={{ height: '65%', display: 'flex', alignItems: 'center', gap: '4rem' }}>
              {/* Left column: text */}
              <div style={{ width: '33.333%', display: 'flex', flexDirection: 'column' }}>
                <div className="rm-section-subtitle">PHASE_01 // STRUCT</div>
                <h2 className="rm-section-title" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
                  Uppora становится вашим ежедневным инструментом.
                </h2>
                <div style={{ height: 1, width: '3rem', background: '#00ff9d', margin: '2rem 0' }} />
                <p style={{ color: '#8c8c9e', fontWeight: 300, fontSize: '1.125rem', marginBottom: '2rem' }}>
                  Инфраструктура профилей и базовые инструменты интеграции для постоянной связи с аудиторией.
                </p>
              </div>

              {/* Center: Phone mockup */}
              <div style={{ width: 280, flexShrink: 0 }}>
                <div className="rm-phone-mockup">
                  <div className="rm-phone-notch" />
                  <div
                    style={{
                      padding: '1rem',
                      paddingTop: '3rem',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`,
                    }}
                  >
                    {/* Notification card */}
                    <div
                      className="rm-notification-bounce"
                      style={{
                        background: 'rgba(28,29,54,0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,255,157,0.4)',
                        borderRadius: '1rem',
                        padding: '1rem',
                        boxShadow: '0 10px 30px rgba(0,255,157,0.1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            background: '#00ff9d',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconDollarSmall />
                        </div>
                        <span className="rm-font-mono" style={{ fontSize: 9, color: '#8c8c9e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Uppora Pay
                        </span>
                        <span className="rm-font-mono" style={{ fontSize: 9, color: '#8c8c9e', marginLeft: 'auto' }}>
                          Только что
                        </span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', marginBottom: 4 }}>
                        Новый донат: <span style={{ color: '#00ff9d' }}>500 ₽</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#8c8c9e', fontWeight: 300 }}>
                        от Михаила: &quot;Спасибо за крутой контент!&quot;
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 'auto',
                        marginBottom: '1rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '33%',
                        height: 4,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right column: feature list */}
              <div style={{ width: '33.333%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BracketBox index="01" text="PWA-приложение на телефоне" />
                <BracketBox index="02" text="Комментарии от донатеров" />
                <BracketBox index="03" text="Уведомления в реальном времени" active />
                <BracketBox index="04" text="Профиль автора с обложкой" />
                <BracketBox index="05" text="Список подписчиков проекта" />
              </div>
            </div>

            <TimelineNode label="Апрель" phase="PHASE_01 // STRUCT" meta="LAT: 45.92 // LNG: -12.44" />
          </section>

          {/* ═══ PANEL 4: May — Official Beta ═══ */}
          <section className="rm-panel" style={{ width: '100vw' }}>
            <div style={{ height: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="rm-section-subtitle">PHASE_02 // CONNECT</div>
              <h2 className="rm-section-title" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>
                Двери открыты. Но вы — уже внутри.
              </h2>

              <div style={{ display: 'flex', gap: '2rem' }}>
                <MayCard
                  number="1"
                  icon={<IconUserPlus />}
                  title="Открытая регистрация"
                  description="Платформа становится доступна для всех авторов. Выход из закрытой альфы."
                />
                <MayCard
                  number="2"
                  icon={<IconShield />}
                  title="Модерация и безопасность"
                  description="Внедрение AI-фильтра токсичности для комментариев и защита от фрода."
                />
                <MayCard
                  number="3"
                  icon={<IconDownload />}
                  title="Расширенная статистика"
                  description="Детальная аналитика аудитории с возможностью экспорта данных в CSV/API."
                />
              </div>
            </div>

            <TimelineNode label="Май" phase="PHASE_02 // CONNECT" meta="LAT: 46.10 // LNG: -11.80" />
          </section>

          {/* ═══ PANEL 5: Summer — Growth Tools ═══ */}
          <section className="rm-panel" style={{ width: '120vw' }}>
            <div style={{ height: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="rm-section-subtitle">PHASE_03 // EXPAND</div>
              <h2 className="rm-section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Теперь Uppora помогает вам расти.
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem 2rem',
                  maxWidth: '90vw',
                }}
              >
                {[
                  { num: '01', title: 'Детальные отчёты с графиками', desc: 'Визуализация доходов и активности по дням, неделям, месяцам.', highlight: false },
                  { num: '02', title: 'Рейтинги и голосования', desc: 'Инструменты вовлечения аудитории. Позвольте донатерам влиять на контент.', highlight: false },
                  { num: '03', title: 'Блог на странице проекта', desc: 'Публикация новостей и эксклюзивного текстового контента.', highlight: false },
                  { num: '04', title: 'Виджеты для встраивания', desc: 'Настраиваемые блоки донатов для интеграции на ваши сайты и лендинги.', highlight: true },
                  { num: '05', title: 'Верификация проекта', desc: 'Официальная синяя галочка для подтвержденных авторов и брендов.', highlight: false },
                  { num: '06', title: 'Расширенный профиль', desc: 'Мультиссылки, галереи, портфолио прямо на вашей странице Uppora.', highlight: false },
                ].map((f) => (
                  <div key={f.num} className="rm-summer-feature">
                    <div className="rm-font-mono" style={{ fontSize: '1.25rem', color: '#4a4a5e' }}>{f.num}</div>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', color: f.highlight ? '#00ff9d' : '#fff', marginBottom: '0.25rem' }}>
                        {f.title}
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: '#8c8c9e' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <TimelineNode label="Лето" phase="PHASE_03 // EXPAND" meta="LAT: 47.05 // LNG: -10.22" />
          </section>

          {/* ═══ PANEL 6: September — Release ═══ */}
          <section className="rm-panel" style={{ width: '150vw' }}>
            <div style={{ height: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div className="rm-section-subtitle">PHASE_04 // GENESIS</div>
              <h2 className="rm-section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Полная платформа. Самая низкая комиссия на рынке.
              </h2>

              {/* 3 bracket boxes */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', maxWidth: '80vw' }}>
                {[
                  { code: 'SYS.CATALOG', text: 'Каталог авторов по категориям и тегам' },
                  { code: 'SYS.FEED', text: 'Лента активности без умных алгоритмов' },
                  { code: 'SYS.CORE', text: 'Стабильность инфраструктуры 99.5%' },
                ].map((b) => (
                  <div key={b.code} className="rm-bracket-box" style={{ flex: 1 }}>
                    <h4 className="rm-font-mono" style={{ color: '#00ff9d', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      {b.code}
                    </h4>
                    <p style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 300 }}>{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div
                style={{
                  width: '100%',
                  overflowX: 'auto',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(10,9,20,0.8)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <table className="rm-comparison-table" style={{ minWidth: 600 }}>
                  <thead>
                    <tr>
                      <th style={{ width: '25%' }}>Параметр</th>
                      <th className="rm-highlight-col" style={{ width: '25%' }}>Uppora</th>
                      <th style={{ width: '25%' }}>Boosty</th>
                      <th style={{ width: '25%' }}>DonationAlerts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Комиссия сервиса</td>
                      <td className="rm-highlight-col rm-font-mono" style={{ fontSize: '1.25rem', color: '#00ff9d' }}>
                        0% <span style={{ fontSize: '0.75rem', color: 'rgba(0,255,157,0.5)' }}>(на альфе)</span>
                      </td>
                      <td style={{ color: '#8c8c9e' }}>10%</td>
                      <td style={{ color: '#8c8c9e' }}>~10-12%</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Уплата НДФЛ</td>
                      <td className="rm-highlight-col" style={{ color: '#fff' }}>Автор самостоятельно</td>
                      <td style={{ color: '#8c8c9e' }}>Сервис удерживает</td>
                      <td style={{ color: '#8c8c9e' }}>Зависит от статуса</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Регистрация донатера</td>
                      <td className="rm-highlight-col" style={{ color: '#fff' }}>Не требуется</td>
                      <td style={{ color: '#8c8c9e' }}>Обязательна</td>
                      <td style={{ color: '#8c8c9e' }}>Опционально</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500, borderBottom: 'none' }}>Скорость вывода</td>
                      <td className="rm-highlight-col" style={{ color: '#fff', borderBottom: 'none' }}>Мгновенно на карту</td>
                      <td style={{ color: '#8c8c9e', borderBottom: 'none' }}>Ежедневно (авто)</td>
                      <td style={{ color: '#8c8c9e', borderBottom: 'none' }}>По запросу / Сутки</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <TimelineNode label="Сентябрь" phase="PHASE_04 // GENESIS" meta="SYSTEM FULLY OPERATIONAL" />
          </section>

          {/* ═══ PANEL 7: CTA — Founding Creator ═══ */}
          <section className="rm-panel" style={{ width: '100vw', paddingRight: '10vw' }}>
            <div
              style={{
                height: '80%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '-5vh',
              }}
            >
              {/* Left column */}
              <div style={{ width: '41.666%' }}>
                <h2
                  className="rm-font-display"
                  style={{ fontWeight: 300, fontSize: '3rem', lineHeight: 1.2, marginBottom: '2rem' }}
                >
                  50 Founding Creators.
                  <br />
                  <span style={{ color: '#8c8c9e' }}>Навсегда в истории Uppora.</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                  {[
                    { icon: <IconCheck />, text: '0% комиссия сервиса на этапе альфы', accent: true },
                    { icon: <IconStar />, text: 'Эксклюзивный значок в профиле навсегда', accent: false },
                    { icon: <IconChat />, text: 'Прямой доступ к команде разработки', accent: false },
                    { icon: <IconUsers />, text: 'Персональный консьерж-онбординг', accent: false },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 4,
                          background: item.accent ? 'rgba(0,255,157,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${item.accent ? 'rgba(0,255,157,0.3)' : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.accent ? '#00ff9d' : '#fff',
                        }}
                      >
                        {item.icon}
                      </div>
                      <span style={{ fontSize: '1.125rem', fontWeight: 300 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: form */}
              <div
                style={{
                  width: '41.666%',
                  background: 'rgba(28,29,54,0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '2.5rem',
                  position: 'relative',
                }}
              >
                <div className="rm-form-corner-tl" />
                <div className="rm-form-corner-br" />

                <div className="rm-font-mono" style={{ fontSize: '0.75rem', color: '#00ff9d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                  REQ_ACCESS // FORM
                </div>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="rm-tech-input" placeholder="Ваше имя или псевдоним" required />
                    <span className="rm-font-mono" style={{ position: 'absolute', right: 0, bottom: '1rem', fontSize: 10, color: '#4a4a5e' }}>01</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type="url" className="rm-tech-input" placeholder="Ссылка на ваш основной проект/канал" required />
                    <span className="rm-font-mono" style={{ position: 'absolute', right: 0, bottom: '1rem', fontSize: 10, color: '#4a4a5e' }}>02</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="rm-tech-input" placeholder="Telegram для связи (@username)" required />
                    <span className="rm-font-mono" style={{ position: 'absolute', right: 0, bottom: '1rem', fontSize: 10, color: '#4a4a5e' }}>03</span>
                  </div>

                  <button type="submit" className="rm-cta-btn">
                    Стать Founding Creator
                  </button>

                  <p className="rm-font-mono" style={{ fontSize: 10, color: '#8c8c9e', textAlign: 'center', marginTop: '0.5rem', opacity: 0.5 }}>
                    Нажимая кнопку, вы соглашаетесь с условиями альфа-тестирования.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
