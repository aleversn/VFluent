/**
 * @param prefix
 * @param preFix
 * @param componentname
 * @param ComponentName
 */
module.exports=`<template>
  <div :class="'{{prefix}}-'+theme+'-{{componentname}}'">
    {{ComponentName}} TEMPLATE 
  </div>
</template>

<script>
export default {
  name:'{{preFix}}{{ComponentName}}',
  data(){
    return {}
  },
  computed:{
    theme(){
      return this.\${{prefix}}Global.state.theme
    }
  }
}
</script>`