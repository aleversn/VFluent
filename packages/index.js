import './light-theme/index.scss'
import './dark-theme/index.scss'
import './custom-theme/index.scss'
// Auto generate by New.js
import global from './global.js'
import Button from '@/Button/index.js'
import ProgressRing from '@/ProgressRing/index.js'
import CheckBox from '@/CheckBox/index.js'


let components = [
  Button,
  ProgressRing,
  CheckBox,

]

const install = function(Vue){
  if (install.installed) return
  Vue.prototype.$fvGlobal=global
  components.map(component => Vue.use(component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
    Button,
  ProgressRing,
  CheckBox,

}

