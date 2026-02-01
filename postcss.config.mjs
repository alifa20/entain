const config = {
  plugins: {
    '@tailwindcss/postcss': {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#FF6B35',
            'background-dark': '#0F1419',
            'surface-dark': '#1E2732',
            'surface-hover': '#252E38',
            'border-dark': '#2F3336',
            'text-secondary': '#8899A6'
          },
          fontFamily: {
            display: ['Inter', 'sans-serif']
          },
          borderRadius: {
            DEFAULT: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            full: '9999px'
          }
        }
      }
    }
  }
}

export default config
