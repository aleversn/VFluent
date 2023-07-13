import Expander from './src/index.vue'

Expander.install = function(Vue){
  Vue.component(Expander.name,Expander)
}

export default Expander;
