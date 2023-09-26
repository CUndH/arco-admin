/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_color: 'var(--color-bg-1)',
        primary: 'var(--primary-6)',
      },
    },
  },
};
