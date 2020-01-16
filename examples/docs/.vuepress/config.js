const path = require('path')
const sidebar = require('../sidebar.json')

module.exports={
  base:'/VFluent/',
  title : 'FluentVueDesign',
  description: 'FluentVueDesign',
  configureWebpack:{
    resolve:{
      alias:{
        '@':path.join(__dirname,'../../../packages')
      }
    }
  },
  themeConfig:{
    sidebar: sidebar
  }
}