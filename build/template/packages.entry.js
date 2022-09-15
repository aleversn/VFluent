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

let components = [
{{installs}}
]

const install = function(Vue){
  // fix(2022-09-15): fix Vue.use not work
  if (install.installed) return;
  install.installed = true;
  Vue.prototype.\${{prefix}}Global=global
  Vue.prototype.$SDate=SDate
  Vue.prototype.$SUtility=SUtility
  // singleton
  Vue.prototype.$_RevealDirect = undefined;
  Object.defineProperty(Vue.prototype, '$RevealDirect', {
      get() {
          if (Vue.prototype.$_RevealDirect === undefined) {
              Vue.prototype.$_RevealDirect = new RevealDirect();
          }
          return Vue.prototype.$_RevealDirect;
      },
  });s
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
  install,
  {{installs}}
}
`