/**
 * @summary bridge for parent and children
 */
export default {
  props: {
    checkable: {
      default: false
    },
    checked: {
      default: false
    },
    value: {}
  },
  data() {
    return {
      item: {
        checkable: this.checkable,
        checked: this.checked
      },
      clickEvent: []
    };
  },
  watch: {
    checkable(val) {
      this.item.checkable = val;
    },
    "item.checkable"(val) {
      this.$emit("update:checkable", val);
    },
    checked(val) {
      this.item.checked = val;
    },
    "item.checked"(val) {
      this.$emit("update:checked", val);
    }
  },
  beforeCreate(){
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
        this.parent = component
        break;
      }
      component = component.$parent;
    }
  },
  mounted() {
    if (this.parent){
      if (!this.checkable){
        if (this.parent.item){
          this.item.checkable=this.parent.item.checkable
        }else{
          this.item.checkable=this.parent.checkable
        }
      }

    }
  },
  methods: {
    click() {
      if (this.item.checkable){
        this.item.checked^=true;
        this.show()
      }else{
        if (this.window){
          if (this.window.target.popperEvent.mouseleave)
            this.window.target.popperEvent.mouseleave()
          else
            this.window.show^=true;
        }
      }
      this.$emit("click")
      for (let index in this.clickEvent) {
        this.clickEvent[index]();
      }
    },
    addClickEvent(func) {
      this.clickEvent.push(func);
    },
    show(){
      this.window.show=true;
      if (this.callout){
        this.callout.focusTrap=true;
        setTimeout(() => {
          this.callout.focusTrap=false;
        }, 100);
      }
      if (this.parent.show){
        this.parent.show()
      }
    }
  }
};
