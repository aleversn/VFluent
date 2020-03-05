import TimePicker from './src/index.vue'

TimePicker.install = function(Vue){
  Vue.component(TimePicker.name,TimePicker)
}

export default TimePicker;
