import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import svgToDataUri from "mini-svg-data-uri";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const addVariablesForColors = ({ addBase, theme }: any) => {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
};

const config: Config = {
  darkMode: ['class'], // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '3xs': '175px',
        '2xs': '275px',
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1536px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'rgb(217 217 217 / 8%)',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: '#2C3C39', dark: '#2C3C39', light: '#198341', foreground: '#ABDE3B' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', purple: '#AF52DE', indigo: '#5856D6', pink: '#FF2D55', text: '#7D8180' },
        logoColor : "rgb(23 23 23 / var(--tw-bg-opacity, 1))",
        main :"#3F2E56",
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%' },
          to: { backgroundPosition: '350% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
        fadeIn: 'fadeIn 1s ease-in',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      screens: {
        '2xs': '360px',
        xs: '200px',
      },
    },
  },
  plugins: [
    animate,
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

export default config;
