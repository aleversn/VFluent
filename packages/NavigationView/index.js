import NavigationView from './src/index.vue'

NavigationView.install = function(Vue){
  Vue.component(NavigationView.name,NavigationView)
}

export default NavigationView;
