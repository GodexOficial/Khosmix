module.exports = {
  extends: ['./.eslintrc.js'],
  env: {
    jest: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
}; 