const path = require('path')
const sidebar = require('../sidebar.json')
const webpack = require("webpack")

module.exports = {
    base: '/VFluent/',
    title: 'FluentVueDesign',
    description: 'FluentVueDesign',   
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, '../../../packages')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ]
    },
    themeConfig: {
        sidebar: sidebar,
        logo:"https://raw.githubusercontent.com/aleversn/VFluent/master/examples/assert/logo/VFluent.png",
    }
}