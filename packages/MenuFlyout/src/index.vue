<template>
  <div :class="['fv-'+$theme+'-menuFlyout',{actived:callout.show},{disabled:disabled}]" :style="flyout">
    <fv-callout
      :visible.sync="callout.show"
      :beak="beak"
      :focusTrap="callout.focusTrap"
      :popperStyle="{padding:'0px',minWidth:'160px',backgroundColor:backgroundColor,color:color}"
      :position="position"
      :popperClass="'fv-'+$theme+'-menuFlyoutPopper'"
      :theme="$theme"
      :disabled="disabled"
    >
      <button class="fv-menuFlyout__button" :style="{borderColor:borderColor}">
        <span>{{label?label:"Click the Menu"}}</span>
        <i class="ms-Icon ms-Icon--ChevronDown"></i>
      </button>
      <main>
        <slot></slot>
      </main>
    </fv-callout>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
export default {
  name: "FvMenuFlyout",
  props: {
    theme: {
      type: String,
      default: "system"
    },
    label: {
      type: String
    },
    position:{
      type:String,
      default:"bottomLeft"
    },
    beak:{
      type:Number,
      default:0
    },
    checkable:{
      default:false
    },
    disabled:{
      type:Boolean,
      default:false
    },
    backgroundColor:{},
    color:{},
    borderColor:{}
  },
  data() {
    return {
      callout: {
        show: false,
        focusTrap:false,
      }
    };
  },
  mounted() {},
  computed: {
    $theme() {
      if (this.theme == "system") return this.$fvGlobal.state.theme;
      return this.theme;
    },
    flyout(){
      return {
        backgroundColor:this.backgroundColor,
        color:this.color
      }
    }
  },
  methods:{
    show(){
      this.callout.focusTrap=true;
      setTimeout(()=>{
        this.callout.focusTrap=false;
      },100)
    }
  }
};
</script>
