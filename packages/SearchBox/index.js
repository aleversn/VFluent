import SearchBox from './src/index.vue'

SearchBox.install = function(Vue){
  Vue.component(SearchBox.name,SearchBox)
}

export default SearchBox;
