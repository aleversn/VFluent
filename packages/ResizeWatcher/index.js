import ResizeWatcher from './src/index.vue'

ResizeWatcher.install = function(Vue){
  Vue.component(ResizeWatcher.name,ResizeWatcher)
}

export default ResizeWatcher;
