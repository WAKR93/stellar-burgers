import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  clearMocks: true,
  testEnvironment: "jsdom",

  globals: {
    __MODE__: "unit-tests",
    __BURGER_API_CLIENT__: "mock",
    __BURGER_API_BASE_URL__: "",
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },

  collectCoverageFrom: [
    "!src/**/*.d.ts",
    "src/**/*.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/__mocks__/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
};

export default config;
