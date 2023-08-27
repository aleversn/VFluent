import IconElement from './src/index.vue'

IconElement.install = function(Vue){
  Vue.component(IconElement.name,IconElement)
}

export default IconElement;
