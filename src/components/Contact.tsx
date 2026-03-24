import { useState } from 'react'
import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { PERSONAL } from '@/data/portfolio'
import { Mail, Github, Linkedin, MapPin, Clock, Send, ArrowUpRight, CheckCircle } from 'lucide-react'

const SUBJECTS = [
  'Job Opportunity',
  'Freelance / Contract',
  'AI/ML Collaboration',
  'Open Source / Research',
  'Just saying hello',
]

const LINKS = [
  { icon: Mail,     label: 'Email',         value: PERSONAL.email,         href: `mailto:${PERSONAL.email}`,    color: '#34d399' },
  { icon: Github,   label: 'GitHub',        value: 'jai-krishna-0921',     href: PERSONAL.github,               color: '#fbbf24' },
  { icon: Linkedin, label: 'LinkedIn',      value: 'Jai Krishna K',        href: PERSONAL.linkedin,             color: '#38bdf8' },
  { icon: MapPin,   label: 'Location',      value: PERSONAL.location,      href: null,                          color: '#10b981' },
  { icon: Clock,    label: 'Response Time', value: 'Within 24 hours',      href: null,                          color: '#f59e0b' },
]

export function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Hi Jai Krishna,%0A%0A${encodeURIComponent(form.message)}%0A%0ABest,%0A${form.firstName} ${form.lastName}`
    const subject = encodeURIComponent(`[Portfolio] ${form.subject || 'Hello'}`)
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 90%, rgba(52,211,153,0.07) 0%, transparent 60%)',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <BlurFade inView><span className="section-label mb-4 inline-block">Contact</span></BlurFade>
          <BlurFade inView delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
              Get in <span className="animate-gradient-text">touch</span>
            </h2>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <p className="text-white/40 text-sm max-w-sm mx-auto">
              Let's discuss your next project or just say hello.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT — connect info */}
          <BlurFade inView delay={0.2} className="lg:col-span-2">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Let's Connect</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  I'm always open to discussing new opportunities, interesting AI projects, or just having a chat about tech and development.
                </p>
              </div>
              <div className="space-y-2.5">
                {LINKS.map((item) => {
                  const Icon = item.icon
                  const inner = (
                    <div
                      key={item.label}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl group"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}18`, border: `1px solid ${item.color}25` }}>
                        <Icon size={15} style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-white/30 mb-0.5 font-medium">{item.label}</div>
                        <div className="text-sm font-medium text-white/70 truncate">{item.value}</div>
                      </div>
                      {item.href && <ArrowUpRight size={13} className="text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />}
                    </div>
                  )
                  return item.href ? (
                    <motion.a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      {inner}
                    </motion.a>
                  ) : (
                    <div key={item.label}>{inner}</div>
                  )
                })}
              </div>
            </div>
          </BlurFade>

          {/* RIGHT — form */}
          <BlurFade inView delay={0.25} className="lg:col-span-3">
            <div
              className="rounded-2xl p-7 md:p-8 relative overflow-hidden"
              style={{ background: '#0e0e0e', border: '1px solid rgba(52,211,153,0.12)' }}
            >
              <BorderBeam colorFrom="#34d399" colorTo="#fbbf24" duration={6} borderWidth={1} />

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center">
                  <CheckCircle size={44} className="text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Opening your email client…</h3>
                  <p className="text-white/40 text-sm">Your message is pre-filled and ready to send.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        First Name <span className="text-emerald-400">*</span>
                      </label>
                      <input required placeholder="Jai" value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        Last Name <span className="text-emerald-400">*</span>
                      </label>
                      <input required placeholder="Krishna" value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        className="form-input" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">
                      Email <span className="text-emerald-400">*</span>
                    </label>
                    <input required type="email" placeholder="you@example.com" value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="form-input" />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">
                      Subject <span className="text-emerald-400">*</span>
                    </label>
                    <select required value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="form-input"
                      style={{ color: form.subject ? '#f0f0f0' : 'rgba(240,240,240,0.25)' }}>
                      <option value="" disabled>Select a subject</option>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea required rows={4} value={form.message}
                      placeholder="Tell me about your project or how I can help…"
                      onChange={(e) => update('message', e.target.value)}
                      className="form-input resize-none" />
                  </div>

                  <motion.button type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-black flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 transition-colors duration-200 shadow-[0_0_25px_rgba(52,211,153,0.25)]"
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Send size={15} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </BlurFade>
        </div>

        {/* Footer */}
        <BlurFade inView delay={0.4}>
          <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
            <span className="flex items-center gap-1.5"><MapPin size={11} />{PERSONAL.location}</span>
<span>© 2025 Jai Krishna K</span>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
