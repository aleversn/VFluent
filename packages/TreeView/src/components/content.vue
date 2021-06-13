<template>
    <draggable
        v-bind="dragOptions"
        class="fv-TreeView__tree"
        tag="ul"
        :list="children"
        @change="change"
    >
        <item
            v-for="(item, index) in children"
            :checkable="checkable"
            :viewStyle="viewStyle"
            :key="index"
            :item="item"
            :deepth="deepth + 1"
            :padding="padding"
            :revealEffect="revealEffect"
            @click="click"
            v-bind="$attrs"
        />
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import TreeItem from "./tree.vue";
export default {
    name: "FvTreeViewContent",
    components: {
        item:TreeItem,
        draggable,
    },
    props: {
        children: {
            default: () => [],
        },
        deepth: {
            default: 1,
        },
        viewStyle: {},
        checkable: {
            type: Boolean,
            default: false,
        },
        padding: {},
        revealEffect: {},
    },
    computed: {
        dragOptions() {
            return {
                animation: 100,
                group: "TreeView",
                disabled: !this.$attrs.draggable,
                ghostClass: "ghost",
            };
        },
    },
    methods: {
        click(item) {
            this.$emit("click", item);
        },
        change() {
            for (let index in this.$children[0].$children) {
                let item = this.$children[0].$children[index];
                if (item.updateSelect) {
                    item.updateSelect();
                }
            }
        },
    },
};
</script>
