export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins as a custom font
      },
      colors: {
        primary: "#dfe068", // ✅ Add your primary color here
      },
    },
  },
  plugins: [],
};
