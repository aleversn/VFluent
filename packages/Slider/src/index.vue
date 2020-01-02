<template>
  <div :class="['fv-'+$theme+'-slider',{active:isActive},{vertical:vertical}]" ref="slider">
    <div class="fv-slider__bar" :class="[{vertical:vertical},{disabled:disabled}]" ref="bar">
      <template v-if="scale">
        <div
          class="fv-slider__scale-up"
          v-for="index in (maxinum-mininum)/scaleUnit()-1"
          :key="'scale:'+index"
          :style="scaleStyle(index,true)"
        ></div>
        <div
          class="fv-slider__scale-down"
          v-for="index in (maxinum-mininum)/scaleUnit()-1"
          :key="'scale-d:'+index"
          :style="scaleStyle(index,false)"
        ></div>
      </template>
      <div class="fv-slider__bar-bg"></div>
      <div
        class="fv-slider__progress"
        ref="progress"
        :style="progressStyle"
        :class="[{anime:rejust}]"
      ></div>
      <div
        class="fv-slider__button ms-Icon"
        :class="[`ms-Icon--${icon}`,{disabled:disabled},{anime:rejust}]"
        :style="buttonStyle"
        ref="button"
        @mousedown="moveable"
      ></div>
    </div>
    <div class="fv-slider__label" :class="{vertical:vertical}" v-if="showLabel">
      <slot :value="getValue(progress,mininum,maxinum)"></slot>
    </div>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
export default {
  name: "FvSlider",
  data() {
    return {
      progress: 0,
      isActive: false,
      button: {
        width: 0
      },
      bar: {
        width: 0,
        height: 0
      },
      rejust: false
    };
  },
  props: {
    theme: {
      type: String,
      default: "system"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: Number,
      default: 1
    },
    maxinum: {
      type: Number,
      default: 100
    },
    mininum: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: "SliderThumb"
      // default:"StatusCircleOuter"
    },
    vertical: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    scale: {
      type:[Boolean,Number],
      default: false
    },
    color:{
      type:String
    }
  },
  computed: {
    $theme() {
      if (this.theme === "system") return this.$fvGlobal.state.theme;
      return this.theme;
    },
    range() {
      if (this.vertical) {
        return this.bar.height;
      } else {
        return this.bar.width;
      }
    },
    buttonStyle() {
      let color=this.color
      if (this.vertical) {
        return {
          top: this.progress + "px",
          transform: "rotate(90deg)",
          left: "-10px",
          color
        };
      } else {
        return {
          left: this.progress + "px",
          top: "-10px",
          color
        };
      }
    },
    progressStyle() {
      let color=this.color
      if (this.vertical) {
        return {
          height: this.progress + this.button.width / 2 + "px",
          backgroundColor:color
        };
      } else {
        return {
          width: this.progress + this.button.width / 2 + "px",
          backgroundColor:color
        };
      }
    },
    unitToPx() {
      return this.range / (this.maxinum - this.mininum);
    }
  },
  watch: {
    value(val) {
      // sync progress
      if (!this.isActive) this.setProgress(val, this.mininum, this.maxinum);
    },
    progress(val) {
      this.$emit('change',this.getValue(val,this.mininum,this.maxinum))
      // sync Value
      if (this.isActive) {
        this.setValue(val, this.mininum, this.maxinum);
      }
    }
  },
  mounted() {
    // set client height/width
    this.resize();
    let MutationObserver = window.MutationObserver ||
                      window.WebKitMutationObserver || 
                      window.MozMutationObserver
    this.observer = new MutationObserver(this.resize)
    this.observer.observe(this.$refs.slider,{
      attributes: true, 
      attributeFilter: ['style'], 
      attributeOldValue: true
    })
    window.addEventListener("resize", this.resize);
  },
  methods: {
    scaleUnit(){
      let unit = !this.scale || this.scale==true?this.unit:this.scale;
      return unit;
    },
    scaleStyle(index,up) {
      let unit = this.scaleUnit();
      return this.vertical
        ? {
            left: up?"7px":"-7px",
            top: index * unit * this.unitToPx + "px",
            height: "1px",
            width: "5px"
          }
        : {
            top: up?"7px":"-7px",
            left: index * unit * this.unitToPx + "px",
            height: "5px",
            width: "1px"
          };
    },
    resize() {
      this.button.width = this.$refs.button.clientWidth;
      this.bar.width = this.$refs.bar.clientWidth;
      this.bar.height = this.$refs.bar.clientHeight;
      this.setProgress(this.value, this.mininum, this.maxinum);
    },
    moveable(evt) {
      evt.target.ondragenter = event.preventDefault();
      evt.target.ondragover = event.preventDefault();
      this.$emit('click')
      if (this.isActive || this.disabled) return;
      this.isActive = true;
      let origin = this.vertical ? evt.clientY : evt.clientX;
      let move = evt => {
        let x = this.vertical ? evt.clientY : evt.clientX;
        this.move(x, origin);
        origin = x;
      };
      let removeMove = () => {
        this.isActive = false;
        this.rejustProgress();
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", removeMove);
        window.removeEventListener("mouseleave", removeMove);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseleave", removeMove);
      window.addEventListener("mouseup", removeMove);
    },
    setProgress(value, min, max) {
      let width = this.range;
      value = Math.max(min, value);
      value = Math.min(max, value);
      value -= min;
      this.progress = (value * width) / (max - min) - this.button.width / 2;
    },
    setValue(value, min, max) {
      let width = this.range;
      let val = min + (value + this.button.width / 2) / (width / (max - min));
      this.$emit("input", Math.round(val));
    },
    getValue(value, min, max) {
      let width = this.range;
      let val = min + (value + this.button.width / 2) / (width / (max - min));
      return Math.round(val);
    },
    rejustProgress() {
      if (this.rejust) return;
      this.rejust = true;
      this.isActive = true;
      let value = this.getValue(this.progress, this.mininum, this.maxinum);
      if (value < this.maxinum)
        value =
          Math.round((value - this.mininum) / this.unit) * this.unit +
          this.mininum;
      else value = this.maxinum;
      this.setProgress(value, this.mininum, this.maxinum);
      setTimeout(() => {
        this.rejust = false;
        this.isActive = false;
      }, 300);
    },
    move(x, origin) {
      let val = this.progress + (x - origin);
      val = Math.max(val, -this.button.width / 2);
      val = Math.min(val, this.range - this.button.width / 2);
      this.progress = val;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    this.observer.disconnect();
  }
};
</script>
