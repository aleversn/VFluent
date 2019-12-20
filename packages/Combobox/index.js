import Combobox from './src/index.vue'

Combobox.install = function(Vue){
  Vue.component(Combobox.name,Combobox)
}

export default Combobox;
