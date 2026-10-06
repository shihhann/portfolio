/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#10131A',
          surface: '#191D26',
          elevated: '#202633',
          border: '#2A303B',
          'border-light': '#384252',
        },
        lemon: {
          DEFAULT: '#EFFF4F',
          muted: '#d9e942',
          glow: 'rgba(239, 255, 79, 0.15)',
          subtle: 'rgba(239, 255, 79, 0.06)',
        },
        content: {
          primary: '#F5F5F5',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'lemon-sm': '0 0 15px -3px rgba(239, 255, 79, 0.2)',
        'lemon-glow': '0 0 30px -5px rgba(239, 255, 79, 0.15)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
