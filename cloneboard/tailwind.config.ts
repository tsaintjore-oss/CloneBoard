import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: 'rgba(22, 25, 34, 0.4)',
          'bg-strong': 'rgba(28, 31, 46, 0.5)',
          'bg-elevated': 'rgba(28, 31, 46, 0.6)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.12)',
        },
        premium: {
          bg: '#0f1117',
          surface: '#161922',
          elevated: '#1c1f2e',
          text: 'rgba(255, 255, 255, 0.95)',
          'text-secondary': 'rgba(255, 255, 255, 0.70)',
          'text-muted': 'rgba(255, 255, 255, 0.50)',
          accent: '#d4af6f',
          'accent-soft': 'rgba(212, 175, 111, 0.15)',
          'accent-glow': 'rgba(212, 175, 111, 0.25)',
        },
      },
      borderRadius: {
        'glass': '2rem',
        'glass-lg': '2.5rem',
        'glass-xl': '3rem',
      },
      backdropBlur: {
        'glass': '20px',
        'glass-strong': '24px',
        'glass-elevated': '28px',
      },
      spacing: {
        'section': '8rem',
        'element': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-medium': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'glass-large': '0 24px 64px rgba(0, 0, 0, 0.6)',
        'accent': '0 8px 24px rgba(212, 175, 111, 0.25)',
        'accent-hover': '0 12px 32px rgba(212, 175, 111, 0.35)',
      },
    },
  },
  plugins: [],
}

export default config

