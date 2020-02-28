import WebWindow from './src/index.vue'

WebWindow.install = function(Vue){
  Vue.component(WebWindow.name,WebWindow)
}

export default WebWindow;
