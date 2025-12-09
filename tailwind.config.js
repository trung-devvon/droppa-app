/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB84D",
          400: "#FF9A00",
          500: "#FF6200",   // Màu chính - dùng nhiều nhất
          600: "#E55A00",
          700: "#CC5200",
          800: "#B24800",
          900: "#993D00",
          DEFAULT: "#FF6200",
        },
        success: {
          50: "#E8F5E8",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#00B14F",   // Xanh lá chính
          600: "#009688",
          700: "#00796B",
          800: "#00695C",
          900: "#004D40",
          DEFAULT: "#00B14F",
        },
        latte: {
          50: "#FAF7F5",
          100: "#F5EEEB",
          200: "#E8E0DB",
          300: "#D7CCC8",   // Nâu sữa nhạt đẹp nhất
          400: "#BCAAA4",
          500: "#A1887F",
          600: "#8B6F65",
          700: "#72574F",
          800: "#5D463F",
          900: "#4A3732",
          DEFAULT: "#D7CCC8",
        },

        // MÀU HỖ TRỢ
        danger: "#E31E24",
        warning: "#FF9800",
        info: "#2979FF",

        // Gray trung tính (đậm dần)
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      }
    },
  },
  plugins: [],
}
