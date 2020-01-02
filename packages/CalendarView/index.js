import CalendarView from './src/index.vue'

CalendarView.install = function(Vue){
  Vue.component(CalendarView.name,CalendarView)
}

export default CalendarView;
