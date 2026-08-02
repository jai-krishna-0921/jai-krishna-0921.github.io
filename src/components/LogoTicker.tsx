import { TECH_TICKER } from '@/data/portfolio'

export function LogoTicker() {
  const track = [...TECH_TICKER, ...TECH_TICKER]
  return (
    <section className="relative py-7 border-y border-[color:var(--hairline)] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #08080a, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #08080a, transparent)' }} />
      <div className="flex w-max marquee-track" style={{ animationDuration: '38s' }}>
        {track.map((t, i) => (
          <span key={`${t}-${i}`} className="mono text-[12px] text-[color:var(--text-3)] px-7 whitespace-nowrap flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-agent/40" />
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
