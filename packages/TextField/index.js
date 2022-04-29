import TextField from './src/index.vue'

TextField.install = function(Vue){
  Vue.component(TextField.name,TextField)
}

export default TextField;
