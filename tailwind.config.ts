import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["var(--font-gilroy)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neutral: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#BCBCBC",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4F4F4F",
          800: "#454545",
          900: "#131313"
        },
        brand: {
          50: "#FFF3E8",
          100: "#FFDEC0",
          200: "#FFC58E",
          300: "#FF914C",
          500: "#FF7B21"
        }
      }
    },
  },
  plugins: [],
};
export default config;
