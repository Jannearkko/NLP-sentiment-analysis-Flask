/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        // Add classes to safelist here
        // Example: Safelist for dynamic background and hover classes for colors green and blue
        'bg-green-600', 'hover:bg-green-700',
        'bg-blue-600', 'hover:bg-blue-700',
        'bg-red-600', 'hover:bg-red-700',
        'bg-gray-600', 'hover:bg-gray-700',
        'text-black'
        // Add more classes as needed
      ],
    },
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['"Open Sans"', 'sans-serif'],
      'heading': ['"Merriweather"', 'serif'],
    },
    extend: {
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'slow-spin': 'spin 3s linear infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

