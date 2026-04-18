
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg:    '#F4F5FB',
        lightBg:   '#F4F5FB',
        accent:    '#5B4CF5',
        secondary: '#E84393',
        tertiary:  '#00C9B1',
        cardLight: '#FFFFFF',
        cardDark:  '#FFFFFF',
      },
      fontFamily: {
        heading:  ['Fraunces', 'Georgia', 'serif'],
        body:     ['DM Sans', 'system-ui', 'sans-serif'],
        mono:     ['JetBrains Mono','monospace'],
      },
      boxShadow: {
        card:  '0 2px 8px rgba(18,16,58,0.08)',
        hover: '0 16px 48px rgba(18,16,58,0.13)',
        glow:  '0 8px 32px rgba(91,76,245,0.22)',
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':         'float 5s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        'spin-slow':     'spin-slow 20s linear infinite',
        'pulse-glow':    'pulse-glow 3s ease-in-out infinite',
        'marquee':       'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':     { transform: 'translateY(-14px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':     { transform: 'translateY(14px) rotate(-2deg)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(91,76,245,0)' },
          '50%':     { boxShadow: '0 0 28px 6px rgba(91,76,245,0.2)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
