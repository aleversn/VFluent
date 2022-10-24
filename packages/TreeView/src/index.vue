<template>
    <draggable-component tag="ul" :class="[`fv-${$theme}-TreeView`]" :style="listStyle" :list="value"
        v-bind="dragOptions">
        <!-- Tree -->
        <item v-for="(item,index) in value" :key="index" :item="item" :checkable="checkable" :space="space"
            :expandedIcon="expandedIcon" :unexpandedIcon="unexpandedIcon" :foreground="foreground"
            :draggable="draggable" @handle-click="onClickItem" @single-select="onSingleSelect">
        </item>
    </draggable-component>
</template>

<script>
import draggableComponent from 'vuedraggable';
import Item from "./components/item.vue"
export default {
    name: 'FvTreeView',
    components: {
        Item,
        draggableComponent
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
        value: {
            required: true,
            type: Array,
            default: () => []
        },
        itemHeight: {
            type: [String, Number],
        },
        space: {
            type: Number,
            default: 20
        },
        foreground: {
            type: String
        },
        background: {
            type: String
        },
        expandedIcon: {
            type: String,
            default: "ChevronDownSmall"
        },
        unexpandedIcon: {
            type: String,
            default: "ChevronRightSmall"
        },
        backgroundColorHover: {
            type: String
        },
        backgroundColorActive: {
            type: String
        },
        draggable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        $theme() {
            if (this.theme === 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
        listStyle() {
            return {
                "--fv-TreeView--item-field-height": this.itemHeight === undefined ? undefined : typeof this.itemHeight === 'string' ? this.itemHeight : `${this.itemHeight}px`,
                "--fv-TreeView--item-field-color": this.foreground,
                "--fv-TreeView--background": this.background,
                "--fv-TreeView--item-field-hover-bg-color": this.backgroundColorHover,
                "--fv-TreeView--item-field-active-bg-color": this.backgroundColorActive
            }
        },
        dragOptions() {
            return {
                animation: 100,
                group: 'TreeView',
                disabled: !this.draggable,
                ghostClass: 'ghost',
            };
        }
    },
    methods: {
        onClickItem(item) {
            this.$emit("click", item)
        },
        onSingleSelect(item) {
            this.toggleDescendants(this.value, item);
        },
        toggleDescendants(children, target) {
            if (Array.isArray(children)) {
                for (let child of children) {
                    if (child !== target) {
                        this.$set(child, "selected", false);
                    }
                    this.toggleDescendants(child.children, target)
                }
            }
        },
    }
}
</script>