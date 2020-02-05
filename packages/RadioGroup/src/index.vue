<template>
  <div :class="'fv-'+$theme+'-radioGroup'">
    <label v-if="label" :class="[{inline:inline}]">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'FvRadioGroup',
  props:{
    theme:{
      type:String,
      default:"system"
    },
    value:{
      required:true
    },
    disabled:{
      type:Boolean,
      default:false
    },
    label:{
      type:String,
      default:""
    },
    inline:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {}
  },
  computed:{
    $theme() {
      if (this.theme=='system')
        return this.$fvGlobal.state.theme;
      return this.theme;
    }
  },
  methods:{
    change(val){
      this.$emit("change",val)
    }
  }
}
</script>
