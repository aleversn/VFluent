let styleEmbedding=(el,styleName)=>{
  if (el[styleName]){
    return el[styleName]
  }else{
    if (el.parent){
      if (el.parent['$'+styleName])
        return el.parent['$'+styleName]()
      else
        return el.parent[styleName]
    }
  }
  return undefined
}

export default {
  props: {
    theme: {
      default: "system",
      type: String
    },
    value: {},
    disabled: {
      default: false,
      type: Boolean
    },
    backgroundColor:{},
    color:{},
  },
  data() {
    return {
      clickEvent: [],
      item: {
        hover:false,
      }
    };
  },
  computed: {
    $theme() {
      if (this.theme == "system") {
        if (this.parent) return this.parent.$theme;
        return this.$fvGlobal.state.theme;
      }
      return this.theme;
    },
  },
  beforeCreate() {
    let component = this.$parent;
    while (component) {
      if (component.$options.name === "FvOutsidePopper") {
        this.window = component;
        break;
      }
      component = component.$parent;
    }
    component = this.window.target;
    while (component) {
      if (
        component.$options.name === "FvMenuSubFlyout" ||
        component.$options.name === "FvMenuFlyout"
      ) {
        this.parent = component;
        break;
      }
      component = component.$parent;
    }
  },
  mounted() {
    this.clickEvent.push(() => {
      if (this.item && this.item.checkable) {
        this.item.checked ^= true;
        this.show();
      } else {
        if (!this.callout) {
          if (this.window) {
            if (this.window.target.popperEvent.mouseleave)
              this.window.target.popperEvent.mouseleave();
            else this.window.show ^= true;
          }
        } else {
          this.show();
        }
      }
    });
  },
  methods: {
    $backgroundColor(){
      return styleEmbedding(this,'backgroundColor')
    },
    $color(){
      return styleEmbedding(this,'color')
    },
    show() {
      this.window.show = true;
      if (this.callout) {
        this.callout.focusTrap = true;
        setTimeout(() => {
          this.callout.focusTrap = false;
        }, 100);
      }
      if (this.parent.show) {
        this.parent.show();
      }
    },
    click() {
      if (this.disabled) return;
      for (let index in this.clickEvent) {
        this.clickEvent[index]();
      }
      this.$emit("click");
    }
  }
};
