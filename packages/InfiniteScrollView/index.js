import InfiniteScrollView from './src/index.vue'

InfiniteScrollView.install = function(Vue){
  Vue.component(InfiniteScrollView.name,InfiniteScrollView)
}

export default InfiniteScrollView;
