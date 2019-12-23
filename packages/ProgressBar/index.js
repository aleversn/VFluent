import ProgressBar from './src/index.vue'

ProgressBar.install = function(Vue){
  Vue.component(ProgressBar.name,ProgressBar)
}

export default ProgressBar;
