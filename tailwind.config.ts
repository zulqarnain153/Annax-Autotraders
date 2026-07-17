import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Premium dark charcoal base (was navy) ───────────────────
        navy: {
          950: "#08080A",
          900: "#131315",
          800: "#1C1C1F",
          700: "#28282C",
          600: "#38383D",
        },
        // ─── Gold accent (was "ignition" orange — kept the token name
        // so every existing component picks up the new colour, but it's
        // the brand gold now, not orange) ──────────────────────────────
        ignition: {
          DEFAULT: "#C9A227",
          600: "#A6821D",
          500: "#C9A227",
          400: "#E4C567",
        },
        // ─── UK number-plate motif — kept as real plate yellow/blue,
        // used sparingly (reg lookup, price plates) ─────────────────
        plate: {
          yellow: "#FFD204",
          white: "#F7F8FA",
          band: "#0B3D91",
        },
        // ─── Silver / platinum secondary text (was steel blue-grey) ──
        steel: {
          300: "#D9D9DD",
          400: "#A3A3AA",
          500: "#84848C",
        },
        // ─── Aliases for clarity in new code — same values as above ──
        charcoal: {
          950: "#08080A",
          900: "#131315",
          800: "#1C1C1F",
          700: "#28282C",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C567",
          dark: "#A6821D",
        },
        silver: {
          DEFAULT: "#C7C9CD",
          400: "#9EA1A8",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "navy-radial": "radial-gradient(circle at 30% 20%, #28282C 0%, #08080A 65%)",
        "ignition-gradient": "linear-gradient(135deg, #E4C567 0%, #A6821D 100%)",
        "plate-gradient": "linear-gradient(135deg, #FFD204 0%, #F2C300 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(201, 162, 39, 0.25)",
        "glow-lg": "0 0 80px rgba(201, 162, 39, 0.2)",
        card: "0 8px 30px rgba(0, 0, 0, 0.45)",
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
