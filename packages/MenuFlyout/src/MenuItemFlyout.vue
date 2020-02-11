<template>
  <div :class="['fv-'+$theme+'-menuItemFlyout']" @click="click">
    <button class="button">
      <i v-if="item.checkable" class="ms-Icon" :class="[{'ms-Icon--CheckMark':item.checked}]"></i>
      <i v-if="icon" class="ms-Icon" :class="['ms-Icon--'+icon]"></i>
      {{label?label:"MenuItem"}}
    </button>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import checkbox from './checkbox.js'

export default {
  name:'FvMenuItemFlyout',
  mixins:[checkbox],
  props:{
    theme:{
      default:'system',
      type:String
    },
    label:{},
    icon:{}
  },
  data(){
    return {}
  },
  computed:{
    $theme(){
      if (this.theme=="system"){
        if (this.parent) return this.parent.$theme;
        return this.$fvGlobal.state.theme;
      }
      return this.theme
    },
  },
  methods:{
  }
}
</script>