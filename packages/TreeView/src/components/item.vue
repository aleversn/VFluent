<template>
    <li class="fv-TreeView--item">
        <div class="fv-TreeView--item-field" ref="field">
            <slot :item="item">
                <div class="fv-TreeView--item-checkbox">
                    <fv-check-box v-model="item.selected"></fv-check-box>
                </div>
                <div class="fv-TreeView--item-expand" @click.stop="clickExpand">
                    <i v-if="item && item.children" class="ms-Icon ms-Icon--ChevronDownSmall"></i>
                </div>
                <div class="fv-TreeView--item-label">
                    <i v-if="item.icon && !isURL(item.icon)" class="ms-Icon fv-TreeView--item-label-icon" :class="
                        [
                            `ms-Icon--${item.icon}`
                        ]
                    ">
                    </i>
                    <img v-if="item.icon && isURL(item.icon)" class="fv-TreeView--item-label-icon" :src="item.icon" />
                    <span class="fv-TreeView--item-label-text">{{item.label}}</span>
                </div>
            </slot>
        </div>
        <ul class="fv-TreeView--children" v-if="item && item.children" v-show="item.expanded">
            <tree-item v-for="(child,index) in item.children" :key="index" :item="child" :deepth="deepth+1">
            </tree-item>
        </ul>
    </li>
</template>

<script>
export default {
    name: "TreeItem",
    props: {
        item: {
            type: Object,
            default: () => { }
        },
        checkable: {
            default: false,
            type: Boolean
        },
        deepth: {
            default: 0,
            type: Number
        }
    },
    mounted() {
        this.initItemProperties(this.item)
        this.initItemPadding();
    },
    methods: {
        initItemProperties(item) {
            if (item.expanded === undefined) {
                this.$set(item, "expanded", false);
            }
            if (item.selected === undefined) {
                this.$set(item, "selected", false);
            }
        },
        initItemPadding(){
            this.$refs.field.style["--fv-TreeView--item-field-padding-left"] = `${this.deepth*20}px`;
        },
        isURL(url) {
            if (url.startsWith("http") || url.startsWith(".") || url.startsWith("/")) {
                return true;
            }
            return false;
        },
        clickExpand() {
            this.item.expanded = !this.item.expanded
        }
    }
}
</script>
