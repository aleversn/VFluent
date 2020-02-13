import NavigationPanel from './src/index.vue'

NavigationPanel.install = function(Vue){
  Vue.component(NavigationPanel.name,NavigationPanel)
}

export default NavigationPanel;
