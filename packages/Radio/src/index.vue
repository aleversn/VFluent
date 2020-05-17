<template>
  <div :class="['fv-'+$theme+'-radio',{icon:this.icon || this.image},{actived:isActived},{disabled:isDisabled}]" @click="click" :style="style.radio">
      <input type="radio" ref="button" class="button" :style="style.button" :class="[{actived:isActived},{disabled:isDisabled}]" />
      <label class="label">
        <template v-if="image">
          <img :src="isActived?activeImage?activeImage:image:image" />
        </template>
        <i v-else-if="icon" class="icon ms-Icon" :class="'ms-Icon--'+this.icon"></i>
        <slot></slot>
      </label>
  </div>
</template>

<script>
export default {
  name:'FvRadio',
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
  computed:{
    $theme() {
      if (this.theme=='system'){
        if (this.isGroup)
          return this._group.$theme
        return this.$fvGlobal.state.theme;
      }
      return this.theme;
    },
    isActived(){
      // return !this.isDisabled && this.model==this.label;
      // [2020-5-13][fix] fix value display issue
      return this.model==this.label;
    },
    isGroup(){
      let parent = this.$parent;
      while (parent){
        if (parent.$options.name !='FvRadioGroup'){
          parent = parent.$parent;
        }else{
          this.setGroup(parent);
          return true;
        }
      }
      return false;
    },
    isDisabled(){
      return this.isGroup?this._group.disabled || this.disabled:this.disabled;
    },
    model:{
      get(){
        return this.isGroup?this._group.value:this.value
      },
      set(val){
        if (this.isGroup){
          this._group.$emit("input",val)
        }else{
          this.$emit("input",val);
        }
      }
    },
  },
  mounted(){
  },
  methods:{
    click(){
      if (this.isDisabled) return;
      if (!this.isGroup){
        this.$emit("input",this.label)
      }else{
        this._group.$emit("input",this.label)
        this._group.change(this.label)
      }
      if (this.isActived){
        this.$emit("actived")
      }
      this.$emit("click");
    },
    setGroup(parent){
      this._group = parent;
    }
  }
}
</script>
