/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B1020',
          bgSecondary: '#121A2E',
          card: 'rgba(255, 255, 255, 0.06)',
          gold: '#D4AF37',
          lightGold: '#F5E6A6',
          white: '#F8F9FA',
          textSecondary: '#AAB4C5',
          blue: '#4F8CFF',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'premium-gold': '0 0 15px rgba(212, 175, 55, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
