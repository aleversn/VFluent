import ListView from './src/index.vue'

ListView.install = function(Vue){
  Vue.component(ListView.name,ListView)
}

export default ListView;
