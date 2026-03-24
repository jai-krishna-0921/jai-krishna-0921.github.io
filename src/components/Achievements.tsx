import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ACHIEVEMENTS, STATS } from '@/data/portfolio'

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6 md:px-12 lg:px-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <BlurFade inView>
            <span className="section-label mb-4 inline-block">Achievements</span>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Impact{' '}
              <span className="animate-gradient-text">by the numbers</span>
            </h2>
          </BlurFade>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {STATS.map((stat, i) => (
            <BlurFade key={stat.label} inView delay={i * 0.08}>
              <motion.div
                className="glass-card rounded-2xl p-6 text-center"
                whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.35)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-black text-white mb-1">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={i * 0.15}
                    className="text-4xl font-black text-white"
                  />
                </div>
                <div className="text-sm font-semibold text-white/60 mb-1">{stat.label}</div>
                <div className="text-xs text-white/30">{stat.description}</div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, i) => (
            <BlurFade key={achievement.id} inView delay={0.2 + i * 0.1}>
              <motion.div
                className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                style={{ borderColor: `${achievement.color}20` }}
                whileHover={{ y: -4, borderColor: `${achievement.color}40` }}
                transition={{ duration: 0.25 }}
              >
                {/* Glow orb */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{ background: `${achievement.color}30` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${achievement.color}15`, border: `1px solid ${achievement.color}25` }}
                >
                  {achievement.icon}
                </div>

                <h3 className="font-bold text-white text-base mb-2">{achievement.title}</h3>
                <p
                  className="text-xs font-semibold mb-3 font-mono"
                  style={{ color: `${achievement.color}99` }}
                >
                  {achievement.org}
                </p>
                <p className="text-sm text-white/45 leading-relaxed">{achievement.description}</p>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* "Also" bar */}
        <BlurFade inView delay={0.5}>
          <div className="mt-10 glass-card rounded-2xl p-5 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                JK
              </div>
              <span className="text-white/60 text-sm">
                Open to AI Engineering · Full-Stack · ML roles
              </span>
            </div>
            <a
              href="mailto:jaikrishna0921@gmail.com"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Let's talk →
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
