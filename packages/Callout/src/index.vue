<script>
import Vue from "vue";
export default {
  name: "FvCallout",
  props: {
    visible: {
      default: false
    },
    theme: {
      type: String,
      default: "system"
    },
    disabled: {
      default: false
    },
    cover: {
      default: false
    },
    space: {
      type: Number,
      default: 0
    },
    beak: {
      type: Number,
      default: 10
    },
    position: {
      type: String,
      default: "bottomCenter"
    },
    lockScroll: {
      default: false
    },
    focusTrap: {
      default: false
    },
    delayClose: {
      type:Number,
      default: 0
    },
    effect: {
      type: String,
      default: "click"
    }
  },
  data() {
    return {
      slotName: ["header", "main", "footer"],
      isFirstOpen: false,
      window: {},
      targetEvent: {},
      popperEvent: {},
      timeout:{
        close:null
      }
    };
  },
  watch: {
    visible(val) {
      if (this._popper.show != val) this._popper.show = val;
    },
    $theme(val) {
      this._popper.theme = val;
    },
    "_popper.show"(val) {
      this.$emit("update:visible", val);
      if (val) {
        this.adjustPopperPosition(this.position);
        if (this.delayClose>0){
          clearTimeout(this.timeout.close)
          this.timeout.close=setTimeout(()=>{
            this._popper.show=false;
          },this.delayClose)
        }
      }
    },
    disabled(val){
      if (val) this.init()
    }
  },
  computed: {
    $theme() {
      if (this.theme == "system") return this.$fvGlobal.state.theme;
      return this.theme;
    }
  },
  methods: {
    getFirstDefaultSlotElement() {
      let vNode = this.$slots.default;
      if (!Array.isArray(vNode)) return null;
      for (let index in vNode) {
        let node = vNode[index];
        if (node.tag != undefined) {
          if (this.slotName.indexOf(node.tag) == -1) {
            return node;
          }
        }
      }
      return null;
    },
    slot() {
      let vNode = this.$slots.default;
      let header = this.$slots.header || [];
      let main = this.$slots.main || [];
      let footer = this.$slots.footer || [];
      if (!Array.isArray(vNode)) return null;
      for (let index in vNode) {
        let node = vNode[index];
        if (node.tag == "header") {
          header.push(node.children);
        } else if (node.tag == "main") {
          main.push(node.children);
        } else if (node.tag == "footer") {
          footer.push(node.children);
        }
      }
      return {
        header,
        main,
        footer
      };
    },
    initPopper() {
      if (this.effect!='always')
        this._popper.show = this.visible;
      this._popper.nodes = this.slot();
      this._popper.theme = this.$theme;
      this._popper.$nextTick(() => {
        this.adjustPopperPosition(this.position);
      });
    },
    adjustPopperPosition(position) {
      if (this.disabled || this.$el.clientHeight==0 || this.$el.clientWidth==0) {    
        this._popper.show=false;
        return;
      }
      this.setPopperPosition(position);
      this._popper.$nextTick(() => {
        if (this.isOutBody(this._popper.$el)) {
          this.setPopperPosition(this.reversePosition(position));
          this._popper.$nextTick(() => {
            if (this.isOutBody(this._popper.$el)) {
              if (this.cover) this.setPopperPosition("topLeft");
              else this.setPopperPosition("bottomLeft");
            }
          });
        }
      });
    },
    reversePosition(position) {
      if (/^left/.test(position)) return position.replace(/^left/, "right");
      else if (/^right/.test(position)) {
        return position.replace(/^right/, "left");
      } else if (/^top/.test(position)) {
        return position.replace(/^top/, "bottom");
      } else return position.replace(/^bottom/, "top");
    },
    setPopperPosition(position) {
      let callout = this._popper.style.callout;
      let beak = this._popper.style.beak;
      let target = this.getOffsetBodyXY(this.$el)
      if (this.beak < 10 || this.cover) {
        this.$set(beak, "display", "none");
      } else {
        this.$set(beak,"display","block")
        this.$set(beak, "width", this.beak + "px");
        this.$set(beak, "height", this.beak + "px");
      }
      if (!this.cover) {
        if (/^(bottom|top)/.test(position)) {
          if (/^bottom/.test(position)) {
            this.$set(
              callout,
              "top",
                target.top +
                this.$el.clientHeight +
                this.space +
                this.beak +
                "px"
            );
            this.$set(beak, "top", "0");
          } else {
            this.$set(
              callout,
              "top",
              target.top -
                this._popper.$el.clientHeight -
                this.space -
                this.beak +
                "px"
            );
            this.$set(beak, "top", "100%");
          }
          let width = Math.round(
            (this._popper.$el.clientWidth - this.$el.clientWidth) / 2
          );
          if (/Center$/.test(position)) {
            this.$set(callout, "left", target.left - width + "px");
            this.$set(beak, "left", "50%");
          } else if (/Left$/.test(position)) {
            this.$set(callout, "left", target.left + "px");
            this.$set(beak, "left", "calc( 0% + " + (this.beak + 10) + "px)");
          } else {
            this.$set(callout, "left", target.left - width * 2 + "px");
            this.$set(beak, "left", "calc( 100% - " + (this.beak + 10) + "px");
          }
        } else if (/^(left|right)/.test(position)) {
          if (/^left/.test(position)) {
            this.$set(
              callout,
              "left",
              target.left -
                this._popper.$el.clientWidth -
                this.beak -
                this.space +
                "px"
            );
            this.$set(beak, "left", "100%");
          } else if (/^right/.test(position)) {
            this.$set(
              callout,
              "left",
              target.left +
                this.$el.clientWidth +
                this.space +
                this.beak +
                "px"
            );
            this.$set(beak, "left", "0");
          }
          let height = Math.round(
            (this._popper.$el.clientHeight - this.$el.clientHeight) / 2
          );
          if (/Center$/.test(position)) {
            this.$set(callout, "top", target.top - height + "px");
            this.$set(beak, "top", "50%");
          } else if (/Top$/.test(position)) {
            this.$set(callout, "top", target.top + "px");
            this.$set(beak, "top", this.beak + "px");
          } else {
            this.$set(callout, "top", target.top - height * 2 + "px");
            this.$set(beak, "top", "calc(100% - " + this.beak + "px");
          }
        }
      } else {
        // cover
        if (/^(bottom|top)/.test(position)) {
          if (/^bottom/.test(position)) {
            this.$set(
              callout,
              "top",
              target.top +
                this.$el.clientHeight -
                this._popper.$el.clientHeight +
                "px"
            );
          } else {
            this.$set(callout, "top", target.top + "px");
          }
          let width = Math.round(
            (this._popper.$el.clientWidth - this.$el.clientWidth) / 2
          );
          if (/Center$/.test(position)) {
            this.$set(callout, "left", target.left - width + "px");
          } else if (/Left$/.test(position)) {
            this.$set(callout, "left", target.left + "px");
          } else {
            this.$set(callout, "left", target.left - width * 2 + "px");
          }
        } else if (/^(left|right)/.test(position)) {
          if (/^left/.test(position)) {
            this.$set(callout, "left", target.left + "px");
          } else if (/^right/.test(position)) {
            this.$set(
              callout,
              "left",
              target.left +
                this.$el.offsetWidth -
                this._popper.$el.clientWidth +
                "px"
            );
          }
          let height = Math.round(
            (this._popper.$el.clientHeight - this.$el.clientHeight) / 2
          );
          if (/Center$/.test(position)) {
            this.$set(callout, "top", target.top - height + "px");
          } else if (/Top$/.test(position)) {
            this.$set(callout, "top", target.top + "px");
          } else {
            this.$set(callout, "top", target.top - height * 2 + "px");
          }
        }
      }
      return this.isOutBody(this._popper.$el);
    },
    isOutBody(el) {
      let body = document.body;
      let target = this.getOffsetBodyXY(el)
      let maxHeight = Math.max(body.offsetHeight, window.innerHeight);
      let maxWidth = Math.max(body.offsetWidth, window.innerWidth);
      if (
        target.top < 0 ||
        target.left < 0 ||
        target.top + el.clientHeight > maxHeight ||
        target.left + el.clientWidth > maxWidth
      ) {
        return true;
      }
      return false;
    },
    initWindowEvent() {
      if (this.disabled) return;
      this.window = {
        resize: () => {
          this.adjustPopperPosition(this.position);
        },
        scroll: () => {
          if (!this.lockScroll) {
            this._popper.show = false;
          } else this.adjustPopperPosition(this.position);
        },
        click: evt => {
          let isOutSide = el => {
            let parent = el;
            while (parent) {
              if (parent == this._popper.$el || parent == this.$el) {
                return false;
              }
              parent = parent.parentNode;
            }
            return true;
          };
          if (!this.focusTrap && isOutSide(evt.target)) {
            this._popper.show = false;
          }
        }
      };
    },
    initTargetEvent(){
      if (this.effect==="click"){
        this.targetEvent.click=()=>{
          this._popper.show^=true;
        }
      }else if (this.effect==="hover"){
        this.targetEvent.mouseenter=()=>{
          this._popper.show=true;
        }
        this.targetEvent.mouseleave=()=>{
          this._popper.show=false;
        },
        this.popperEvent.mouseenter=()=>{
          this._popper.show=true;
        },
        this.popperEvent.mouseleave=()=>{
          this._popper.show=false;
        }
      }else if (this.effect==="always"){
        this._popper.show=true;
      }
    },
    init(){
      if (this.disabled){
        this._popper.show=false;
        return;
      }
      this.initWindowEvent();
      this.initTargetEvent();
      for (let key in this.window) {
        window.addEventListener(key, this.window[key]);
      }
      for (let key in this.targetEvent) {
        this.$el.addEventListener(key, this.targetEvent[key]);
      }
      for (let key in this.popperEvent) {
        this._popper.$el.addEventListener(key, this.popperEvent[key]);
      }
      this.initPopper();
      if (this.delayClose>0 && this._popper.show){
        this.timeout.close=setTimeout(()=>{
          this._popper.show=false;
        },this.delayClose);
      }
    },
    getOffsetBodyXY(el){
      let xy = {top:0,left:0}
      while (el && el.nodeName && el.nodeName.toLowerCase()!='body'){
        xy.top+=el.offsetTop;
        xy.left+=el.offsetLeft;
        el = el.offsetParent;
      }
      return xy;
    }
  },
  mounted() {
    this.init()
  },
  render() {
    let target = this.getFirstDefaultSlotElement();
    return target || <div></div>;
  },
  beforeMount() {},
  beforeCreate() {
    this._popper = new Vue({
      data: {
        nodes: {
          header: [],
          main: [],
          footer: []
        },
        style: {
          callout: {},
          beak: {}
        },
        theme: "light",
        show: true,
        open: true,
        width: 0,
        height: 0,
        position: ""
      },
      render() {
        return (
          <transition name="fv-callout-fade">
            <div
              style={this.style.callout}
              class={"fv-" + this.theme + "-callout"}
              v-show={this.show}
            >
              <div class="bg"></div>
              <div class="beak" style={this.style.beak}></div>
              <div class="header" v-show={this.nodes.header.length}>
                {this.nodes.header}
              </div>
              <div class="main" v-show={this.nodes.main.length}>
                {this.nodes.main}
              </div>
              <div class="footer" v-show={this.nodes.footer.length}>
                {this.nodes.footer}
              </div>
            </div>
          </transition>
        );
      }
    }).$mount();
    document.body.append(this._popper.$el);
  },
  beforeDestroy() {
    this._popper.$destroy();
    for (let key in this.timeout){
      clearTimeout(this.timeout[key])
    }
    for (let key in this.window) {
      window.removeEventListener(key, this.window[key]);
    }
    for (let key in this.targetEvent) {
      this.$el.removeEventListener(key, this.targetEvent[key]);
    }
    for (let key in this.popperEvent) {
      this._popper.$el.removeEventListener(key, this.popperEvent[key]);
    }
    // warning: remove dom / memory lack [2020 2 2]
    this._popper.$el.parentNode.removeChild(this._popper.$el);
  }
};
</script>
