/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        paper: {
          DEFAULT: '#FAFAF8',
          dark: '#F3F3EE',
          grid: '#E8E8E0',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          2: '#3D3D3D',
          3: '#6B6B6B',
          4: '#9B9B9B',
          5: '#C8C8C8',
        },
        accent: {
          DEFAULT: '#1B4FD8',
          light: '#3B6FFF',
          bg: '#EEF2FF',
        },
        rule: '#D4D4CC',
        margin: '#F0B8B8',
      },
      backgroundImage: {
        'graph-paper': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='small' width='8' height='8' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 8 0 L 0 0 0 8' fill='none' stroke='%23E2E2D8' stroke-width='0.5'/%3E%3C/pattern%3E%3Cpattern id='large' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Crect width='40' height='40' fill='url(%23small)'/%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23D4D4CA' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='40' height='40' fill='url(%23large)'/%3E%3C/svg%3E")`,
        'margin-line': 'linear-gradient(to right, transparent 60px, #F0B8B8 60px, #F0B8B8 61px, transparent 61px)',
      },
      animation: {
        'pulse-dot': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
