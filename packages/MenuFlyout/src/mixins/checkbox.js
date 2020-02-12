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
  },
  data() {
    return {
      item: {
        checkable: this.checkable,
        checked: this.checked
      },
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
  }
};
