import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue-egg": "#77D5EE",
      },
    },
    fontSize: {
      "heading3-bold": [
        "50px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "heading2-bold": [
        "1.5rem",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "heading2-account": [
        "1.7rem",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
    },
  },
  plugins: [],
};
export default config;
