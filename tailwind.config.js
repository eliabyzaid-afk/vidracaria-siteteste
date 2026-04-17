/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
        navy: {
          50: '#EFF4FB',
          100: '#D6E4F5',
          200: '#A8C8EC',
          300: '#75A8E0',
          500: '#1A4E8F',
          700: '#0F3669',
          800: '#0A2347',
          900: '#061628',
          950: '#030D18',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
