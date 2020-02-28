<template>
  <div :class="['fv-'+$theme+'-menuSubFlyout',{actived:callout.show},{disabled:disabled}]">
    <span v-if="spilt" class="fv-menuSubFlyout__label" @click="click">
      <i v-if="item.checkable" class="ms-Icon" :class="[{'ms-Icon--CheckMark':item.checked}]"></i>
      <i v-if="icon" class="ms-Icon" :class="['ms-Icon--'+icon]"></i>
      {{label?label:"SubMenu"}}
    </span>
    <div class="fv-menuSubFlyout__button-box" :class="[{'fv-menuSubFlyout__full':!spilt}]">
      <span v-if="spilt" class="fv-menuSubFlyout__divider"></span>
      <fv-callout
        :visible.sync="callout.show"
        :position="position"
        :beak="-1"
        :focusTrap="callout.focusTrap"
        effect="hover"
        :popperStyle="{padding:0,minWidth:'200px',backgroundColor:$backgroundColor(),color:$color()}"
        :popperClass="['fv-'+$theme+'-menuFlyoutPopper']"
        :theme="$theme"
        :disabled="disabled"
      >
        <button class="fv-menuSubFlyout__button">
          <i class="ms-Icon ms-Icon--ChevronRight fv-menuSubFlyout__icon-right"></i>
          <span v-if="!spilt" class="fv-menuSubFlyout__label" @click="click">
            <i v-if="item.checkable" class="ms-Icon" :class="[{'ms-Icon--CheckMark':item.checked}]"></i>
            <i v-if="icon" class="ms-Icon" :class="['ms-Icon--'+icon]"></i>
            {{label?label:"SubMenu"}}
          </span>
        </button>
        <main>
          <slot></slot>
        </main>
      </fv-callout>
    </div>
    <div class="fv-menuSuyFlyout__bg"></div>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import checkbox from './mixins/checkbox.js'
import item from './mixins/item.js'


export default {
  name: "FvMenuSubFlyout",
  mixins:[item,checkbox],
  props: {
    label: {
      type: String,
    },
    spilt: {
      type: Boolean,
      default: false
    },
    icon:{
    },
    position:{
      default:'rightTop',
      type:String
    }
  },
  data(){
    return {
      callout: {
        show: false,
        focusTrap:false,
      },
    };
  },
  methods:{
  },
  watch:{
    "window.show"(val){
      if (!val){
        this.callout.show=false;
      }
    }
  }
};
</script>

<style>
</style>