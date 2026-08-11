module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.(tsx?|mjs|js|jsx)$": [
      "jest-preset-angular",
      { tsconfig: "<rootDir>/tsconfig.spec.json" },
    ],
  },
};
