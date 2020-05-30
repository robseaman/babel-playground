module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js',
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__snapshots__/',
  ],
};
