import RatingControl from './src/index.vue'

RatingControl.install = function(Vue){
  Vue.component(RatingControl.name,RatingControl)
}

export default RatingControl;
