import CalendarDatePicker from './src/index.vue'

CalendarDatePicker.install = function(Vue){
  Vue.component(CalendarDatePicker.name,CalendarDatePicker)
}

export default CalendarDatePicker;
