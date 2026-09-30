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
          ink: '#121722',
          rule: '#121722',
          cobalt: '#1c4e8a',
          'cobalt-dark': '#133865',
          crimson: '#a4192c',
          paper: '#ffffff',
          mist: '#f5f7fa',
          hairline: '#d2d8e1',
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
