<template>
  <draggable v-bind="dragOptions" class="fv-TreeView__tree" tag="ul" :list="children" @change="change">
    <item
      v-for="(item,index) in children"
      :checkable="checkable"
      :viewStyle="viewStyle"
      :key="index"
      :item="item"
      :deepth="deepth+1"
      :padding="padding"
      :revealEffect="revealEffect"
      @click="click"
      :draggable="draggable"
    />
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "FvTreeViewContent",
  components: {
    item: () => import("./tree.vue"),
    draggable
  },
  props: {
    children: {
      default: () => []
    },
    deepth: {
      default: 1
    },
    viewStyle: {},
    checkable: {
      type: Boolean,
      default: false
    },
    padding: {},
    revealEffect: {},
    draggable:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 100,
        group: "TreeView",
        disabled: !this.draggable,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    click(item) {
      this.$emit("click", item);
    },
    change(){
      for (let index in this.$children[0].$children){
        let item = this.$children[0].$children[index]
        if (item.updateSelect){
          item.updateSelect()
        }
      }
    }
  }
};
</script>
