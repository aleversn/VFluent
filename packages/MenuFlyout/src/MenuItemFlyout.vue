<template>
  <div :class="['fv-'+$theme+'-menuItemFlyout',{disabled:disabled}]" @click="click">
    <button class="fv-menuItemFlyout__button">
      <i v-if="item.checkable" class="ms-Icon" :class="[{'ms-Icon--CheckMark':item.checked}]"></i>
      <i v-if="icon" class="ms-Icon fv-menuItemFlyout__icon" :class="['ms-Icon--'+icon]"></i>
      {{label?label:"MenuItem"}}
    </button>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import checkbox from './mixins/checkbox.js'
import item from './mixins/item.js'

export default {
  name:'FvMenuItemFlyout',
  mixins:[item,checkbox],
  props:{
    label:{},
    icon:{}
  },
  data(){
    return {
    }
  },
  computed:{
  },
  methods:{
  },
  mounted(){
  }
}
</script>