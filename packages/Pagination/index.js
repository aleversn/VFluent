import Pagination from './src/index.vue'

Pagination.install = function(Vue){
  Vue.component(Pagination.name,Pagination)
}

export default Pagination;
