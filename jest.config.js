module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },
  preset: "ts-jest/presets/js-with-ts"
};
