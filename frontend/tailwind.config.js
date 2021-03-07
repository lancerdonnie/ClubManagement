module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      minWidth: {
        250: '250px',
      },
      screens: {
        sm: { max: '640px' },
        md: { max: '768px' },
        lg: { max: '1024px' },
        xl: { max: '1280px' },
        '2xl': { max: '1536px' },
      },
    },
  },
  variants: {
    extend: {
      outline: ['active'],
    },
  },
  plugins: [],
};
