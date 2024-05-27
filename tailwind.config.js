/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/client/**/*.{html,js,ts,scss}", "./src/views/**/*.pug"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-bg": "var(--primary-bg)",
      },
      transitionProperty: {
        opacity: "opacity",
      },
      translate: {
        center: "-50%",
      },
    },
  },
  plugins: [],
};
