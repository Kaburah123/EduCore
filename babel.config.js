module.exports = function(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@assets": "./assets",
            "@convex": "./convex",
          },
        },
      ],
      "expo-router/babel",
      "react-native-reanimated/plugin",
    ],
  };
};