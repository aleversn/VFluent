const path = require("path");
const webpack = require("webpack")
function resolve(dir) {
    return path.join(__dirname, dir);
}
const debug = process.env.NODE_ENV === 'production' ? false : true;

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
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             process: 'process/browser',
    //         }),
    //     ]
    // },
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("packages/"));
        if (debug)
            config.devtool('source-map')
    },
    lintOnSave: false
};
