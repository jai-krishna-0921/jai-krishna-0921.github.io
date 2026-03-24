import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Achievements } from '@/components/Achievements'
import { Contact } from '@/components/Contact'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #6366f1, #22d3ee, #8b5cf6)',
      }}
    />
  )
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="cursor-glow"
      style={{ left: pos.x, top: pos.y }}
    />
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#030303] text-white noise-bg">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}
