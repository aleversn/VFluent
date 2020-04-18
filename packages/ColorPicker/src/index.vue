<template>
  <div :class="'fv-'+$theme+'-colorPicker'">
    <div ref="chooseBox" class="color-picker__choose_box" 
        @mousedown="onclick($event,clickBox) && moveable($event,'chooseBox',syncBoxButton)" :style="chooseStyle">
      <!-- Light Mask -->
      <div class="color_light"></div>
      <!-- Dark Mask -->
      <div class="color_dark"></div>
      <!-- Circle Button -->
      <div
        class="choose_button"
        ref="button"
        :style="chooseButtonStyle"
        @mousedown="moveable($event,'chooseBox',syncBoxButton)"
      ></div>
    </div>
    <div class="color-picker__slider_box">
      <div class="slider">
        <div ref="hueBox" @mousedown="onclick($event,clickHue) && moveable($event,'hueBox',syncHueButton)" class="hue_box">
          <div class="button" ref="hutButton" :style="hueButtonStyle" @mousedown="moveable($event,'hueBox',syncHueButton)"></div>
        </div>
        <div ref="alphaBox" @mousedown="onclick($event,clickAlpha) && moveable($event,'alphaBox',syncAlphaButton)" class="alpha_box" v-if="!hideAlpha">
          <div class="bar" :style="alphaBarStyle"></div>
          <div class="button" ref="alphaButton" :style="alphaButtonStyle" @mousedown="moveable($event,'alphaBox',syncAlphaButton)"></div>
        </div>
      </div>
      <div class="preview" v-if="!hidePreview">
        <div class="box">
          <div class="color" :style="previewColorStyle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import one from "onecolor";
export default {
  name: "FvColorPicker",
  data() {
    return {
      colorLock:false,
      clickLock:false,
      color: one("#f00"),
      chooseStyle: {
        backgroundColor: "#ff0000" //hex
      },
      chooseButtonStyle: {
        backgroundColor: "rgba(255,255,255,0.15)", //cssa
        left: "0%",
        top: "0%"
      },
      alphaBarStyle: {
        background:
          "linear-gradient(to right, transparent 0px, rgb(255, 0, 0) 100%)"
      },
      previewColorStyle: {
        background: "#fff"
      },
      hueButtonStyle:{
        left:"0%"
      },
      alphaButtonStyle:{
        left:"0%"
      }
    };
  },
  props: {
    theme: {
      type: String,
      default: "system"
    },
    value: {
      type: String,
      default: "#fff"
    },
    alpha: {
      type: Number,
      default: 1
    },
    hideAlpha:{
      type:Boolean,
      default:false
    },
    hidePreview:{
      type:Boolean,
      default:false
    },
    direction:{
      type:String,
      default:"horizon"
    }
  },
  computed: {
    $theme() {
      if (this.theme == "system") return this.$fvGlobal.state.theme;
      return this.theme;
    }
  },
  watch: {
    value: function(val) {
      if (!this.colorLock){
        this.color = one(val)
        this.sync()
      }
    },
    color: {
      handler: function(val) {
        this.colorLock=true;
        this.$emit("change",val);
        this.$emit("input", val.hex());
        this.$emit("update:alpha",val.alpha())
        setTimeout(() => {
          this.colorLock=false;
        }, 200);
      },
      deep: true
    }
  },
  mounted() {
    this.init();
    this.getBoxSize("hueBox");
  },
  methods: {
    /**
     * @summary init color
     */
    init() {
      this.color = one(this.value);
      this.syncBox();
      this.sync();
    },
    /**
     * @summary sync color
     */
    sync() {
      this.chooseButtonStyle = {
        left:this.color.saturation()*100+'%',
        top:(1-this.color.value())*100+'%',
        backgroundColor: this.color.alpha(0.15).cssa()
      };
      this.alphaBarStyle = {
        background: `linear-gradient(to right, transparent 0px, ${this.color.css()} 100%)`
      };
      this.previewColorStyle = {
        background: this.color.cssa()
      };
      this.chooseStyle={
        background: this.color.saturation(1).value(1).css()
      }
      this.alphaButtonStyle={
        left:this.color.alpha()*100+'%'
      }
      this.hueButtonStyle={
        left:this.color.hue()*100+'%'
      }
    },
    /**
     * @summary sync box style
     */
    syncBox() {
      this.chooseStyle = {
        backgroundColor: this.color.saturation(1).value(1).cssa()
      };
    },
    /**
     * @summary get vue ref element client size
     * @param refName {string} vue element ref name
     */
    getBoxSize(refName) {
      let el = this.$refs[refName];
      return {
        width: el.clientWidth,
        height: el.clientHeight
      };
    },
    /**
     * @summary move the button
     */
    moveable(evt, boxName, callback) {
      this.clickLock=true;
      let origin = {
        x: evt.clientX,
        y: evt.clientY
      };
      let box = this.getBoxSize(boxName);
      evt.target.ondragenter = event.preventDefault();
      evt.target.ondragover = event.preventDefault();
      let onmove = evt => {
        let xPercentage = (evt.clientX - origin.x) / box.width;
        let yPercentage = (evt.clientY - origin.y) / box.height;
        origin = {
          x: evt.clientX,
          y: evt.clientY
        };
        callback(xPercentage, yPercentage);
      };
      let leaveMove = () => {
        window.removeEventListener("mouseleave", leaveMove);
        window.removeEventListener("mousemove", onmove);
        window.removeEventListener("mouseup", leaveMove);
        setTimeout(()=>{
          this.clickLock=false
        },200)
      };
      window.addEventListener("mousemove", onmove);
      window.addEventListener("mouseleave", leaveMove);
      window.addEventListener("mouseup", leaveMove);
    },
    onclick(evt,callback){
      if (!this.clickLock){
        callback(evt.offsetX/evt.target.clientWidth,evt.offsetY/evt.target.clientHeight)
        return true;
      }
      return false;
    },
    clickBox(x,y){
      this.color= this.color.saturation(x).value(1-y)
      this.sync()
    },
    clickHue(x){
      this.color = this.color.hue(x)
      this.sync()
    },
    clickAlpha(x){
      this.color = this.color.alpha(x)
      this.sync()
    },
    syncBoxButton(x,y) {
      let left = this.percent(this.chooseButtonStyle.left);
      let top = this.percent(this.chooseButtonStyle.top);
      left += x;
      left = Math.max(Math.min(1, left), 0);
      top += y;
      top = Math.max(Math.min(1, top), 0);
      this.color = this.color.saturation(left).value(1 - top);
      this.sync()
    },
    syncHueButton(x) {
      let left = this.percent(this.hueButtonStyle.left);
      left += x;
      // 100%==0% max 359degree
      left = Math.max(Math.min(359/360, left), 0);
      this.color = this.color.hue(left)
      this.sync()
    },
    syncAlphaButton(x){
      let left = this.percent(this.alphaButtonStyle.left)
      left +=x;
      left = Math.max(Math.min(1, left), 0);
      this.color = this.color.alpha(left)
      this.sync()
    },
    /**
     * @summary percent to float
     * @parm str {string} percent 
     */
    percent(str) {
      let number = str || "0%";
      number = parseFloat(number.replace("%", "")) / 100;
      return number;
    }
  }
};
</script>
