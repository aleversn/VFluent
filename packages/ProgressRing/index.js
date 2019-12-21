import ProgressRing from './src/index.vue'

ProgressRing.install = function(Vue){
  Vue.component(ProgressRing.name,ProgressRing)
}

export default ProgressRing;
