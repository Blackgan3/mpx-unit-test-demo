/**
 * @file config of jest
 * @url https://jestjs.io/docs/en/configuration
 */
module.exports = {
  // rootDir: path.join(__dirname),
  moduleFileExtensions: ['js', 'mpx', 'json'],
  cache: false,
  moduleNameMapper: {
    // webpack的alias需要在此处理
    '^src(.*)': '<rootDir>/src/$1',
    '@mpxjs/core': '<rootDir>/node_modules/@mpxjs/core/src/index.js'
  },
  testPathIgnorePatterns: ['dist', 'node_modules'],
  testURL: 'http://test.api.com',
  setupFiles: ['<rootDir>/test/setup'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.mpx$': '<rootDir>/node_modules/@mpxjs/mpx-jest'
    // '^.+\\.mpx\\.js$': '<rootDir>/src/mpx-jest/mpxjs/webpack-plugin/mpx-jest',
  },
  // 屏蔽掉require真实去 locate 文件位置
  transformIgnorePatterns: ['node_modules/(?!(@mpxjs))']
}
