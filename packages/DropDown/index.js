import DropDown from './src/index.vue'

DropDown.install = function(Vue){
  Vue.component(DropDown.name,DropDown)
}

export default DropDown;
