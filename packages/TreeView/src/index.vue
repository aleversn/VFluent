<template>
  <div :class="['fv-'+$theme+'-TreeView']" ref="view">
    <tree-content
      :style="style"
      :children="items"
      :deepth="0"
      :viewStyle="style"
      :checkable="checkable"
      :padding="space"
      :draggable="draggable"
      @click="click"
    ></tree-content>
  </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import TreeContent from "./components/content";

export default {
  name: "FvTreeView",
  components: {
    TreeContent
  },
  props: {
    theme: {
      type: String,
      default: "system"
    },
    checkable: {
      type: Boolean,
      default: false
    },
    data: {
      default: function() {
        return [];
      },
      required: true,
      type: Array
    },
    space: {
      default: 20,
      type: Number
    },
    revealEffect: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    viewStyle: {}
  },
  data() {
    return {
      style: {},
      changeLock: false
    };
  },
  model: {
    prop: "data",
    event: "update:data"
  },
  computed: {
    $theme() {
      if (this.theme === "system") return this.$fvGlobal.state.theme;
      return this.theme;
    },
    items: {
      get: function() {
        return this.data;
      },
      set: function(val) {
        this.$emit("update:data", val);
      }
    }
  },
  watch: {
    $theme() {
      this.$nextTick(() => {
        this.initStyle();
      });
    },
    data: {
      handler() {
        if (this.changeLock) return;
        this.changeLock = true;
        this.$emit("change", this.data);
        setTimeout(() => {
          this.changeLock = false;
        }, 100);
      },
      deep: true
    },
    viewStyle: {
      handler() {
        this.initStyle();
      },
      deep: true
    }
  },
  mounted() {
    this.initStyle();
  },
  methods: {
    initStyle() {
      if (document.defaultView)
        this.style = this.viewStyle || {
          backgroundColor: document.defaultView.getComputedStyle(
            this.$refs.view,
            null
          ).backgroundColor,
          color: document.defaultView.getComputedStyle(this.$refs.view, null)
            .color
        };
    },
    mutexSelected(item,items){
      for (let index in items){
        let el = items[index];
        if (el!=item && el.selected==true){
          el.selected=false;
        }
        if (el.children){
          this.mutexSelected(item,el.children)
        }
      }
    },
    click(item) {
      if (!this.checkable) this.mutexSelected(item,this.items);
      this.$emit("click", item);
    },
  }
};
</script>
