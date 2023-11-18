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
        text: {
          main: '#333333',
          secondary: '#666666',
        },
        view: {
          main: '#F4F4F4',
          secondary: '#F0EEF6',
        },
        background: '#D9ECD9',
        button: {
          text: '#525652',
          main:'#013474',
          secondary:'#F8DB95'
        },
        gray: {
          200: '#D9D9D9',
          400: '#DDDDDD',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
