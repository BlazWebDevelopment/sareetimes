import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saree: {
          ink: '#17150f',
          rule: '#17150f',
          teal: '#0e5b61',
          'teal-dark': '#093f44',
          crimson: '#a4192c',
          paper: '#ffffff',
          cream: '#faf8f3',
          hairline: '#ddd5c6',
        },
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-editorial)', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['var(--font-editorial)', 'Georgia', 'Times New Roman', 'serif'],
        masthead: ['var(--font-wordmark)', 'Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        broadsheet: '1280px',
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
}
export default config
