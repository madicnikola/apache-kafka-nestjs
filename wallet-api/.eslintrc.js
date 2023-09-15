module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  parserOptions: {
    createDefaultProgram: true,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-console': 'off',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-throw-literal': 'error',
    'no-return-await': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-unused-expressions': 'off',
    'no-label-var': 'error',
    'no-nested-ternary': 'error',
    'line-comment-position': [
      'off',
      {
        position: 'above',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    // Disabling this rule for now since we receive issue in some cases
    // "brace-style": [2, "1tbs", { allowSingleLine: true }],
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public', '*.md'],
};
