<template>
  <ul :class="['fv-'+$theme+'-TreeView']" ref="view" :style="viewStyle">
    <item
      v-for="(item,index) in data.filter(item=>item.label)"
      :key="index"
      :viewStyle="style"
      :item="item"
      :checkable="checkable"
      :padding="space"
      :revealEffect="revealEffect"
      @click="click"
    ></item>
  </ul>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import Item from "./components/tree.vue";

export default {
  name: "FvTreeView",
  components: {
    item: Item
  },
  props: {
    theme: {
      type: String,
      default: "system"
    },
    viewStyle: {},
    checkable: {
      type: Boolean,
      default: false
    },
    data: {
      default: function() {
        return [];
      },
      type: Array
    },
    space: {
      default: 20,
      type: Number
    },
    revealEffect:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      style: this.viewStyle,
      changeLock: false
    };
  },
  computed: {
    $theme() {
      if (this.theme === "system") return this.$fvGlobal.state.theme;
      return this.theme;
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
    click(item){
      this.$emit('click',item)
    }
  }
};
</script>
