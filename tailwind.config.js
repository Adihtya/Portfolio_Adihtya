/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'strike-bg': '#F4F4F0',
        'strike-black': '#0F0F0F',
        'strike-red': '#FF2A00',
        'strike-blue': '#0033FF',
        'strike-yellow': '#CCFF00',
      },
      fontFamily: {
        poster: ['"Anton"', '"Oswald"', 'Impact', 'sans-serif'],
        heading: ['"Oswald"', '"Anton"', 'sans-serif'],
        mono: ['"Space Mono"', '"IBM Plex Mono"', 'monospace'],
        sans: ['"Space Mono"', '"IBM Plex Mono"', 'sans-serif'],
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px 0px #0F0F0F',
        'hard': '4px 4px 0px 0px #0F0F0F',
        'hard-lg': '6px 6px 0px 0px #0F0F0F',
        'hard-xl': '8px 8px 0px 0px #0F0F0F',
        'hard-red': '4px 4px 0px 0px #FF2A00',
        'hard-blue': '4px 4px 0px 0px #0033FF',
        'hard-yellow': '4px 4px 0px 0px #CCFF00',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
}
