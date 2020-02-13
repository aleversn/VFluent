import Image from './src/index.vue'

Image.install = function(Vue){
  Vue.component(Image.name,Image)
}

export default Image;
