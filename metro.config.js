const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// reduce file watching load
config.watchFolders = [];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;