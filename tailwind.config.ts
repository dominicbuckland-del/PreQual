import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          mid: '#0D1F3C',
          light: '#152B50',
        },
        blue: {
          brand: '#1A3A6B',
          light: '#2456A4',
        },
        lime: {
          DEFAULT: '#C8F040',
          dark: '#A8D020',
          text: '#1A3300',
        },
        // Semantic status colours
        status: {
          hot: '#F59E0B',
          warm: '#10B981',
          nurture: '#60A5FA',
          filtered: '#94A3B8',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 60% 40%, #1A3A6B 0%, #0D1F3C 45%, #0A1628 100%)',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s ease forwards',
        'count-up': 'countUp 0.5s ease both',
        'pulse-slow': 'pulse 1.8s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.9)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
