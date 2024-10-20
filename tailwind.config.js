/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "#171717",
        primary: "#FFCF11",
      },
      screens: {
        sm: { max: "640px" }, // Max width for small devices like mobile phones
        md: { max: "768px" }, // Max width for tablets and small laptops
        lg: { max: "1024px" }, // Max width for large tablets and laptops
        xl: { max: "1280px" }, // Max width for desktops
        "2xl": { min: "1536px" }, // Min width for large desktops
      },
      fontFamily: {
        ginto: ["var(--font-ginto)", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        abz: ["ABeeZee", "sans-serif"],
      },
    },
  },
  plugins: [],
};
