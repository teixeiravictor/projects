module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    enabled: false,
    content: ['./src/**/*.html'],
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1062px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Muli', 'sans-serif'],
      body: ['Muli', 'sans-serif'],
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px',
    },
    extend: {
      colors: {
        primary: '#575757',
        secondary: '#19B5F1',
        cyan: '#9cdbff',
      },
      spacing: {
        96: '24rem',
        128: '32rem',
      },
      height: {
        '668px': '668px',
      },
      inset: {
        '1/2': '50%',
      },
      gridTemplateRows: {
        'work-with-us': '220px 300px',
      },
      backgroundImage: (theme) => ({
        'hero-pattern': "url('../assets/images/banner-01.png')",
      }),
    },
  },
};
