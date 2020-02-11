import CommandBar from './src/index.vue'

CommandBar.install = function(Vue){
  Vue.component(CommandBar.name,CommandBar)
}

export default CommandBar;
