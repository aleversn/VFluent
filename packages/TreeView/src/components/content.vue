<template>
  <ul class="fv-TreeView__tree">
    <item
      v-for="(item,index) in items.filter(item=>item.label)"
      :checkable="checkable"
      :viewStyle="viewStyle"
      :key="index"
      :item="item"
      :deepth="deepth+1"
      :padding="padding"
      :revealEffect="revealEffect"
      @click="click"
    />
  </ul>
</template>

<script>
export default {
  name: "FvTreeViewContent",
  components: {
    item: () => import("./tree.vue")
  },
  props: {
    items: {
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
    padding:{},
    revealEffect:{}
  },
  methods:{
    click(item){
      this.$emit('click',item)
    }
  }
};
</script>
