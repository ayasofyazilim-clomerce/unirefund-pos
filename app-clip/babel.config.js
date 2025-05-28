module.exports = function (api) {
  api.cache(true);
  let plugins = ['react-native-worklets-core/plugin'];

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind', unstable_transformImportMeta: true }],
      'nativewind/babel',
    ],

    plugins,
  };
};
