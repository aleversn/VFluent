<template>
  <div :class="['fv-'+$theme+'-menuSubFlyout',{actived:callout.show}]" @click="click">
    <span v-if="spilt" class="label">
      <i v-if="item.checkable" class="ms-Icon" :class="[{'ms-Icon--CheckMark':item.checked}]"></i>
      <i v-if="icon" class="ms-Icon" :class="['ms-Icon--'+icon]"></i>
      {{label?label:"SubMenu"}}
    </span>
    <div class="button-box" :class="[{'full':!spilt}]">
      <span v-if="spilt" class="divider"></span>
      <fv-callout
        :visible.sync="callout.show"
        :position="position"
        :beak="0"
        :focusTrap="callout.focusTrap"
        effect="hover"
        :popperStyle="{padding:0,minWidth:'160px'}"
        :popperClass="['fv-'+$theme+'-menuFlyoutPopper']"
        :theme="$theme"
      >
        <button class="button">
          <i class="ms-Icon ms-Icon--ChevronRight icon-right"></i>
          <span v-if="!spilt" class="label">
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
    <div class="bg"></div>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import checkbox from './checkbox.js'

export default {
  name: "FvMenuSubFlyout",
  mixins:[checkbox],
  props: {
    theme: {
      type: String,
      default: "system"
    },
    label: {
      type: String,
    },
    spilt: {
      type: Boolean,
      default: false
    },
    icon:{
    },
    disabled:{
      type:Boolean,
      default:false
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
  computed: {
    $theme() {
      if (this.theme == "system") {
        if (this.parent) return this.parent.$theme;
        return this.$fvGlobal.state.theme;
      }
      return this.theme;
    }
  },
  methods:{
  }
};
</script>

<style>
</style>