import ImgBox from './src/index.vue'

ImgBox.install = function(Vue){
  Vue.component(ImgBox.name,ImgBox)
}

export default ImgBox;
