/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0D0842',
        'blackBG' : '#F3F3F3',
        'Favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Montserrat", "serif"],
        'secondary' : ["Nunito Sans", "serif"]
      },

      // animation tự design 
      keyframes: {
        dropdown: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        },
        'slide-in': {
          '0%': { 
            transform: 'translateX(-100%)',
          },
          '100%': { 
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        dropdown: 'dropdown 0.2s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}