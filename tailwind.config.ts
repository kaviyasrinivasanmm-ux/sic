import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zen: {
          bg: '#FCFBF8', // Warm White
          surface: '#F8F5F0', // Warm Ivory
          card: '#FFFFFF',
          dark: '#111614',
          darkCard: '#1A211E',
          muted: '#8C857B',
        },
        bloom: {
          ivory: '#F8F5F0',
          beige: '#EEE6DA',
          sage: '#A8B59A',
          eucalyptus: '#8FA88B',
          white: '#FCFBF8',
          gold: '#C7A76C',
          dark: '#111614',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E4ECE7',
          200: '#C7D9CE',
          300: '#9FBDB0',
          500: '#A8B59A', // Sage Green
          600: '#8FA88B', // Eucalyptus
          700: '#3A4D41',
          900: '#1D2A22',
        },
        gold: {
          light: '#EEE6DA', // Soft Beige
          DEFAULT: '#C7A76C', // Champagne Gold
          dark: '#9A7A3B',
          glow: 'rgba(199, 167, 108, 0.25)',
        },
        sand: {
          light: '#F8F5F0',
          DEFAULT: '#EEE6DA',
          dark: '#C8BAA9',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'ripple': 'ripple 3s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

export default config
