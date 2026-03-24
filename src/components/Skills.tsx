import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { SKILLS } from '@/data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 lg:px-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 50% 60% at 10% 60%, rgba(34,211,238,0.05) 0%, transparent 60%)',
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <BlurFade inView>
            <span className="section-label mb-4 inline-block">Skills</span>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              My{' '}
              <span className="animate-gradient-text">technical arsenal</span>
            </h2>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <p className="text-white/40 mt-3 text-base max-w-lg">
              A full-stack toolkit spanning AI/ML, cloud infrastructure, and systems engineering.
            </p>
          </BlurFade>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((category, ci) => (
            <BlurFade key={category.category} inView delay={ci * 0.07}>
              <motion.div
                className="glass-card rounded-2xl p-6 h-full"
                style={{ borderColor: `${category.color}20` }}
                whileHover={{ borderColor: `${category.color}40`, y: -3 }}
                transition={{ duration: 0.25 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}25` }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white/80">{category.category}</h3>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="skill-tag"
                      style={{
                        borderColor: `${category.color}20`,
                        background: `${category.color}08`,
                        color: `${category.color}bb`,
                        animationDelay: `${si * 30}ms`,
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.07 + si * 0.04, duration: 0.3 }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: `${category.color}50`,
                        background: `${category.color}15`,
                        color: `${category.color}ee`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* Education callout */}
        <BlurFade inView delay={0.4}>
          <motion.div
            className="mt-10 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            whileHover={{ borderColor: 'rgba(99,102,241,0.3)' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
              🎓
            </div>
            <div>
              <div className="text-sm text-white/40 font-mono mb-1">Education · 2021–2025</div>
              <div className="font-bold text-white text-base">
                Indian Institute of Information Technology — Design and Manufacturing, Kancheepuram
              </div>
              <div className="text-white/50 text-sm mt-0.5">
                B.Tech in Computer Science Engineering ·{' '}
                <span className="text-indigo-400 font-semibold">CGPA 8.22 / 10</span>
              </div>
            </div>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  )
}
