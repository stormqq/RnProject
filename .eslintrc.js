/* eslint-disable */
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // <--- THIS IS THE NEW RULE
    'react/no-unstable-nested-components': 'off',
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
