/**
 * @param imports
 * @param installs
 * @param theme
 * @param prefix
 */
module.exports=`// Script Gen, Wanring: Edit template instead of it
import global from './global.js'
import {SDate} from './usual.js'
import {SUtility} from './usual.js'
import {RevealDirect, RevealMasked} from './usual.js'
import '../examples/style/global-transition.css'
import './office-ui-fabric-core/dist/css/fabric.min.css'
{{imports}}
import pkg from "../package.json"

let components = [
{{installs}}
]

const install = function(Vue, vuex){
  // fix(2022-09-15): fix Vue.use not work
  for (let plugin of Vue._installedPlugins){
    if (plugin.name==pkg.name){
      return;
    }
  }
  console.log("[CreatorSN] {{prefix}}Components v"+pkg.version)
  Vue.use(vuex)
  Vue.prototype.\${{prefix}}Global=global(vuex)
  Vue.prototype.$SDate=SDate
  Vue.prototype.$SUtility=SUtility
  Vue.prototype.$_RevealDirect = undefined;
  Object.defineProperty(Vue.prototype, '$RevealDirect', {
      get() {
          if (Vue.prototype.$_RevealDirect === undefined) {
              Vue.prototype.$_RevealDirect = new RevealDirect();
          }
          return Vue.prototype.$_RevealDirect;
      },
  });
  Vue.prototype.$_RevealMasked = undefined;
  Object.defineProperty(Vue.prototype, '$RevealMasked', {
      get() {
          if (Vue.prototype.$_RevealMasked === undefined) {
              Vue.prototype.$_RevealMasked = new RevealMasked();
          }
          return Vue.prototype.$_RevealMasked;
      },
  });
  components.map(component => Vue.use(component))
}

export default {
  name: pkg.name,
  version: pkg.version,
  install,
  {{installs}}
}
`