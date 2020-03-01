import DatePicker from './src/index.vue'

DatePicker.install = function(Vue){
  Vue.component(DatePicker.name,DatePicker)
}

export default DatePicker;
