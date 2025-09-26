module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/tests/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
      coverageDirectory: '<rootDir>/coverage/server',
      collectCoverageFrom: [
        'server/src/**/*.js',
        '!server/src/config/**',
        '!**/node_modules/**',
      ],
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/src/**/*.test.{js,jsx}'],
      setupFilesAfterEnv: ['<rootDir>/client/src/tests/setup.js'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/client/src/__mocks__/fileMock.js',
      },
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
      coverageDirectory: '<rootDir>/coverage/client',
      collectCoverageFrom: [
        'client/src/**/*.{js,jsx}',
        '!client/src/index.js',
        '!**/node_modules/**',
      ],
    },
  ],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },
  testTimeout: 10000,
};