/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      dark: '#9A76A5',
      'dark-highlight': '#715C8C',
      light: '#D7D4DD',
      gray: '#9099A2',
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    extend: {
      fontFamily: {
        site: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
