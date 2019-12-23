import './light-theme/index.scss'
import './dark-theme/index.scss'
import './custom-theme/index.scss'
// Auto generate by New.js
import global from './global.js'
import '../examples/style/global-transition.css';
import Button from '@/Button/index.js'
import ProgressRing from '@/ProgressRing/index.js'
import CheckBox from '@/CheckBox/index.js'
import Combobox from '@/Combobox/index.js'
import DropDown from '@/DropDown/index.js'
import ProgressBar from '@/ProgressBar/index.js'
import FlipView from '@/FlipView/index.js'


let components = [
  Button,
  ProgressRing,
  CheckBox,
  Combobox,
  DropDown,
  ProgressBar,
  FlipView,

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
  Combobox,
  DropDown,
  ProgressBar,
  FlipView,

}

