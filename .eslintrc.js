module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `gristow`,
  rules: {
    'no-console': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: true,
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: false,
      },
    ],
  },
}
