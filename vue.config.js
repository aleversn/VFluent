const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pages: {
    index: {
      entry: "examples/index.js"
    }
  },
  css: {
    // Separate StyleSheet
    extract: true,
    requireModuleExtension:false,
    sourceMap: false
  },
  productionSourceMap:false,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("packages/"));
  },
  lintOnSave: false
};
