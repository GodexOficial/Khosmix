module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'jest --bail --findRelatedTests',
  ],
  '*.{css,scss}': ['prettier --write'],
  '*.{json,md}': ['prettier --write'],
}; 