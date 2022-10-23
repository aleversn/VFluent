<template>
    <li class="fv-TreeView--item">
        <div class="fv-TreeView--item-field" ref="field">
            <slot :item="item">
                <div v-if="checkable" class="fv-TreeView--item-checkbox">
                    <fv-check-box v-model="item.selected" @click.native.stop="clickSelected"></fv-check-box>
                </div>
                <div class="fv-TreeView--item-expand" @click.stop="clickExpand">
                    <i v-if="item && item.children" class="ms-Icon" :class="[
                        `ms-Icon--${item.expanded===true?expandedIcon:unexpandedIcon}`
                    ]">
                    </i>
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
        <ul class="fv-TreeView--children" v-if="item && item.children && item.expanded!==null" v-show="item.expanded">
            <tree-item v-for="(child,index) in item.children.slice(0, loadding.count)" :key="index" :item="child"
                :deepth="deepth+1" :loadCount="loadCount" :space="space" @updateSelected="onChildSelect"
                :checkable="checkable">
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
        },
        space: {
            default: 20,
            type: Number
        },
        expandedIcon: {
            default: "ChevronDownSmall",
            type: String
        },
        unexpandedIcon: {
            default: "ChevronRightSmall",
            type: String
        },
        loadCount: {
            default: 1,
            type: Number
        }
    },
    data() {
        return {
            loadding: {
                lock: false,
                count: 0
            }
        }
    },
    mounted() {
        this.initItemProperties(this.item)
        this.initItemPadding();
        this.loadNext();
    },
    methods: {
        /**
         *  lazy rendering list 
         */
        loadNext() {
            if (this.loadding.lock) return;
            this.loadding.lock = true;
            if (Array.isArray(this.item.children) && this.loadding.count < this.item.children.length) {
                this.loadding.count += this.loadCount;
                this.loadding.lock = false;
                window.requestAnimationFrame(this.loadNext);
            } else {
                if (Array.isArray(this.item.children)) {
                    this.loadding.count = this.item.children.length;
                }
                this.loadding.lock = false;
            }
        },
        initItemProperties(item) {
            if (item.expanded === undefined) {
                this.$set(item, "expanded", null);
            }
            if (item.selected === undefined) {
                this.$set(item, "selected", false);
            }
        },
        /**
         * initialize padding offset
         */
        initItemPadding() {
            this.$refs.field.style.setProperty("--fv-TreeView--item-field-padding-left", `${this.deepth * this.space}px`);
        },
        isURL(url) {
            if (url.startsWith("http") || url.startsWith(".") || url.startsWith("/")) {
                return true;
            }
            return false;
        },
        clickExpand() {
            if (this.item.expanded === null) {
                this.item.expanded = false;
            }
            this.item.expanded = !this.item.expanded
        },
        updateDescendantsSelected(item, selected) {
            this.$set(item, "selected", selected);
            if (Array.isArray(item.children)) {
                for (let child of item.children) {
                    this.updateDescendantsSelected(child, selected);
                }
            }
        },
        clickSelected() {
            // broadcast tree
            this.updateDescendantsSelected(this.item, this.item.selected);
            this.$emit("updateSelected");
        },
        onChildSelect() {
            if (Array.isArray(this.item.children)) {
                let count = 0;
                for (let child of this.item.children) {
                    if (child.selected === true) {
                        ++count;
                    }
                }
                if (count === this.item.children.length) {
                    this.$set(this.item, "selected", true);
                } else if (count === 0) {
                    this.$set(this.item, "selected", false);
                } else {
                    this.$set(this.item, "selected", "");
                }
                this.$emit("updateSelected")
            }
        }
    }
}
</script>
