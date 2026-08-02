import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { PERSONAL } from '@/data/portfolio'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Trace', href: '#trace' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-[80] transition-colors duration-300',
          scrolled && 'bg-ink/80 backdrop-blur-xl border-b border-[color:var(--hairline)]',
        )}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mono text-[13px] tracking-tight flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-agent group-hover:scale-125 transition-transform" />
            <span className="text-[color:var(--text)]">jai</span>
            <span className="text-[color:var(--text-3)]">krishna</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="px-3.5 py-2 text-[13px] text-[color:var(--text-2)] hover:text-[color:var(--text)] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="ml-3 rounded-full px-4 py-2 text-[13px] font-medium bg-[color:var(--text)] text-ink hover:scale-[1.03] transition-transform"
            >
              Hire me
            </a>
          </nav>

          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <motion.span className="block w-5 h-px bg-[color:var(--text)]" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-px bg-[color:var(--text)]" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-px bg-[color:var(--text)]" animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[75] bg-ink/97 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                onClick={() => go(l.href)}
                className="headline text-4xl py-3 text-[color:var(--text-2)] hover:text-[color:var(--text)] transition-colors"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
