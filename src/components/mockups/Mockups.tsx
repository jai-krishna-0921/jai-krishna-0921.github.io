/**
 * Product mockups drawn as vectors — one per project, each depicting
 * what that system actually shows its user. Sharp at any size, no
 * network cost, and accurate in a way stock imagery never is.
 */

const INK = '#0d0e12'
const EDGE = '#16171d'
const AGENT = '#e879f9'
const VERIFIED = '#4ade80'
const COMMAND = '#38bdf8'
const PENDING = '#fbbf24'
const DIM = '#6b7280'

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 640 400" className="w-full h-full" role="img" aria-label={label}>
      <rect width="640" height="400" rx="14" fill={INK} />
      <path d="M0 14a14 14 0 0 1 14-14h612a14 14 0 0 1 14 14v26H0Z" fill={EDGE} />
      <circle cx="22" cy="20" r="4.5" fill="#ff5f56" />
      <circle cx="38" cy="20" r="4.5" fill="#ffbd2e" />
      <circle cx="54" cy="20" r="4.5" fill="#27c93f" />
      <rect x="76" y="12" width="200" height="16" rx="8" fill="#ffffff" fillOpacity="0.05" />
      <text x="86" y="24" fontSize="9" fill={DIM} fontFamily="JetBrains Mono, monospace">{label}</text>
      {children}
    </svg>
  )
}

/** Corvax — the outbound pipeline dashboard: crawl → validate → draft → send → track */
export function CorvaxMockup() {
  const stages = [
    { n: 'crawl', x: 30, done: true },
    { n: 'validate', x: 148, done: true },
    { n: 'draft', x: 266, done: true },
    { n: 'send', x: 384, done: false },
    { n: 'track', x: 502, done: false },
  ]
  return (
    <Frame label="corvax · pipeline">
      <text x="30" y="72" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">PIPELINE</text>
      {stages.map((s, i) => (
        <g key={s.n}>
          {i < stages.length - 1 && (
            <line x1={s.x + 88} y1="106" x2={s.x + 118} y2="106" stroke={s.done ? VERIFIED : EDGE} strokeWidth="1.5" strokeOpacity={s.done ? 0.5 : 1} />
          )}
          <rect x={s.x} y="86" width="88" height="40" rx="10" fill={EDGE}
            stroke={s.done ? VERIFIED : AGENT} strokeOpacity={s.done ? 0.35 : 0.5} strokeWidth="1" />
          <circle cx={s.x + 14} cy="106" r="3" fill={s.done ? VERIFIED : AGENT} />
          <text x={s.x + 24} y="110" fontSize="10" fill="#e9e9ec" fontFamily="JetBrains Mono, monospace">{s.n}</text>
        </g>
      ))}
      {/* queue depth bars */}
      <text x="30" y="168" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">QUEUE DEPTH</text>
      {[42, 78, 30, 96, 56, 84, 22, 68, 48, 90, 36, 74].map((h, i) => (
        <rect key={i} x={30 + i * 30} y={264 - h} width="18" height={h} rx="3"
          fill={AGENT} fillOpacity={0.2 + (i % 4) * 0.14} />
      ))}
      <line x1="30" y1="264" x2="580" y2="264" stroke={EDGE} strokeWidth="1" />
      {/* metric row */}
      {[
        { k: 'sent', v: '1,284', c: VERIFIED },
        { k: 'opened', v: '61%', c: COMMAND },
        { k: 'replied', v: '12%', c: AGENT },
      ].map((m, i) => (
        <g key={m.k}>
          <rect x={30 + i * 186} y="296" width="170" height="66" rx="12" fill={EDGE} />
          <text x={44 + i * 186} y="322" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">{m.k}</text>
          <text x={44 + i * 186} y="348" fontSize="22" fill={m.c} fontFamily="Satoshi, sans-serif" fontWeight="500">{m.v}</text>
        </g>
      ))}
    </Frame>
  )
}

/** ServiceWorker — the booking console: a job row, its state machine, a verified slot */
export function ServiceWorkerMockup() {
  return (
    <Frame label="serviceworker · console">
      {/* incoming call banner */}
      <rect x="30" y="62" width="580" height="52" rx="12" fill={EDGE} stroke={AGENT} strokeOpacity="0.3" />
      <circle cx="52" cy="88" r="7" fill={AGENT} fillOpacity="0.25" />
      <circle cx="52" cy="88" r="3.5" fill={AGENT} />
      <text x="70" y="84" fontSize="11" fill="#e9e9ec" fontFamily="Satoshi, sans-serif">Inbound call · +1 (415) 555-0148</text>
      <text x="70" y="100" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">triage → intent: booking · urgency: normal</text>
      <rect x="516" y="76" width="76" height="24" rx="12" fill={VERIFIED} fillOpacity="0.12" />
      <text x="530" y="92" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">ANSWERED</text>

      {/* state machine */}
      <text x="30" y="146" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">JOB STATE</text>
      {['received', 'triaged', 'quoted', 'booked'].map((s, i) => (
        <g key={s}>
          {i < 3 && <line x1={30 + i * 146 + 118} y1="172" x2={30 + i * 146 + 146} y2="172" stroke={VERIFIED} strokeOpacity="0.4" strokeWidth="1.5" />}
          <rect x={30 + i * 146} y="158" width="118" height="28" rx="8" fill={EDGE} stroke={i === 3 ? VERIFIED : 'none'} strokeOpacity="0.45" />
          <text x={30 + i * 146 + 12} y="176" fontSize="10" fill={i === 3 ? VERIFIED : DIM} fontFamily="JetBrains Mono, monospace">{s}</text>
        </g>
      ))}

      {/* slot card — read back and verified */}
      <rect x="30" y="208" width="290" height="154" rx="14" fill={EDGE} />
      <text x="48" y="234" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">CONFIRMED SLOT</text>
      <text x="48" y="264" fontSize="20" fill="#e9e9ec" fontFamily="Satoshi, sans-serif" fontWeight="500">Thu · 2:30 PM</text>
      <text x="48" y="288" fontSize="12" fill={DIM} fontFamily="Satoshi, sans-serif">Brake inspection · 60 min</text>
      <rect x="48" y="306" width="140" height="26" rx="13" fill={VERIFIED} fillOpacity="0.12" />
      <circle cx="62" cy="319" r="3" fill={VERIFIED} />
      <text x="72" y="323" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">read back · ok</text>

      {/* impact */}
      <rect x="336" y="208" width="274" height="154" rx="14" fill={EDGE} />
      <text x="354" y="234" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">IMPACT THIS WEEK</text>
      <text x="354" y="272" fontSize="30" fill={AGENT} fontFamily="Satoshi, sans-serif" fontWeight="500">14.5 hrs</text>
      <text x="354" y="292" fontSize="11" fill={DIM} fontFamily="Satoshi, sans-serif">recovered from missed calls</text>
      {[0.9, 0.72, 0.85, 0.6, 0.95, 0.7, 0.8].map((v, i) => (
        <rect key={i} x={354 + i * 34} y={344 - v * 32} width="22" height={v * 32} rx="3" fill={AGENT} fillOpacity="0.3" />
      ))}
    </Frame>
  )
}

/** Synapse-Dx — the knowledge graph fused with vector hits */
export function SynapseMockup() {
  const nodes = [
    { x: 320, y: 190, r: 13, c: AGENT, l: '' },
    { x: 200, y: 120, r: 8, c: COMMAND, l: 'symptom' },
    { x: 452, y: 132, r: 8, c: COMMAND, l: 'finding' },
    { x: 176, y: 262, r: 8, c: VERIFIED, l: 'protocol' },
    { x: 448, y: 268, r: 8, c: VERIFIED, l: 'drug' },
    { x: 320, y: 318, r: 7, c: DIM, l: '' },
    { x: 118, y: 190, r: 6, c: DIM, l: '' },
    { x: 520, y: 200, r: 6, c: DIM, l: '' },
  ]
  return (
    <Frame label="synapse-dx · graph">
      <text x="30" y="70" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">HYBRID RETRIEVAL · 412ms</text>
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1="320" y1="190" x2={n.x} y2={n.y} stroke={n.c} strokeOpacity="0.22" strokeWidth="1" />
      ))}
      <line x1="200" y1="120" x2="176" y2="262" stroke={COMMAND} strokeOpacity="0.12" strokeWidth="1" />
      <line x1="452" y1="132" x2="448" y2="268" stroke={COMMAND} strokeOpacity="0.12" strokeWidth="1" />
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 7} fill={n.c} fillOpacity="0.07" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity={i === 0 ? 1 : 0.75} />
          {n.l && <text x={n.x} y={n.y - n.r - 11} fontSize="9" fill={DIM} textAnchor="middle" fontFamily="JetBrains Mono, monospace">{n.l}</text>}
        </g>
      ))}
      <rect x="30" y="344" width="180" height="26" rx="13" fill={EDGE} />
      <circle cx="46" cy="357" r="3" fill={VERIFIED} />
      <text x="56" y="361" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">grounded · 6 sources</text>
    </Frame>
  )
}

/** Nofrin — the critic scoring five dimensions, revision loop */
export function NofrinMockup() {
  const dims = [
    { k: 'factuality', w: 0.3, s: 4.6 },
    { k: 'citation', w: 0.25, s: 4.2 },
    { k: 'reasoning', w: 0.2, s: 3.8 },
    { k: 'completeness', w: 0.15, s: 4.4 },
    { k: 'bias', w: 0.1, s: 4.9 },
  ]
  return (
    <Frame label="nofrin · critic">
      <text x="30" y="70" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">ADVERSARIAL CRITIC · REVISION 1/2</text>
      {dims.map((d, i) => (
        <g key={d.k}>
          <text x="30" y={104 + i * 42} fontSize="11" fill="#e9e9ec" fontFamily="Satoshi, sans-serif">{d.k}</text>
          <text x="30" y={120 + i * 42} fontSize="9" fill={DIM} fontFamily="JetBrains Mono, monospace">w {d.w}</text>
          <rect x="150" y={92 + i * 42} width="380" height="8" rx="4" fill={EDGE} />
          <rect x="150" y={92 + i * 42} width={380 * (d.s / 5)} height="8" rx="4"
            fill={d.s >= 4.2 ? VERIFIED : PENDING} fillOpacity="0.75" />
          <text x="548" y={101 + i * 42} fontSize="11" fill={d.s >= 4.2 ? VERIFIED : PENDING} fontFamily="JetBrains Mono, monospace">{d.s}</text>
        </g>
      ))}
      <line x1="30" y1="322" x2="610" y2="322" stroke={EDGE} strokeWidth="1" />
      <text x="30" y="348" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">WEIGHTED</text>
      <text x="120" y="350" fontSize="18" fill={VERIFIED} fontFamily="Satoshi, sans-serif" fontWeight="500">4.35</text>
      <rect x="180" y="332" width="128" height="24" rx="12" fill={VERIFIED} fillOpacity="0.12" />
      <text x="192" y="348" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">above threshold</text>
    </Frame>
  )
}

/** FMODetect — input frame, trajectory overlay, extracted TDF */
export function FMOMockup() {
  return (
    <Frame label="fmodetect-v2 · inference">
      <text x="30" y="70" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">INPUT</text>
      <rect x="30" y="80" width="176" height="132" rx="10" fill={EDGE} />
      <circle cx="118" cy="146" r="26" fill="#ffffff" fillOpacity="0.05" />
      <ellipse cx="118" cy="146" rx="7" ry="22" fill="#ffffff" fillOpacity="0.18" transform="rotate(28 118 146)" />

      <text x="232" y="70" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">TRAJECTORY</text>
      <rect x="232" y="80" width="176" height="132" rx="10" fill={EDGE} />
      <path d="M258 190 Q322 96 384 108" stroke={AGENT} strokeWidth="2" fill="none" strokeOpacity="0.85" />
      <circle cx="258" cy="190" r="4" fill={AGENT} />
      <circle cx="384" cy="108" r="4" fill={AGENT} />

      <text x="434" y="70" fontSize="11" fill={DIM} fontFamily="JetBrains Mono, monospace">TDF</text>
      <rect x="434" y="80" width="176" height="132" rx="10" fill={EDGE} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${452 + i * 8} 188 Q510 ${104 + i * 6} ${592 - i * 8} ${114 + i * 4}`}
          stroke={COMMAND}
          strokeWidth="1"
          fill="none"
          strokeOpacity={0.55 - i * 0.09}
        />
      ))}

      {[
        { k: 'speed', v: '38.4 m/s' },
        { k: 'radius', v: '5.2 px' },
        { k: 'latency', v: '2.4 s' },
      ].map((m, i) => (
        <g key={m.k}>
          <rect x={30 + i * 194} y="248" width="176" height="60" rx="12" fill={EDGE} />
          <text x={46 + i * 194} y="272" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">{m.k}</text>
          <text x={46 + i * 194} y="296" fontSize="18" fill="#e9e9ec" fontFamily="Satoshi, sans-serif" fontWeight="500">{m.v}</text>
        </g>
      ))}
      <rect x="30" y="330" width="204" height="26" rx="13" fill={EDGE} />
      <circle cx="46" cy="343" r="3" fill={VERIFIED} />
      <text x="56" y="347" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">live on HF Spaces</text>
    </Frame>
  )
}

/** Coven — the terminal session, redrawn from the repo's own demo.svg */
export function CovenMockup() {
  const rows = [
    { ind: 0, agent: 'researcher', task: 'scout existing utils' },
    { ind: 1, mark: '✓', cmd: 'grep', detail: '/debounce|throttle/ · no matches' },
    { ind: 0, agent: 'builder', task: 'implement debounce, test-first' },
    { ind: 1, mark: '✓', cmd: 'write', detail: 'src/util/debounce.ts (18 lines)' },
    { ind: 1, mark: '✓', cmd: 'bash', detail: 'bun test · 6 pass  480ms' },
    { ind: 0, agent: 'reviewer', task: 'spec compliance + quality' },
  ]
  return (
    <Frame label="coven · session">
      <text x="30" y="66" fontSize="12" fill={AGENT} fontFamily="JetBrains Mono, monospace" fontWeight="600">✦ coven</text>
      <text x="96" y="66" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">a coven of coding agents in your terminal</text>
      <text x="30" y="90" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">agent: </text>
      <text x="76" y="90" fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">conductor</text>
      <text x="150" y="90" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">skills: 10</text>

      <text x="30" y="122" fontSize="10" fill={AGENT} fontFamily="JetBrains Mono, monospace">coven</text>
      <text x="76" y="122" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">❯</text>
      <text x="92" y="122" fontSize="10" fill="#e9e9ec" fontFamily="JetBrains Mono, monospace">add a debounce util with tests, then review it</text>

      {rows.map((r, i) => {
        const y = 152 + i * 26
        if (r.agent) return (
          <g key={i}>
            <text x="30" y={y} fontSize="10" fill={AGENT} fontFamily="JetBrains Mono, monospace">◈ {r.agent}</text>
            <text x={30 + 22 + r.agent.length * 6} y={y} fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">⟩ {r.task}</text>
          </g>
        )
        return (
          <g key={i}>
            <text x="46" y={y} fontSize="10" fill={VERIFIED} fontFamily="JetBrains Mono, monospace">{r.mark}</text>
            <text x="60" y={y} fontSize="10" fill="#e9e9ec" fontFamily="JetBrains Mono, monospace">{r.cmd}</text>
            <text x={60 + (r.cmd?.length || 0) * 6 + 8} y={y} fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">{r.detail}</text>
          </g>
        )
      })}

      <text x="46" y="318" fontSize="10" fill={PENDING} fontFamily="JetBrains Mono, monospace">⚠</text>
      <text x="60" y="318" fontSize="10" fill="#e9e9ec" fontFamily="JetBrains Mono, monospace">permission</text>
      <text x="132" y="318" fontSize="10" fill={COMMAND} fontFamily="JetBrains Mono, monospace">bash</text>
      <text x="166" y="318" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">→ git diff</text>
      <text x="240" y="318" fontSize="10" fill={DIM} fontFamily="JetBrains Mono, monospace">[y]es [a]lways [n]o</text>

      <text x="30" y="356" fontSize="9" fill={DIM} fontFamily="JetBrains Mono, monospace">─ 12.4k↑ 380↓ · ctx 7% · 2¢ · 5.1s ─</text>
    </Frame>
  )
}

export const MOCKUPS: Record<string, () => JSX.Element> = {
  corvax: CorvaxMockup,
  serviceworker: ServiceWorkerMockup,
  coven: CovenMockup,
  synapse: SynapseMockup,
  fmodetect: FMOMockup,
  nofrin: NofrinMockup,
}
