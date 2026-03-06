/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jvm-dark': '#1a1f2e',
        'jvm-darker': '#0f1419',
        'jvm-blue': '#61dafb',
        'jvm-green': '#00d9a3',
        'jvm-purple': '#a855f7',
        'jvm-orange': '#ff7b00',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
