import ToggleSwitch from './src/index.vue'

ToggleSwitch.install = function(Vue){
  Vue.component(ToggleSwitch.name,ToggleSwitch)
}

export default ToggleSwitch;
