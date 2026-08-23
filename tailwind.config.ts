import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:         '#080808',
        surface:    '#0f0f0f',
        border:     '#1e1e1e',
        'border-hi':'#2e2e2e',
        text:       '#e8e2d9',
        muted:      '#5a5650',
        accent:     '#c8f04a',
        'accent-dim':'#7a9420',
        amber:      '#f0a020',
      },
      fontFamily: {
        mono:  ['Space Mono', 'monospace'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-float': 'fadeFloat 2s ease-in-out infinite',
      },
      keyframes: {
        fadeFloat: {
          '0%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
          '50%':      { opacity: '0.8', transform: 'translateY(4px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config