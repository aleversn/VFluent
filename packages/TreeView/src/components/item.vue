<template>
    <li class="fv-TreeView--item">
        <div class="fv-TreeView--item-field" :class="{
            active: item.selected === true
        }" ref="field" @click.stop="clickSelected()">
            <div v-if="checkable" class="fv-TreeView--item-checkbox">
                <fv-check-box v-model="item.selected" @click.native.stop="clickSelected(false)" :background="foreground"
                    :borderColor="foreground">
                </fv-check-box>
            </div>
            <div class="fv-TreeView--item-expand" @click.stop="clickExpand">
                <i v-if="item && item.children" class="ms-Icon" :class="[
                    `ms-Icon--${item.expanded === true ? expandedIcon : unexpandedIcon}`
                ]">
                </i>
            </div>
            <div class="fv-TreeView--item-label">
                <slot :item="item">
                    <i v-if="item.icon && !isURL(item.icon)" class="ms-Icon fv-TreeView--item-label-icon" :class="
                        [
                            `ms-Icon--${item.icon}`
                        ]
                    ">
                    </i>
                    <img v-if="item.icon && isURL(item.icon)" class="fv-TreeView--item-label-icon" :src="item.icon" />
                    <span class="fv-TreeView--item-label-text">{{ item.label }}</span>
                </slot>
            </div>
        </div>
        <draggable tag="ul" v-bind="dragOptions" class="fv-TreeView--children" :list="item.children"
            v-if="item && item.children && item.expanded !== null" v-show="item.expanded" @change="dragChange">
            <tree-item v-for="(child, index) in renderList" :key="index" :item="child" :deepth="deepth + 1"
                :loadCount="loadCount" :space="space" @updateSelected="onChildSelect" :checkable="checkable"
                :expandedIcon="expandedIcon" :unexpandedIcon="unexpandedIcon" :foreground="foreground"
                :draggable="draggable" @handle-click="notifyClick" @single-select="$emit('single-select', $event)"
                :expand-click-mode="expandClickMode">
                <template v-slot:default="prop">
                    <slot :item="prop.item">
                    </slot>
                </template>
            </tree-item>
        </draggable>
    </li>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: "TreeItem",
    components: {
        draggable
    },
    props: {
        item: {
            type: Object,
            default: () => { 
                expanded: undefined
            }
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
        },
        foreground: {
            type: String
        },
        draggable: {
            type: Boolean,
            default: false
        },
        expandClickMode: {
            type: String,
            default: "icon"
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
    computed: {
        renderList() {
            if (Array.isArray(this.item.children)){
                return this.item.children.slice(0, this.loadding.count);
            }
            else
                return [];
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
    watch: {
        "item.expanded"(val) {
            if (val === true) {
                this.loadNext();
            }
        },
        "item.children"(val) {
            if (Array.isArray(val) && val.length>0 && this.item.expanded === true) {
                this.loadNext();
            }
        }
    },
    mounted() {
        this.initItemPadding();
        if (this.item.expanded)
            this.loadNext();
    },
    methods: {
        /**
         *  lazy rendering list 
         */
        loadNext() {
            if (this.loadding.lock || this.item.expanded === false) return;
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
        /**
         * initialize padding offset
         */
        initItemPadding() {
            this.$refs.field.style.setProperty("--fv-TreeView--item-field-padding-left", `${this.deepth * this.space + 10}px`);
        },
        isURL(url) {
            if (url.startsWith("http") || url.startsWith(".") || url.startsWith("/")) {
                return true;
            }
            return false;
        },
        clickExpand() {
            if (this.item.expanded === undefined && Array.isArray(this.item.children)){
                this.$set(this.item,"expanded",false)
            }
            this.$set(this.item,"expanded",!this.item.expanded)
            this.$emit("handle-click", this.item);
        },
        updateDescendantsSelected(item, selected) {
            this.$set(item, "selected", selected);
            if (Array.isArray(item.children)) {
                for (let child of item.children) {
                    this.updateDescendantsSelected(child, selected);
                }
            }
        },
        clickSelected(expanded=true) {
            if (this.expandClickMode === 'normal' && expanded) {
                if (this.item.expanded === undefined && Array.isArray(this.item.children)) {
                    this.$set(this.item,"expanded",false)
                }
                this.item.expanded = !this.item.expanded
            }
            if (this.item.selected===undefined){
                this.$set(this.item,"selected",false)
            }
            if (this.checkable) {
                // broadcast tree
                this.updateDescendantsSelected(this.item, this.item.selected);
                this.$emit("updateSelected");
            } else {
                this.$set(this.item,"selected",!this.item.selected);
                if (this.item.selected) {
                    this.$emit("single-select", this.item);
                }
            }
            this.$emit("handle-click", this.item)
            return true;
        },
        onChildSelect() {
            if (!this.checkable) {
                return;
            }
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
        },
        notifyClick(item) {
            this.$emit("handle-click", item);
        },
        dragChange() {
            this.onChildSelect();
            this.loadNext();
        }
    }
}
</script>
