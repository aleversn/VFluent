import ColorPicker from './src/index.vue'

ColorPicker.install = function(Vue){
  Vue.component(ColorPicker.name,ColorPicker)
}

export default ColorPicker;
