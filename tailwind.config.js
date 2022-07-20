module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        article: "url('/images/article-section.jpg')",
        dataset: "url('/images/dataset-section.jpg')",
        research: "url('/images/research-section.jpg')",
        about: "url('/images/about-section.jpg')",
        homepage: "url('/images/random-homepage-picture.jpg')"
      },
      height: {
        112: "28rem",
        "50vh": "50vh"
      }
    }
  },
  plugins: []
};
