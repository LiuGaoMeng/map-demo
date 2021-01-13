module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "generator-star-spacing": "off",
      "no-tabs": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-irregular-whitespace": "off",
      "no-debugger": "off",
      "no-undef": "off",
      "vue/no-parsing-error": [
        2,
        {
          "x-invalid-end-tag": false
        }
      ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
