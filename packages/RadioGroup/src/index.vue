<template>
  <div :class="'fv-'+$theme+'-radioGroup'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'FvRadioGroup',
  data(){
    return {}
  },
  props:{
    theme:{
      type:String,
      default:"system"
    }
  },
  computed:{
    $theme() {
      if (this.theme=='system')
        return this.$fvGlobal.state.theme;
      return this.theme;
    }
  },
  mounted(){
    
  }
}
</script>
