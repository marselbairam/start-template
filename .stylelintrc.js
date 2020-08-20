module.exports = {
  extends: [
    'stylelint-config-airbnb',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  ignoreFiles: [
    './markup/static/scss/entry/*.scss',
    './markup/static/scss/etc/*.scss',
    './markup/static/scss/sprite-generator-templates/*.scss',
    './markup/static/scss/sprites-scss/*.scss',
    './markup/static/scss/normalize.scss',
  ],
  rules: {
    'order/order': [
      'declarations',
      {
        type: 'at-rule',
        name: 'supports',
      },
      {
        type: 'at-rule',
        name: 'media',
      },
      {
        type: 'rule',
        selector: '^&:(before|after)',
      },
      {
        type: 'rule',
        selector: '^&:before',
      },
      {
        type: 'rule',
        selector: '^&:after',
      },
      {
        type: 'rule',
        selector: '^&:(?!hover|focus|active|disabled)',
      },
      {
        type: 'rule',
        selector: '^&:(hover|focus|active|disabled)',
      },
      {
        type: 'rule',
        selector: '^(&_([a-z0-9]+-?)+)?',
      },
      {
        type: 'rule',
        selector: '^& \\+ &',
      },
      {
        type: 'rule',
        selector: '^&\\.&',
      },
      {
        type: 'rule',
        selector: '^(&__([a-z0-9]+-?)+)?',
      },
      'rules',
    ],
  },
};
