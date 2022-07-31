import RevealContainer from './src/index.vue'

RevealContainer.install = function(Vue){
  Vue.component(RevealContainer.name,RevealContainer)
}

export default RevealContainer;
