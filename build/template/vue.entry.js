/**
 * @param ComponentName
 */

module.exports=`import {{ComponentName}} from './src/index.vue'

{{ComponentName}}.install = function(Vue){
  Vue.component({{ComponentName}}.name,{{ComponentName}})
}

export default {{ComponentName}};`