require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/,
});
require.extensions['.css'] = () => {};
