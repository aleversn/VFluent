import Callout from './src/index.vue'

Callout.install = function(Vue){
  Vue.component(Callout.name,Callout)
}

export default Callout;
