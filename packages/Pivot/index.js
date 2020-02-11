import Pivot from './src/index.vue'

Pivot.install = function(Vue){
  Vue.component(Pivot.name,Pivot)
}

export default Pivot;
