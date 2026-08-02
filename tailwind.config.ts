import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08080a',
        'ink-raised': '#0d0e12',
        'ink-edge': '#16171d',
        agent: '#e879f9',
        'agent-dim': '#a855c7',
        verified: '#4ade80',
        command: '#38bdf8',
        pending: '#fbbf24',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        shine: 'shine 5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3.5s ease-in-out infinite',
        marquee: 'marquee-scroll 34s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
