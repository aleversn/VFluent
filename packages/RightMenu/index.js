import RightMenu from './src/index.vue'

RightMenu.install = function(Vue){
  Vue.component(RightMenu.name,RightMenu)
}

export default RightMenu;
