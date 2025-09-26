/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          parchment: '#F3EBDD',
          bronze: '#8A6E49',
          'deep-green': '#1F3A2E',
          'deep-red': '#6E2F2F',
          charcoal: '#0F1115',
          gold: '#D4AF37',
          'gold-light': '#F4E4BC',
        }
      },
      fontFamily: {
        serif: ['Spectral', 'Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
      boxShadow: {
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'embossed': '0 1px 3px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.24)',
        'vintage': '0 4px 6px -1px rgba(15, 17, 21, 0.1), 0 2px 4px -1px rgba(15, 17, 21, 0.06)',
      },
      backgroundImage: {
        'paper-grain': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        'gold-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(244, 228, 188, 0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
