module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov', 'html'],
  setupFiles: ['./tests/mocks/redis.mock.js'],
  globalSetup: './tests/setup.config.js',
  globalTeardown: './tests/teardown.config.js',
  testTimeout: 30000,
};
