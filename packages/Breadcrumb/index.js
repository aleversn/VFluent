import Breadcrumb from './src/index.vue'

Breadcrumb.install = function(Vue){
  Vue.component(Breadcrumb.name,Breadcrumb)
}

export default Breadcrumb;
