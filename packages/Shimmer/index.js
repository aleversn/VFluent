import Shimmer from './src/index.vue'

Shimmer.install = function(Vue){
  Vue.component(Shimmer.name,Shimmer)
}

export default Shimmer;
