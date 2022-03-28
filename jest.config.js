/**
 * @file config of jest
 * @url https://jestjs.io/docs/en/configuration
 */
module.exports = {
  // rootDir: path.join(__dirname),
  moduleFileExtensions: ['js', 'mpx', 'json'],
  collectCoverage: false,
  collectCoverageFrom: [
    "src/pages/**",
    "src/store/**",
    "src/components/**"
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // webpack的alias需要在此处理
    '^src(.*)': '<rootDir>/src/$1',
    '@mpxjs/core$': '<rootDir>/node_modules/@mpxjs/core/src/index.js',
    '@mpxjs/fetch': '<rootDir>/node_modules/@mpxjs/fetch/src/index.js',
  },
  testPathIgnorePatterns: ['dist', 'node_modules'],
  testURL: 'http://test.api.com',
  setupFiles: ['<rootDir>/test/setup', '<rootDir>/test/mockFetch'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.mpx$': '<rootDir>/node_modules/@mpxjs/mpx-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(@mpxjs))'],
  resolver: './mpx-custom-resolver.js'
}
