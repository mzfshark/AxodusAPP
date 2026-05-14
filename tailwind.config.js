/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material Design 3 / Axodus Custom Colors
        primary: {
          DEFAULT: 'rgb(192, 193, 255)',
          container: 'rgb(128, 131, 255)',
        },
        secondary: {
          DEFAULT: 'rgb(65, 228, 184)',
          container: 'rgb(0, 200, 158)',
        },
        tertiary: {
          DEFAULT: 'rgb(255, 183, 131)',
          container: 'rgb(217, 119, 33)',
        },
        outline: {
          DEFAULT: 'rgb(70, 69, 84)',
          variant: 'rgb(70, 69, 84)',
        },
        error: {
          DEFAULT: 'rgb(255, 127, 122)',
          container: 'rgb(147, 0, 10)',
        },
        background: 'rgb(11, 19, 38)',
        surface: {
          DEFAULT: 'rgb(11, 19, 38)',
          container: 'rgb(45, 52, 73)',
          'container-low': 'rgb(30, 38, 54)',
          'container-lowest': 'rgb(11, 19, 38)',
          'container-high': 'rgb(59, 67, 88)',
          'container-highest': 'rgb(76, 85, 109)',
        },
        'on-primary': 'rgb(34, 42, 61)',
        'on-secondary': 'rgb(0, 56, 42)',
        'on-tertiary': 'rgb(79, 37, 0)',
        'on-error': 'rgb(105, 0, 5)',
        'on-surface': 'rgb(218, 226, 253)',
        'on-surface-variant': 'rgb(218, 226, 253)',
        'on-primary-container': 'rgb(67, 70, 255)',
        'primary-container': 'rgb(128, 131, 255)',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'base': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-md': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'slide-in-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-left': 'slide-in-from-left 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'slide-in-from-top': {
          'from': {
            'transform': 'translateY(-100%)',
            'opacity': '0',
          },
          'to': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        },
        'slide-in-from-left': {
          'from': {
            'transform': 'translateX(-100%)',
            'opacity': '0',
          },
          'to': {
            'transform': 'translateX(0)',
            'opacity': '1',
          },
        },
        'fade-in': {
          'from': {
            'opacity': '0',
          },
          'to': {
            'opacity': '1',
          },
        },
      },
    },
  },
  plugins: [],
};
