import ScrollStory from './src/index.vue'

ScrollStory.install = function(Vue){
  Vue.component(ScrollStory.name,ScrollStory)
}

export default ScrollStory;
