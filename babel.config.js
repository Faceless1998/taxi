module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // შეცვალეთ presents -> presets
    plugins: [
      [
        "module:react-native-dotenv", // ეს უნდა იყოს მასივი
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
