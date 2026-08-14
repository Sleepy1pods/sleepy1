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
          950: 'var(--bg)',
          900: 'var(--surface)',
          800: 'var(--surface)',
          700: 'var(--border)',
          600: 'var(--border)',
        },
        ivory: {
          50:  'var(--text-primary)',
          100: 'var(--text-secondary)',
          200: 'var(--text-muted)',
        },
        cta: {
          fill: 'var(--cta-bg)',
          text: 'var(--cta-text)',
        },
        brand: {
          300: '#a7b5fd',
          400: '#8b9bfb',
          500: '#7182f0',
          600: '#5b67d8',
        },
      },
      fontFamily: {
        display: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft:    '0 2px 24px -4px rgba(0,0,0,0.08)',
        premium: '0 24px 64px -24px rgba(0,0,0,0.15)',
        glow:    '0 8px 32px -8px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
