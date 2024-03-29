module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/infra/database/knex/knexfile.js',
    '!<rootDir>/src/infra/database/knex/migrations/**/*'
  ],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/__tests__/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  testMatch: ["**/?(*.)+(spec|test).ts"],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}