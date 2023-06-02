const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
const debug = process.env.NODE_ENV === 'production' ? false : true;

module.exports = {
    pages: {
        index: {
            entry: "packages/index.js"
        }
    },
    css: {
        // Separate StyleSheet
        extract: true,
        requireModuleExtension: true,
        sourceMap: false
    },
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("packages/"));
        if (debug)
            config.devtool('source-map')
    },
    configureWebpack:{
        externals:{
            // vuex: 'Vuex',
        },
        output: {
            libraryExport: 'default',
        },
    },
    lintOnSave: false
};
