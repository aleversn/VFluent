import Img from './src/index.vue'

Img.install = function(Vue){
  Vue.component(Img.name,Img)
}

export default Img;
