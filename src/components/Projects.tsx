import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { PROJECTS } from '@/data/portfolio'
import { ArrowUpRight, X } from 'lucide-react'

const TECH_ICONS: Record<string, string> = {
  'LangChain': '🦜',
  'Redis Pub/Sub': '⚡',
  'Mastra': '🔗',
  'Python': '🐍',
  'Docker': '🐋',
  'Gemini Live APIs': '✨',
  'REST': '🔌',
  'WebSockets': '🌐',
  'RAG': '📚',
  'Embeddings': '🧮',
  'PostgreSQL': '🗄️',
  'OpenCV': '👁️',
  'TensorFlow': '🧠',
  'PyTorch': '🔥',
  'CNN': '🧬',
  'MLflow': '📊',
  'DVC': '🗂️',
  'Scikit-learn': '🔬',
  'Pandas': '🐼',
  'Image Processing': '🖼️',
  'NLP': '💬',
  'LLMs': '🤖',
}

export function Projects() {
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null)

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#050810]">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(139,92,246,0.07) 0%, transparent 60%)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <BlurFade inView>
            <span className="section-label mb-4 inline-block">Projects</span>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight font-display">
              Things I've{' '}
              <span className="animate-gradient-text">engineered</span>
            </h2>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <p className="text-white/40 mt-3 text-base max-w-lg">
              From production AI platforms to research prototypes - shipped with intent.
            </p>
          </BlurFade>
        </div>

        {/* Featured row: large + medium */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          <BlurFade inView delay={0} className="lg:col-span-3">
            <ProjectCard project={PROJECTS[0]} large onClick={() => setSelected(PROJECTS[0])} />
          </BlurFade>
          <BlurFade inView delay={0.1} className="lg:col-span-2">
            <ProjectCard project={PROJECTS[1]} onClick={() => setSelected(PROJECTS[1])} />
          </BlurFade>
        </div>

        {/* Second row: 3 equal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.slice(2).map((project, i) => (
            <BlurFade key={project.id} inView delay={0.15 + i * 0.08}>
              <ProjectCard project={project} onClick={() => setSelected(project)} />
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  large = false,
  onClick,
}: {
  project: (typeof PROJECTS)[0]
  large?: boolean
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="group rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.06)',
        minHeight: large ? 480 : 380,
      }}
      whileHover={{ borderColor: `${project.color}40`, y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: large ? 220 : 180 }}>
        {/* Browser chrome */}
        <div
          className="absolute top-0 left-0 right-0 h-8 z-20 flex items-center px-3 gap-1.5"
          style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(8px)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 h-4 rounded-md bg-white/5 flex items-center px-2">
            <span className="text-[9px] text-white/25 font-mono truncate">
              {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
            </span>
          </div>
        </div>

        {!imgError ? (
          <img
            src={(project as any).image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            style={{ marginTop: 32 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ marginTop: 32, background: `linear-gradient(135deg, ${project.color}20 0%, #0d1117 100%)` }}
          >
            <span className="text-6xl opacity-30">{project.icon}</span>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 60%, #0d1117 100%)', zIndex: 10 }}
        />
        <div
          className="absolute bottom-3 right-3 z-20 text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}
        >
          {project.year}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{project.icon}</span>
            <h3 className={`font-bold text-white leading-snug font-display ${large ? 'text-lg' : 'text-base'}`}>
              {project.title}
            </h3>
          </div>
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 text-white/30 group-hover:text-white/70 transition-all"
          >
            <ArrowUpRight size={14} />
          </div>
        </div>

        <p className="text-white/45 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, large ? 5 : 4).map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${project.color}10`,
                color: `${project.color}bb`,
                border: `1px solid ${project.color}20`,
              }}
            >
              {TECH_ICONS[t] && <span className="text-[10px]">{TECH_ICONS[t]}</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0]
  onClose: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden pointer-events-auto"
          style={{
            background: '#0e0e0e',
            border: `1px solid ${project.color}30`,
            boxShadow: `0 0 80px ${project.color}18, 0 40px 80px rgba(0,0,0,0.6)`,
          }}
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            {/* Browser chrome */}
            <div
              className="absolute top-0 left-0 right-0 h-8 z-20 flex items-center px-3 gap-1.5"
              style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 h-4 rounded-md bg-white/5 flex items-center px-2">
                <span className="text-[9px] text-white/30 font-mono">
                  {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
                </span>
              </div>
            </div>

            {!imgError ? (
              <img
                src={(project as any).image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                style={{ marginTop: 32 }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ marginTop: 32, background: `linear-gradient(135deg, ${project.color}25 0%, #0e0e0e 100%)` }}
              >
                <span className="text-8xl opacity-20">{project.icon}</span>
              </div>
            )}

            {/* Gradient fade to body */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 50%, #0e0e0e 100%)', zIndex: 10 }}
            />

            {/* Year + close button */}
            <div className="absolute top-10 right-4 z-30 flex items-center gap-2">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.8)', color: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(4px)' }}
              >
                {project.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
                >
                  {project.icon}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                    {project.title}
                  </h2>
                  <span
                    className="text-xs font-semibold mt-0.5 inline-block"
                    style={{ color: project.color }}
                  >
                    {project.featured ? 'Featured Project' : 'Project'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Full description */}
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mb-5" />

            {/* All tech tags */}
            <div className="mb-6">
              <p className="text-xs text-white/25 font-semibold uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full"
                    style={{
                      background: `${project.color}12`,
                      color: `${project.color}cc`,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {TECH_ICONS[t] && <span>{TECH_ICONS[t]}</span>}
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
              whileHover={{ scale: 1.03, background: `${project.color}28` }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowUpRight size={15} />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
