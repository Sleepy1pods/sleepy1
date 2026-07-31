/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
      },
      colors: {
        ink: {
          950: '#07080b',
          900: '#0b0d12',
          800: '#12141b',
          700: '#1a1d27',
          600: '#242836',
        },
        ivory: {
          50: '#fffdf9',
          100: '#faf6ef',
          200: '#f3ecdf',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e6ff',
          200: '#c7d1ff',
          300: '#a7b5fd',
          400: '#8b9bfb',
          500: '#7182f0',
          600: '#5b67d8',
          700: '#4a52b0',
          800: '#3a4189',
          900: '#2b3066',
        },
        lavender: {
          400: '#b8a9f0',
          500: '#a08ce0',
        },
        moon: {
          300: '#bfe6ee',
          400: '#8fd0dd',
          500: '#63b3c2',
        },
      },
      fontFamily: {
        display: ['"Comfortaa"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Comfortaa"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 24px -4px rgba(0,0,0,0.25)',
        premium: '0 24px 64px -24px rgba(20,20,40,0.35)',
        glow: '0 0 0 1px rgba(160,140,224,0.15), 0 8px 32px -8px rgba(113,130,240,0.35)',
        moonglow: '0 0 80px -12px rgba(143,208,221,0.35), 0 0 40px -8px rgba(160,140,224,0.25)',
        nebula: '0 32px 96px -32px rgba(91,103,216,0.4)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'drift-slow': 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        floatSlow: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        breathe: { '0%,100%': { transform: 'scale(1)', opacity: 0.9 }, '50%': { transform: 'scale(1.045)', opacity: 1 } },
        drift: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(-2.5%, 3%)' } },
      },
    },
  },
  plugins: [],
}
