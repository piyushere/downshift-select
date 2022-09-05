const tailwindForms = require('@tailwindcss/forms');
/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: ['class'], // or 'media' or false
  variants: {
    display: ['group-hover'],
    transition: ['group-hover'],
    extend: {
      backgroundColor: ['active'],
      textColor: ['active', 'hover'],
    },
  },
  theme: {
    extend: {
      boxShadow: {
        'control-focus-dark':
          'rgb(17, 18, 23) 0px 0px 0px 2px, rgb(61, 113, 217) 0px 0px 0px 4px',
        'control-focus-light':
          'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(61, 113, 217) 0px 0px 0px 4px',
      },
      ringColor: {
        'focused-primary': 'rgb(38, 152, 255)',
      },
      borderColor: {
        'focused-primary': 'rgb(38, 152, 255)',
      },
    },
  },
  // plugins: [tailwindForms],
  corePlugins: {
    preflight: true,
  },
  // important: 'body',
};
