module.exports = {
  'root': true,
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'standard',
    'plugin:vue/recommended'
  ],
  'plugins': [
    'vue'
  ],
  rules: {
    // allow trailing comma
    'comma-dangle': ['error', 'only-multiline'],
    'prefer-promise-reject-errors': 0,
    camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    quotes: 'off',
    'no-return-assign': 'off',
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
