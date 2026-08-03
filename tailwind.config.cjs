/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c2733',
        navy: { DEFAULT: '#16273d', 2: '#23405e' },
        slate: '#5b7086',
        paper: { DEFAULT: '#f6f3ec', 2: '#efeadf' },
        line: '#d9d2c1',
        bronze: '#b1793a',
        amber: { DEFAULT: '#d9a455', soft: '#f1e2c4' },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
