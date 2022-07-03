module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect"
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
