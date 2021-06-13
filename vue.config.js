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
        requireModuleExtension: true,
        sourceMap: false
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ]
    },
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("packages/"));
    },
    lintOnSave: false
};
