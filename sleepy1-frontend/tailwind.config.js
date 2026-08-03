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
          300: '#c9bdf5',
          400: '#b3a3ef',
        },
        gold: {
          200: '#e9d9ae',
          300: '#dcc088',
          400: '#c9a35f',
        },
      },
      fontFamily: {
        display: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 24px -4px rgba(0,0,0,0.25)',
        premium: '0 24px 64px -24px rgba(20,20,40,0.35)',
        glow: '0 8px 32px -8px rgba(139,155,251,0.35)',
        golden: '0 8px 28px -8px rgba(201,163,95,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'twinkle': 'twinkle 5s ease-in-out infinite',
        'drift': 'drift 40s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        twinkle: { '0%,100%': { opacity: 0.25 }, '50%': { opacity: 0.85 } },
        drift: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(2%,-3%)' } },
      },
    },
  },
  plugins: [],
}
