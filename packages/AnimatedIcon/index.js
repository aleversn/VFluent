import AnimatedIcon from './src/index.vue'

AnimatedIcon.install = function(Vue){
  Vue.component(AnimatedIcon.name,AnimatedIcon)
}

export default AnimatedIcon;
