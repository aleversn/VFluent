import Drawer from './src/index.vue'

Drawer.install = function(Vue){
  Vue.component(Drawer.name,Drawer)
}

export default Drawer;
