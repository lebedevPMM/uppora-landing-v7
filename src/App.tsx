import { useState, useMemo } from 'react'
import { useReveal } from './hooks/useReveal'
import { useStickyHeader } from './hooks/useStickyHeader'
import { useParticles } from './hooks/useParticles'

function App() {
  const [donation, setDonation] = useState(1000)

  useReveal()
  useStickyHeader()
  useParticles('particle-container')

  const calc = useMemo(() => {
    const author = Math.round(donation * 0.96)
    const bank = Math.round(donation * 0.032)
    const uppora = donation - author - bank
    return { author, bank, uppora }
  }, [donation])

  return (
    <>
      {/* S0 — Sticky Header */}
      <header
        id="sticky-header"
        className="fixed top-0 left-0 w-full bg-cream/90 backdrop-blur-md z-50 h-12 border-b border-gray-light -translate-y-full transition-transform duration-300 ease-expo flex items-center shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl tracking-tighter text-dark">Uppora</span>
            <span className="text-sm text-gray-dark hidden md:inline-block">QR-донаты для авторов</span>
          </div>
          <button className="bg-emerald text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-emerald-hover transition-colors cursor-pointer">
            Создать QR бесплатно
          </button>
        </div>
      </header>

      <main className="overflow-hidden font-sans text-lg md:text-xl leading-relaxed">
        {/* S1 — Hero */}
        <section className="relative min-h-screen flex items-center pt-20 pb-24">
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-block bg-gold-light text-dark text-sm font-medium px-3 py-1 rounded-full mb-6 border border-gold/30">
                Uppora — платформа QR-донатов для авторов
              </div>
              <h1 className="text-4xl md:text-[64px] font-bold leading-[1.1] tracking-tighter text-dark mb-6">
                Поддержка без посредников
              </h1>
              <p className="text-gray-dark mb-10 max-w-[65ch]">
                QR за 2 минуты. Без регистрации для донатера.{' '}
                <strong className="text-dark">96% суммы — автору.</strong> Остальное — банку.
              </p>

              {/* Calculator */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-light mb-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-gray-dark font-medium">Донат</span>
                    <span className="text-3xl font-bold text-dark">{donation} ₽</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={donation}
                    onChange={(e) => setDonation(Number(e.target.value))}
                    className="mb-8 relative z-20"
                  />
                  <div className="space-y-3 text-sm md:text-base">
                    <div className="flex justify-between items-center p-3 bg-emerald/5 rounded-lg border border-emerald/10">
                      <span className="font-medium text-emerald">Автору (96%)</span>
                      <span className="font-bold text-emerald text-xl">{calc.author} ₽</span>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 text-gray-dark">
                      <span>Банку (процессинг)</span>
                      <span>{calc.bank} ₽</span>
                    </div>
                    <div className="flex justify-between items-center px-3 py-2 text-gray-dark border-t border-gray-light">
                      <span>Uppora</span>
                      <span>{calc.uppora} ₽</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="w-full sm:w-auto bg-emerald text-white font-medium px-8 py-4 rounded-xl hover:bg-emerald-hover transition-colors shadow-lg shadow-emerald/20 cursor-pointer">
                  Создать свой QR бесплатно
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-8 py-4 text-dark font-medium hover:text-emerald transition-colors flex items-center justify-center gap-2"
                >
                  Посмотреть, как это работает
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </a>
              </div>
            </div>

            {/* QR Visual */}
            <div className="relative flex justify-center items-center reveal h-[400px] md:h-auto">
              <div id="particle-container" className="absolute inset-0 z-0 pointer-events-none" />
              <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 bg-white rounded-3xl p-6 shadow-2xl border border-gold/20 flex flex-col items-center justify-center transform transition-transform hover:scale-[1.02] duration-500 ease-expo">
                <div className="w-full h-full relative grid grid-cols-5 grid-rows-5 gap-2 p-2">
                  <div className="col-span-2 row-span-2 bg-dark rounded-xl flex items-center justify-center p-2"><div className="w-full h-full border-4 border-white rounded-lg" /></div>
                  <div className="col-start-4 col-span-2 row-span-2 bg-dark rounded-xl flex items-center justify-center p-2"><div className="w-full h-full border-4 border-white rounded-lg" /></div>
                  <div className="col-start-1 col-span-2 row-start-4 row-span-2 bg-dark rounded-xl flex items-center justify-center p-2"><div className="w-full h-full border-4 border-white rounded-lg" /></div>
                  <div className="bg-emerald rounded-md" />
                  <div className="bg-dark rounded-md col-span-2" />
                  <div className="bg-gray rounded-md row-span-2" />
                  <div className="bg-gold rounded-md" />
                  <div className="bg-dark rounded-md" />
                  <div className="bg-emerald rounded-md col-span-2" />
                  <div className="bg-dark rounded-md" />
                  <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-light flex items-center justify-center z-20">
                    <span className="font-bold text-2xl text-dark tracking-tighter">U</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* S2 — Transparency */}
        <section className="py-24 bg-white" id="transparency">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                Куда уходят ваши <span className="text-emerald">{donation}</span> ₽
              </h2>
              <p className="text-gray-dark">Наглядное сравнение распределения средств.</p>
            </div>

            {/* Desktop flow */}
            <div className="hidden md:block space-y-12 reveal">
              {/* Competitor */}
              <div className="relative">
                <div className="text-sm font-medium text-gray-dark mb-4 uppercase tracking-wider">Типичная платформа донатов</div>
                <div className="flex items-center justify-between bg-cream p-6 rounded-2xl border border-gray-light relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-light -translate-y-1/2 z-0" />
                  <div className="relative z-10 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-light font-bold text-dark whitespace-nowrap">{donation} ₽</div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white text-error px-3 py-1 rounded-full text-sm font-medium border border-error/20 mb-2 shadow-sm">-10%</div>
                    <div className="text-xs text-gray-dark font-medium">Комиссия</div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white text-error px-3 py-1 rounded-full text-sm font-medium border border-error/20 mb-2 shadow-sm">-3%</div>
                    <div className="text-xs text-gray-dark font-medium">Процессинг</div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white text-error px-3 py-1 rounded-full text-sm font-medium border border-error/20 mb-2 shadow-sm">-13%</div>
                    <div className="text-xs text-gray-dark font-medium">НДФЛ</div>
                  </div>
                  <div className="relative z-10 bg-white px-8 py-4 rounded-xl shadow-md border-2 border-error/20 flex flex-col items-center min-w-[140px]">
                    <span className="text-sm text-gray-dark font-medium mb-1">Автору</span>
                    <span className="text-2xl font-bold text-dark">~{Math.round(donation * 0.71)} ₽</span>
                  </div>
                </div>
              </div>

              {/* Uppora */}
              <div className="relative">
                <div className="text-sm font-medium text-emerald mb-4 uppercase tracking-wider flex items-center gap-2">Uppora</div>
                <div className="flex items-center justify-between bg-emerald/5 p-6 rounded-2xl border border-emerald/20 relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gold/30 -translate-y-1/2 z-0" />
                  <div className="absolute top-1/2 left-6 right-6 h-1 -translate-y-1/2 z-0 overflow-hidden rounded-full">
                    <div className="w-full h-full bg-linear-to-r from-transparent via-gold to-transparent opacity-50" style={{ animation: 'slideRight 3s linear infinite' }} />
                  </div>
                  <div className="relative z-10 bg-white px-6 py-3 rounded-xl shadow-sm border border-emerald/20 font-bold text-dark whitespace-nowrap">{donation} ₽</div>
                  <div className="relative z-10 flex flex-col items-center mr-auto ml-32">
                    <div className="bg-white text-gray-dark px-3 py-1 rounded-full text-sm font-medium border border-gray-light mb-2 shadow-sm">-4%</div>
                    <div className="text-xs text-gray-dark font-medium">Процессинг банка</div>
                  </div>
                  <div className="relative z-10 bg-emerald px-8 py-4 rounded-xl shadow-lg shadow-emerald/20 flex flex-col items-center min-w-[140px] transform scale-110">
                    <span className="text-sm text-white/80 font-medium mb-1">Автору</span>
                    <span className="text-3xl font-bold text-white">{calc.author} ₽</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile bars */}
            <div className="md:hidden space-y-8 reveal">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-dark font-medium">Типичная платформа</span>
                  <span className="font-bold">~{Math.round(donation * 0.71)} ₽</span>
                </div>
                <div className="w-full bg-gray-light rounded-full h-4 overflow-hidden flex">
                  <div className="bg-gray-dark h-full" style={{ width: '71%' }} />
                  <div className="bg-error/80 h-full" style={{ width: '29%' }} />
                </div>
                <div className="text-xs text-error mt-2 text-right">Потери ~{Math.round(donation * 0.29)} ₽ (Комиссии, НДФЛ)</div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald font-bold">Uppora</span>
                  <span className="font-bold text-emerald">{calc.author} ₽</span>
                </div>
                <div className="w-full bg-emerald/10 rounded-full h-6 overflow-hidden flex shadow-inner border border-emerald/20">
                  <div className="bg-emerald h-full rounded-r-full" style={{ width: '96%' }} />
                </div>
                <div className="text-xs text-gray-dark mt-2 text-right">Только 4% эквайринг</div>
              </div>
            </div>

            <div className="mt-12 text-center reveal">
              <p className="text-sm text-gray mb-6">На основе публичных тарифов популярных платформ, март 2026.</p>
              <a href="#how-it-works" className="inline-flex items-center gap-2 text-emerald font-bold hover:text-emerald-hover transition-colors group">
                Хочу получать 96%
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* S3 — How It Works */}
        <section className="py-24 bg-cream" id="how-it-works">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Три простых шага</h2>
              <p className="text-gray-dark">Никаких сложных настроек. Всё готово к работе сразу.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-light flex flex-col reveal" style={{ transitionDelay: '100ms' }}>
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center font-bold text-xl text-dark mb-6">1</div>
                <h3 className="text-xl font-bold mb-2">Создай QR</h3>
                <p className="text-gray-dark text-base mb-8">Только имя и карта для выплат. Без загрузки паспорта. Занимает ровно 2 минуты.</p>
                <div className="mt-auto bg-cream border border-gray-light rounded-2xl p-4 shadow-inner">
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 bg-gray-light rounded" />
                    <div className="h-10 w-full bg-white rounded-lg border border-gray-light flex items-center px-3"><div className="w-4 h-4 rounded-full bg-gray-light mr-2" /><div className="h-2 w-20 bg-gray-light rounded" /></div>
                    <div className="h-4 w-1/2 bg-gray-light rounded mt-4" />
                    <div className="h-10 w-full bg-white rounded-lg border border-gray-light flex items-center px-3"><div className="h-2 w-32 bg-gray-light rounded" /></div>
                    <div className="h-10 w-full bg-emerald rounded-lg mt-4 flex items-center justify-center"><div className="h-2 w-16 bg-white/50 rounded" /></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-dark text-white rounded-3xl p-8 shadow-xl flex flex-col relative overflow-hidden reveal transform md:-translate-y-4" style={{ transitionDelay: '200ms' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(from_var(--color-gold)_l_c_h/0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl text-white mb-6 backdrop-blur-sm">2</div>
                  <h3 className="text-xl font-bold mb-2 text-gold">Донатер сканирует</h3>
                  <p className="text-gray-light text-base mb-8">Без регистрации. Без скачивания приложений. Работает из стандартной камеры смартфона.</p>
                  <div className="mt-auto bg-white rounded-2xl p-6 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gray-light rounded-xl mb-4 relative flex items-center justify-center border-4 border-dashed border-gray">
                      <span className="text-gray-dark text-xs text-center px-2">Здесь настоящий рабочий QR на демо</span>
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald rounded-tl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald rounded-br" />
                    </div>
                    <p className="text-dark text-xs font-medium text-center">Сканируйте прямо сейчас — попробуйте как донатер.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-light flex flex-col reveal" style={{ transitionDelay: '300ms' }}>
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center font-bold text-xl text-dark mb-6">3</div>
                <h3 className="text-xl font-bold mb-2">Деньги пришли</h3>
                <p className="text-gray-dark text-base mb-8">Прямо на вашу карту. В тот же день. Никаких ручных выводов и ожиданий модерации.</p>
                <div className="mt-auto flex items-center justify-center h-48 bg-linear-to-b from-transparent to-cream/50 rounded-2xl">
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-light w-[90%] flex items-start gap-4 transform rotate-[-2deg] hover:rotate-0 transition-transform">
                    <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald"><path d="M12 2v20" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /><path d="M2 12h20" /></svg>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-dark">Поступление</span>
                        <span className="text-xs text-gray-dark">Только что</span>
                      </div>
                      <div className="text-lg font-bold text-emerald">+ {calc.author} ₽</div>
                      <div className="text-xs text-gray-dark mt-1">Через Uppora от тайного поклонника</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center reveal">
              <button className="bg-emerald text-white font-medium px-8 py-4 rounded-xl hover:bg-emerald-hover transition-colors shadow-lg shadow-emerald/20 cursor-pointer">
                Создать свой QR за 2 минуты
              </button>
            </div>
          </div>
        </section>

        {/* S4 — Legal */}
        <section className="py-24 bg-white" id="legal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                Две модели. Мы выбрали ту, что выгоднее автору.
              </h2>
              <p className="text-gray-dark">Юридическая прозрачность без скучных терминов.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Service payment */}
              <div className="p-8 rounded-3xl border border-gray-light bg-cream reveal">
                <div className="text-sm font-medium text-gray-dark uppercase tracking-wider mb-6">Оплата услуг (Стандартный путь)</div>
                <div className="relative pl-8 mb-8">
                  <div className="absolute left-[11px] top-2 bottom-2 border-l-2 border-dashed border-gray-light z-0" />
                  <ul className="space-y-6 relative z-10 text-sm md:text-base list-none p-0 m-0">
                    {[
                      { text: 'Донат отправляется', error: false },
                      { text: 'Попадает на счет Платформы (ООО)', error: false },
                      { text: 'Платформа забирает комиссию (10-15%)', error: true },
                      { text: 'Удержание НДФЛ 13% (или нужен статус самозанятого)', error: true },
                      { text: 'Запрос на вывод средств', error: false },
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-4 ${item.error ? 'text-error' : 'text-gray-dark'}`}>
                        <div className={`w-6 h-6 ${item.error ? 'bg-error/10 border-error/50 text-error' : 'bg-white border-gray'} border rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10`}>
                          {item.error && '-'}
                        </div>
                        <div>{item.text}</div>
                      </li>
                    ))}
                    <li className="flex items-start gap-4 text-dark font-medium">
                      <div className="w-6 h-6 bg-gray text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      </div>
                      <div>Остаток доходит автору</div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl text-sm text-gray-dark border border-gray-light">
                  <strong>Требуется:</strong> статус ИП или самозанятого для легальной работы.
                </div>
              </div>

              {/* Gift model */}
              <div className="p-8 rounded-3xl bg-navy text-white relative overflow-hidden reveal shadow-xl">
                <svg className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path className="dash-line" d="M0,0 C50,20 20,80 100,100" fill="none" stroke="#E8B44C" strokeWidth="2" />
                  <path className="dash-line" d="M0,20 C40,40 60,60 100,80" fill="none" stroke="#E8B44C" strokeWidth="1" style={{ animationDelay: '-1.5s' }} />
                </svg>
                <div className="relative z-10">
                  <div className="text-sm font-medium text-gold mb-6 uppercase tracking-wider">Дарение (Путь Uppora)</div>
                  <div className="relative pl-8 mb-8">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-linear-to-b from-gold to-emerald z-0" />
                    <ul className="space-y-12 relative z-10 text-sm md:text-base list-none p-0 m-0">
                      <li className="flex items-start gap-4 text-white">
                        <div className="w-6 h-6 bg-navy border-2 border-gold rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10" />
                        <div>Донатер отправляет деньги</div>
                      </li>
                      <li className="flex items-start gap-4 text-gold font-bold text-xl">
                        <div className="w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center shrink-0 mt-1 z-10">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </div>
                        <div>Деньги сразу на карте автора</div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3 bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/10 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/70">Основание:</span>
                      <span className="font-bold">ст. 217 НК РФ</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/70">НДФЛ:</span>
                      <span className="font-bold text-green-400">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Специальный статус:</span>
                      <span className="font-bold">Не нужен</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable */}
            <div className="max-w-3xl mx-auto reveal">
              <details className="group bg-cream rounded-2xl border border-gray-light overflow-hidden transition-all duration-300">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-6 hover:bg-gray-light/30 transition-colors">
                  <span>Подробнее о ст. 217 НК РФ</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-gray-dark border-t border-gray-light/50 text-sm md:text-base leading-relaxed">
                  <p className="mb-4">Договор дарения — стандартная гражданско-правовая конструкция, используемая миллионами людей ежедневно. Согласно пункту 18.1 статьи 217 Налогового кодекса РФ, доходы в денежной форме, получаемые от физических лиц в порядке дарения, освобождаются от налогообложения.</p>
                  <p><strong>А что если налоговая проверит?</strong> Uppora предоставляет публичную оферту, согласно которой каждый перевод через платформу юридически квалифицируется как целевое пожертвование (дарение). Это абсолютно прозрачная и законная схема, не требующая отчислений государству.</p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* S5 — Founder */}
        <section className="py-24 bg-cream overflow-hidden" id="founder">
          <div className="max-w-5xl mx-auto px-6 reveal">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-light flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                <div className="absolute inset-0 bg-emerald/10 rounded-full translate-x-4 translate-y-4" />
                <div className="relative w-full h-full bg-gray-light rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-gray-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <svg className="w-10 h-10 text-gold mb-4 mx-auto md:mx-0 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-dark">
                  Я видел, как авторы теряют 20-30% заработанного на комиссиях и налогах. Мы нашли способ делать это иначе, честно и прозрачно.
                </h3>
                <div>
                  <div className="font-bold text-lg text-dark">Алексей Иванов</div>
                  <div className="text-gray-dark text-sm mb-3">Основатель Uppora</div>
                  <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-emerald-hover transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn профиль
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* S6 — Scenarios */}
        <section className="py-24 bg-white" id="scenarios">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Кому это подходит</h2>
              <p className="text-gray-dark">Истории тех, кто уже перестал терять проценты.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>, bg: '#E8E2D9', title: 'Музыкант', desc: 'Играет по выходным в кофейнях. Напечатал QR и поставил на стол — он заменил шляпу для чаевых.', stat: '47 донатов за первый месяц', cta: 'Создать QR за 2 минуты' },
                { icon: <><rect width="18" height="14" x="3" y="5" rx="2" ry="2" /><path d="M3 13h18" /><path d="M12 13v8" /><path d="M8 21h8" /></>, bg: '#D9E2E8', title: 'Лектор', desc: 'Ведёт бесплатные курсы. Вставил QR на последний слайд презентации. Слушатели благодарят после вебинара.', stat: '+12 000 ₽ с одной лекции', cta: 'У вас похожая ситуация?' },
                { icon: <><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" /></>, bg: '#E8D9DF', title: 'Кондитер', desc: 'Печёт торты на заказ. Наклеила QR-стикер на витрину и коробки. Клиенты оставляют "чай" при самовывозе.', stat: '5 200 ₽ чаевых за неделю', cta: 'Попробовать бесплатно' },
              ].map((item, i) => (
                <div key={i} className="bg-cream rounded-3xl overflow-hidden shadow-sm border border-gray-light flex flex-col group reveal" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                  <div className="h-48 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" style={{ backgroundColor: item.bg }} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-dark/20 relative z-10">{item.icon}</svg>
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-lg shadow-md border border-gray-light p-1">
                      <div className="w-full h-full border-2 border-dark border-dashed rounded flex items-center justify-center"><div className="w-2 h-2 bg-emerald rounded-full" /></div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-dark text-sm mb-4">{item.desc}</p>
                    <div className="bg-white rounded-lg px-4 py-2 text-sm font-medium border border-gray-light inline-block w-fit mb-6 text-emerald">{item.stat}</div>
                    <button className="mt-auto text-left text-sm font-medium text-dark hover:text-emerald transition-colors inline-flex items-center gap-1 group-hover:gap-2 cursor-pointer">
                      {item.cta}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S7 — Open Finances */}
        <section className="py-24 bg-navy text-white" id="finances">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Открытая бухгалтерия</h2>
              <p className="text-white/60">Мы показываем то, что другие прячут в footer.</p>
            </div>
            <div className="reveal">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 font-mono text-sm md:text-base">
                <div className="text-white/40 mb-6">Каждый донат в {donation} ₽:</div>
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Автору</span>
                    <span className="text-2xl font-bold text-gold">{calc.author} ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Банку (процессинг карт)</span>
                    <span className="text-white/60">{calc.bank} ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Uppora</span>
                    <span className="text-white/60">{calc.uppora} ₽</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="font-bold text-white/70">ИТОГО</span>
                    <span className="font-bold text-white">{donation} ₽</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-white/40 mt-8 text-sm md:text-base max-w-2xl mx-auto">
                Мы зарабатываем {calc.uppora} ₽ с каждых {donation} ₽. Не берём подписку. Не берём комиссию. Это наш единственный доход.
              </p>
              <div className="text-center mt-10">
                <button className="bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors shadow-lg cursor-pointer">
                  Начать получать донаты с 0% комиссией
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* S8 — FAQ */}
        <section className="py-24 bg-cream" id="faq">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Частые вопросы</h2>
            </div>
            <div className="space-y-4 reveal">
              {[
                { q: 'На чём зарабатывает Uppora?', a: 'Мы зарабатываем разницу между банковским процессингом (4%) и нашей долей (~0.8%). С каждой тысячи рублей Uppora получает около 8 ₽. Этого достаточно для устойчивой работы без подписок и скрытых комиссий.' },
                { q: 'А если налоговая проверит?', a: 'Договор дарения — стандартная гражданско-правовая конструкция, используемая миллионами людей ежедневно. Согласно ст. 217 НК РФ, доходы в денежной форме от физических лиц в порядке дарения освобождены от НДФЛ.' },
                { q: 'Нужен ли статус ИП или самозанятого?', a: 'Нет. Поскольку донаты оформляются как дарение, специальный налоговый статус не требуется. Вы получаете деньги как физическое лицо.' },
                { q: 'Как вывести деньги?', a: 'Деньги поступают напрямую на вашу банковскую карту. Без ручных запросов на вывод, без модерации, без задержек. Обычно в тот же день.' },
                { q: 'А если никто не задонатит?', a: 'Uppora бесплатна навсегда. Нет донатов — нет расходов. Вы ничего не теряете. Удалить аккаунт можно в один клик.' },
                { q: 'Чем Uppora отличается от Boosty и DonationAlerts?', a: 'Boosty и DonationAlerts работают по модели «оплата услуг» — комиссия 10-15%, НДФЛ 13%, нужен статус ИП/самозанятого. Uppora работает по модели дарения — 4% на процессинг, 0% НДФЛ, статус не нужен.' },
                { q: 'Какие лимиты на суммы?', a: 'Минимальный донат — 100 ₽. Максимальный — зависит от лимитов вашего банка. Для сумм свыше 4 000 ₽ за один перевод может потребоваться подтверждение 3D Secure.' },
              ].map((item, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-light overflow-hidden shadow-sm">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6 hover:bg-gray-light/30 transition-colors text-base md:text-lg">
                    <span>{item.q}</span>
                    <span className="transition group-open:rotate-180 ml-4 shrink-0">
                      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-dark text-sm md:text-base leading-relaxed border-t border-gray-light/50 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* S9 — Final CTA */}
        <section className="py-24 bg-white" id="cta">
          <div className="max-w-4xl mx-auto px-6 text-center reveal">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Бесплатно. Без паспорта. Без подписки.
            </h2>
            <p className="text-gray-dark mb-10 max-w-2xl mx-auto">
              Удалить аккаунт можно в один клик. Нет донатов — нет расходов. Вы ничего не теряете.
            </p>
            <button className="bg-emerald text-white font-bold px-12 py-5 rounded-xl hover:bg-emerald-hover transition-colors shadow-xl shadow-emerald/20 text-xl cursor-pointer mb-8">
              Создать свой QR бесплатно
            </button>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-dark mt-8">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                Договор дарения — ст. 217 НК РФ
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                SSL шифрование
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald"><path d="M20 6 9 17l-5-5" /></svg>
                Т-Банк — технологический партнёр
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white/40 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="font-bold text-white text-lg mb-2">Uppora</div>
              <p>QR-донаты для авторов</p>
              <p className="mt-2">support@uppora.org</p>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-white/60 font-medium mb-2">Продукт</div>
                <ul className="space-y-1 list-none p-0 m-0">
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">Как работает</a></li>
                  <li><a href="#legal" className="hover:text-white transition-colors">Юридическая модель</a></li>
                  <li><a href="#finances" className="hover:text-white transition-colors">Тарифы</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <div className="text-white/60 font-medium mb-2">Документы</div>
                <ul className="space-y-1 list-none p-0 m-0">
                  <li><a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Оферта</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-white/30">
            © 2026 Uppora. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
