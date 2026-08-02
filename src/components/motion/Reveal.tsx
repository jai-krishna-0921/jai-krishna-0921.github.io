import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Slide in from a side as the element enters the viewport. One-shot. */
export function SlideIn({
  children, from = 'left', delay = 0, distance = 64, className,
}: {
  children: ReactNode
  from?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  distance?: number
  className?: string
}) {
  const offset =
    from === 'left' ? { x: -distance, y: 0 } :
    from === 'right' ? { x: distance, y: 0 } :
    from === 'down' ? { x: 0, y: -distance } : { x: 0, y: distance }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Stagger a list of children in from one side. */
export function StaggerIn({
  children, from = 'left', stagger = 0.09, className,
}: {
  children: ReactNode
  from?: 'left' | 'right' | 'up'
  stagger?: number
  className?: string
}) {
  const offset = from === 'left' ? { x: -48 } : from === 'right' ? { x: 48 } : { y: 44 }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {Array.isArray(children)
        ? children.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, ...offset, filter: 'blur(5px)' },
                show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {c}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

/** Scroll-scrubbed blur-to-focus — the reference's blur(4.9px) → blur(0). */
export function BlurFocus({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.4'] })
  const blur = useTransform(scrollYProgress, [0, 1], [7, 0])
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(2)}px)`)
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1])
  return (
    <motion.div ref={ref} style={{ filter, opacity, scale }} className={className}>
      {children}
    </motion.div>
  )
}

/** Parallax drift on scroll. */
export function Parallax({
  children, amount = 60, className,
}: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 })
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>
}

/** Word-by-word scrubbed text reveal. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1.6) / words.length]} />
      ))}
    </p>
  )
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return <motion.span style={{ opacity }} className="inline-block mr-[0.26em]">{word}</motion.span>
}
