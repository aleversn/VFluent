import TextBox from './src/index.vue'

TextBox.install = function(Vue){
  Vue.component(TextBox.name,TextBox)
}

export default TextBox;
