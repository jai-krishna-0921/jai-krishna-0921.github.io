import { motion, useScroll, useSpring } from 'motion/react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { LogoTicker } from '@/components/LogoTicker'
import { Work } from '@/components/Work'
import { Impact } from '@/components/Impact'
import { Trace } from '@/components/Trace'
import { Capabilities } from '@/components/Capabilities'
import { Contact } from '@/components/Contact'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 34 })
  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-px z-[100] origin-left bg-agent"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-[color:var(--text)]">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Work />
        <Impact />
        <Trace />
        <Capabilities />
        <Contact />
      </main>
    </div>
  )
}
