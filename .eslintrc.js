module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  rules: {
    'require-atomic-updates': 0,
    'no-useless-escape': 0,
    'no-console': 0,
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
  },
  globals: {
    rootRequire: true,
    rootPath: true,
  },
};
