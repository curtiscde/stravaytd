module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/coverage/**",
    "!**/public/**",
    "!types/**",
    "!functions/types/**",
    "!**/*.config.js",
    "!.eslintrc.json",
    "!next-env.d.ts"
  ],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(@octokit|universal-user-agent|before-after-hook)/)"]
}