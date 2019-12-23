import FlipView from './src/index.vue'

FlipView.install = function(Vue){
  Vue.component(FlipView.name,FlipView)
}

export default FlipView;
