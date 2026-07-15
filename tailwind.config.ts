import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060B16",
          900: "#0B1428",
          800: "#131F3D",
          700: "#1C2C4F",
          600: "#2A3D68",
        },
        ignition: {
          DEFAULT: "#FF4612",
          600: "#E63A0A",
          500: "#FF4612",
          400: "#FF6B3D",
        },
        plate: {
          yellow: "#FFD204",
          white: "#F7F8FA",
          band: "#0B3D91",
        },
        steel: {
          300: "#B7BECC",
          400: "#8B93A6",
          500: "#6B7386",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "navy-radial": "radial-gradient(circle at 30% 20%, #1C2C4F 0%, #060B16 65%)",
        "ignition-gradient": "linear-gradient(135deg, #FF4612 0%, #E63A0A 100%)",
        "plate-gradient": "linear-gradient(135deg, #FFD204 0%, #F2C300 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 70, 18, 0.25)",
        "glow-lg": "0 0 80px rgba(255, 70, 18, 0.2)",
        card: "0 8px 30px rgba(6, 11, 22, 0.35)",
      },
      borderRadius: {
        plate: "6px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "count-up": "countUp 0.4s ease-out forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      letterSpacing: {
        plate: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
