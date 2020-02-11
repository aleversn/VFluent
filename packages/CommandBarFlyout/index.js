import CommandBarFlyout from './src/index.vue'

CommandBarFlyout.install = function(Vue){
  Vue.component(CommandBarFlyout.name,CommandBarFlyout)
}

export default CommandBarFlyout;
