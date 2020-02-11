import TreeView from './src/index.vue'

TreeView.install = function(Vue){
  Vue.component(TreeView.name,TreeView)
}

export default TreeView;
