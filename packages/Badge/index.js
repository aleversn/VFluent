import Badge from './src/index.vue'

Badge.install = function(Vue){
  Vue.component(Badge.name,Badge)
}

export default Badge;
