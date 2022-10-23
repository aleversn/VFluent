<template>
    <ul :class="[`fv-${$theme}-TreeView`]">
        <!-- Tree -->
        <item v-for="(item,index) in value" :key="index" :item="item" :checkable="checkable">
        </item>
    </ul>
</template>

<script>
import Item from "./components/item.vue"
export default {
    name: 'FvTreeView',
    components: {
        Item
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
        }
    },
    computed: {
        $theme() {
            if (this.theme === 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    }
}
</script>