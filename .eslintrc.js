module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `gristow`,
  rules: {
    'no-console': 1,
    'prettier/prettier': [
      1,
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: true,
      },
    ],
  },
};
