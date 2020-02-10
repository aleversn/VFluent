<template>
  <div :class="['fv-'+$theme+'-menuFlyout',{actived:callout.show}]">
    <fv-callout
      :visible.sync="callout.show"
      :beak="beak"
      :focusTrap="callout.focusTrap"
      :popperStyle="{padding:0,minWidth:'160px'}"
      :position="position"
      :popperClass="'fv-'+$theme+'-menuFlyoutPopper'"
      :theme="$theme"
    >
      <button class="button">
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
      default:2
    },
    checkable:{
      default:false
    },
    value:{}
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
