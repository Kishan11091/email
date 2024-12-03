module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // This is where we will set the global timeout (10 seconds)
    testTimeout: 10000, // Sets timeout to 10 seconds for all tests
  };
  