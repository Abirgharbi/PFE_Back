import type { JestConfigWithTsJest } from 'ts-jest';
const jestConfing: JestConfigWithTsJest = {
  roots: ['__tests__'],
  moduleFileExtensions: ['js', 'ts'],
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: false
      }
    ]
  },
  transformIgnorePatterns: ['/node_modules/']
};

export default jestConfing;
