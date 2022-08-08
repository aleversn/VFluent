import SwipeControl from './src/index.vue'

SwipeControl.install = function(Vue){
  Vue.component(SwipeControl.name,SwipeControl)
}

export default SwipeControl;
