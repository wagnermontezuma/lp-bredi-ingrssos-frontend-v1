import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bredi: {
          primary: "#212121",
          secondary: "#444444",
          accent: "#FFD600",
          neutral: "#444444",
          bg: "#FFFFFF",
          muted: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
