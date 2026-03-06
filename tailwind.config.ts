import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003B5C',
        secondary: '#00838F',
        accent: '#D4A843',
        background: '#F7F8FA',
        surface: '#FFFFFF',
        textPrimary: '#1A1A2E',
        textSecondary: '#5A6275',
        border: '#DDE1E6',
        success: '#198754',
        warning: '#E6930A',
        error: '#DC3545',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
