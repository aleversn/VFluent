<template>
  <div :class="['fv-'+$theme+'-radio',{icon:this.icon || this.image},{actived:isActived},{disabled:disabled}]" @click="click" :style="style.radio">
      <span ref="button" class="button" :style="style.button" :class="{actived:isActived}" ></span>
      <span class="label">
        <template v-if="image">
          <img :src="isActived?activeImage?activeImage:image:image" />
        </template>
        <i v-else-if="icon" class="icon ms-Icon" :class="'ms-Icon--'+this.icon"></i>
        <slot></slot>
      </span>
  </div>
</template>

<script>
export default {
  name:'FvRadio',
  data(){
    return {
      style:{
        radio:{
        },
        button:{
        }
      }
    }
  },
  props:{
    theme:{
      type:String,
      default:"system"
    },
    value:{
    },
    label:{
      required:true,
    },
    icon:{
      type:String,
      default:null
    },
    image:{
      type:String,
      default:null
    },
    activeImage:{
      type:String,
      default:null
    },
    disabled:{
      type:Boolean,
      default:false
    },
  },
  computed:{
    $theme() {
      if (this.theme=='system')
        return this.$fvGlobal.state.theme;
      return this.theme;
    },
    isActived(){
      return !this.disabled && this.value==this.label;
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
    },
    click(){
      if (this.disabled) return;
      this.$emit("input",this.label)
      if (this.isActived){
        this.$emit("actived")
      }
      this.$emit("click");
    }
  }
}
</script>
