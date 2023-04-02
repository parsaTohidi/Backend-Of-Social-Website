module.exports = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/$1'
  },
};
