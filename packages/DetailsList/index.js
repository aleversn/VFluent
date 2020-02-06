import DetailsList from './src/index.vue'

DetailsList.install = function(Vue){
  Vue.component(DetailsList.name,DetailsList)
}

export default DetailsList;
