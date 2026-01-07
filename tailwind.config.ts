import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nat-dark': '#0f0f0f',
        'nat-light': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
export default config
