module.exports = {
  '*.+(scss|css)': [
    'prettier --write',
    'stylelint --fix --config ./.stylelintrc.js',
    'git add'
  ],
  '*.+(js)': [
    'eslint --fix',
    'git add'
  ],
  '*.+(json|md)': [
    'prettier --write',
    'git add'
  ]
};
