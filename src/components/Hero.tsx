import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { Particles } from '@/components/ui/particles'
import { PERSONAL } from '@/data/portfolio'
import { Github, Linkedin, Mail, ChevronDown, ArrowRight, Download } from 'lucide-react'

const ROLES = [
  'multi-agent AI systems',
  'intelligent LLM pipelines',
  'production ML models',
  'full-stack AI products',
  'agentic automation workflows',
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const { scrollY } = useScroll()
  // Parallax: background moves at 50% speed, text at ~30%
  const bgY = useTransform(scrollY, [0, 600], [0, 300])
  const textY = useTransform(scrollY, [0, 600], [0, 180])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // GSAP stagger entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 })
        .from('.hero-name span', { y: 60, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.3')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-ctas', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-socials', { y: 15, opacity: 0, duration: 0.4 }, '-=0.3')
        .from('.hero-scroll', { y: 10, opacity: 0, duration: 0.4 }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, isDeleting ? 45 : 80)
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  const words = PERSONAL.name.split(' ')

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        ref={bgRef}
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Deep radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Particles */}
      <Particles
        className="absolute inset-0"
        quantity={120}
        color="#34d399"
        staticity={30}
        ease={60}
        size={0.6}
      />
      {/* Second particle layer (cyan) */}
      <Particles
        className="absolute inset-0"
        quantity={50}
        color="#fbbf24"
        staticity={80}
        ease={40}
        size={0.4}
        vx={0.03}
        vy={-0.03}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-8">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 className="hero-name text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 overflow-hidden font-display">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-4">
              <span className="inline-block animate-gradient-text">{word}</span>
            </span>
          ))}
        </h1>

        {/* Typewriter role */}
        <div className="hero-sub flex items-center justify-center gap-3 mb-4">
          <span className="text-xl sm:text-2xl text-white/40 font-light">I build</span>
          <span className="text-xl sm:text-2xl font-semibold text-white min-w-[260px] text-left">
            {displayed}
            <span className="inline-block w-0.5 h-6 bg-[#34d399] ml-0.5 animate-pulse" />
          </span>
        </div>

        {/* Subtitle */}
        <p className="hero-sub text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {PERSONAL.subtitle} - from multi-agent LLM pipelines to production cloud deployments.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-wrap items-center justify-center gap-4 mb-10">
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_40px_rgba(52,211,153,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href={`mailto:${PERSONAL.email}`}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={16} />
            Get in Touch
          </motion.a>
        </div>

        {/* Social links */}
        <div className="hero-socials flex items-center justify-center gap-4">
          {[
            { icon: Github, label: 'GitHub', href: PERSONAL.github },
            { icon: Linkedin, label: 'LinkedIn', href: PERSONAL.linkedin },
            { icon: Mail, label: 'Email', href: `mailto:${PERSONAL.email}` },
          ].map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={label}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs text-white/25 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/25" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  )
}
