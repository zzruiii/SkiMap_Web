/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ski-blue': '#4579CC',
        'ski-dark': '#0B1748',
        'ski-navy': '#293F88',
        'ski-text': '#011240',
      },
      fontFamily: {
        'inria': ['Inria Sans', 'sans-serif'],
      },
      animation: {
        'snow-fall': 'snowfall linear infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        snowfall: {
          '0%': { transform: 'translateY(-100vh) translateX(0px)' },
          '100%': { transform: 'translateY(100vh) translateX(100px)' },
        },
        scrollBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} 