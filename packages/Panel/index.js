import Panel from './src/index.vue'

Panel.install = function(Vue){
  Vue.component(Panel.name,Panel)
}

export default Panel;
