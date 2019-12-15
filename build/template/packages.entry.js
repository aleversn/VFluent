/**
 * @param imports
 * @param installs
 * @param theme
 * @param prefix
 */
module.exports=`// Auto generate by New.js
  
  {{imports}}
  
  let components = [
  {{installs}}
  ]
  
  const install = function(Vue){
    if (install.installed) return
    Vue.prototype.\${{prefix}}Theme='light'
    components.map(component => Vue.use(component))
  }
  
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  
  export default {
    install,
    {{installs}}
  }
  `