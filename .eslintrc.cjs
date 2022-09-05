module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'plugin:react/jsx-runtime',
    'airbnb',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react', 'prettier', '@typescript-eslint'],

  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
  },

  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    react: {
      version: 'detect',
    },
  },
  // overrides: [
  //   // Only uses Testing Library lint rules in test files
  //   {
  //     files: [
  //       '**/__tests__/**/*.[jt]s?(x)',
  //       'src/**/?(*.)+(spec|test).[jt]s?(x)',
  //       // 'jest.setup.js',
  //     ],
  //     plugins: ['testing-library'],
  //     extends: ['plugin:testing-library/react'],
  //     env: {
  //       jest: true,
  //     },
  //   },
  // ],
};
