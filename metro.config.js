const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig();
  const { transformer, resolver } = config;
  return {
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      ...resolver,
      assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...resolver.sourceExts, "svg"]
    }
  };
})();
