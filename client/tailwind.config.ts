import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: "class",
  content: [
    './src/pages/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{html,js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
        colors: {
            white: "#ffffff",
            gray: {
                100: "#f3f4f6",
                200: "#e2e8f0",
                300: "#e5e7eb",
                400: "#d1d5db",
                500: "#6b7280",
                700: "#374151",
                800: "#1f2937",
            },
            blue: {
                200: "#93c5fd",
                400: "#60a5fa",
                500: "#3b82f6",
            },
            fill: {
              dark: {
                secondary: "#1d1f21",
                tertiary: "#3b3d40",
              }
            },
            "dark-bg": "#101214",    
            "dark-secondary": "#1d1f21",
            "dark-tertiary" : "#3b3d40",
            "blue-primary": "#0275ff",
            "stroke-dark": "#2d3135",
        },
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
    }, 
  },
  plugins: [], 
};

export default config;