module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        article: "url('/images/article-section.jpg')",
        dataset: "url('/images/dataset-section.jpg')",
        research: "url('/images/research-section.jpg')",
        about: "url('/images/about-section.jpg')",
        homepage: "url('/images/random-homepage-picture.jpg')",
        admin: "url('/images/admin-section.jpg')",
        tag: "url('/images/tag-section.jpg')"
      },
      height: {
        112: "28rem",
        "50vh": "50vh",
        "70vh": "70vh"
      }
    }
  },
  plugins: []
};
