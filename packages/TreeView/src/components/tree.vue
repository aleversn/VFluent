<template>
    <!-- item -->
    <li class="fv-TreeView__item" :style="{
        color: $attrs.foreground,
    }">
        <div class="fv-TreeView__label-border" :style="{
            height: style.label.height
        }">
            <div ref="label" class="fv-TreeView__label" :class="{
                active: item.selected
            }" @click.stop="expandFolder('label') && !checkable && click($event)" @mousedown="clickItem(item)" :style="[
                style.label,
                {
                    // 'height':typeof itemHeight=='number'?`${itemHeight}px`:itemHeight,
                    'border-width': `${borderWidth}px`,
                    '--fv-TreeView__label-hover-color':  backgroundColorHover!==undefined?`${backgroundColorHover}`:undefined,
                    '--fv-TreeView__label-color': backgroundColorActive!==undefined?`${backgroundColorActive}`:undefined
                },
            ]">
                <checkbox v-if="checkable" ref="checkbox" :status="item.checkboxStatus" v-bind="$attrs"
                    @click="checkable && click($event)" />
                <!-- expandFolder twice to ignore parent -->
                <component @click.stop="expandFolder('icon')" :is="isUrl($attrs.expandedIcon) ? 'img' : 'i'"
                    ref="expanded" v-if="$attrs.expandedIconPosition == 'left' && isFolder && item.expanded"
                    :class="[!isUrl($attrs.expandedIcon) ? `ms-Icon--${$attrs.expandedIcon}` : undefined, !isUrl($attrs.expandedIcon) ? 'ms-Icon' : undefined]"
                    :src="isUrl($attrs.expandedIcon) ? $attrs.expandedIcon : undefined" draggable="false" />
                <component @click.stop="expandFolder('icon')"
                    v-else-if="$attrs.expandedIconPosition == 'left' && isFolder && !item.expanded"
                    :is="isUrl($attrs.unexpandedIcon) ? 'img' : 'i'" ref="expanded"
                    :class="[!isUrl($attrs.unexpandedIcon) ? `ms-Icon--${$attrs.unexpandedIcon}` : undefined, !isUrl($attrs.unexpandedIcon) ? 'ms-Icon' : undefined]"
                    :src="isUrl($attrs.unexpandedIcon) ? $attrs.unexpandedIcon : undefined" draggable="false" />
                <i v-else-if="$attrs.expandedIconPosition == 'left'" style="width: 12px" />
                <slot :item="item">
                    <template v-if="item.icon">
                        <i v-if="!isUrl(item.icon)" class="ms-Icon fv-TreeView__icon"
                            :class="[`ms-Icon--${item.icon}`]" />
                        <img v-else :src="item.icon" class="fv-TreeView__icon" draggable="false" />
                    </template>
                    <span class="fv-TreeView__text">{{ item.label }}</span>
                </slot>
                <div class="fv-TreeView__right-box" v-if="$attrs.expandedIconPosition == 'right'"
                    @click.stop="expandFolder('icon')">
                    <component :is="isUrl($attrs.expandedIcon) ? 'img' : 'i'" ref="expanded"
                        v-if="isFolder && item.expanded"
                        :class="[!isUrl($attrs.expandedIcon) ? `ms-Icon--${$attrs.expandedIcon}` : undefined, !isUrl($attrs.expandedIcon) ? 'ms-Icon' : undefined]"
                        :src="isUrl($attrs.expandedIcon) ? $attrs.expandedIcon : undefined" draggable="false" />
                    <component v-else-if="isFolder && !item.expanded" :is="isUrl($attrs.unexpandedIcon) ? 'img' : 'i'"
                        ref="expanded"
                        :class="[!isUrl($attrs.unexpandedIcon) ? `ms-Icon--${$attrs.unexpandedIcon}` : undefined, !isUrl($attrs.unexpandedIcon) ? 'ms-Icon' : undefined]"
                        :src="isUrl($attrs.unexpandedIcon) ? $attrs.unexpandedIcon : undefined" draggable="false" />
                </div>
            </div>
        </div>
        <!-- children -->
        <transition name="fv-tree-item-show">
            <tree-content :expandClickMode="expandClickMode" :backgroundColorHover="backgroundColorHover"
                :backgroundColorActive="backgroundColorActive" ref="content" v-if="isFolder" v-show="item.expanded"
                v-bind="$attrs" :children="item.children" :deepth="deepth" :viewStyle="viewStyle" :checkable="checkable"
                :padding="padding" @click="clickItem" :itemHeight="itemHeight">
                <template v-slot:default="prop">
                    <slot :item="prop.item"> </slot>
                </template>
            </tree-content>
        </transition>
    </li>
</template>

<script>
import '../../../office-ui-fabric-core/dist/css/fabric.min.css';
import one from 'onecolor';
import id from '../mixins/id.js';
import checkbox from './checkbox.vue';

export default {
    name: 'FvTreeViewItem',
    components: {
        TreeContent: () => import('./content.vue'),
        checkbox,
    },
    mixins: [id],
    props: {
        item: {
            default: () => {
                return {};
            },
        },
        theme: {
            default: 'system',
            type: String,
        },
        padding: {
            type: Number,
            default: 20,
        },
        deepth: {
            default: 1,
        },
        borderWidth: {
            default: 2,
        },
        viewStyle: {},
        checkable: {
            type: Boolean,
            default: false,
        },
        backgroundColorHover: {
            type: String
        },
        backgroundColorActive: {
            type: String
        },
        expandClickMode: {
            type: String,
            default: "normal"
        },
        itemHeight: {
            type: String,
        }
    },
    model: {
        prop: 'item',
        event: 'update:item',
    },
    data() {
        return {
            event: {

            },
            style: {
                label: {
                    paddingLeft: 10 + this.deepth * this.padding + 'px',
                },
            },
        };
    },
    computed: {
        data: {
            set: function (val) {
                this.$emit('update:item', val);
            },
            get: function () {
                return this.item;
            },
        },
        isFolder() {
            return this.item.children;
        },
        $theme() {
            if (this.theme === 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    watch: {
        'item.selected'(val) {
            this.item.checkboxStatus = this.getStatus();
        },
        padding(val) {
            this.$set(this.style.label, 'paddingLeft', 10 + this.deepth * val + 'px');
        },
        $theme() {
            this.initStyle();
        },
    },
    beforeCreate() {
        let parent = this.$parent;
        while (parent) {
            if (parent.$options.name && parent.$options.name === 'FvTreeViewItem') {
                this.parent = parent;
                return;
            }
            parent = parent.$parent;
        }
    },
    mounted() {
        if (!this.item.selected) {
            this.$set(this.item, 'selected', false);
        }
        if (!this.item.expanded) {
            this.$set(this.item, 'expanded', false);
        }
        this.$set(this.item, 'checkboxStatus', this.getStatus());
        this.initEvent();
        this.$nextTick(() => {
            this.initStyle();
        });
    },
    methods: {
        initStyle() {
            if (typeof this.viewStyle.height === "string") {
                this.$set(this.style.label, "height", this.viewStyle.height)
            } else if (typeof this.viewStyle.height === "number") {
                this.$set(this.style.label, "height", `${this.viewStyle.height}px`)
            }
        },
        initEvent() {
            for (let key in this.event) {
                let events = this.event[key];
                for (let event in events) {
                    this.$refs[key].addEventListener(event, events[event]);
                }
            }
        },
        DestroyEvent() {
            for (let key in this.event) {
                let events = this.event[key];
                for (let event in events) {
                    this.$refs[key].removeEventListener(event, events[event]);
                }
            }
        },
        hoverColor(color, dark, light) {
            if (color == 'transparent') {
                if (this.$theme == 'dark') {
                    color = '#000';
                } else {
                    color = '#ffffff';
                }
            }
            let onecolor = one(color);
            if (onecolor.isLight()) {
                return onecolor.lightness(dark);
            } else {
                return onecolor.lightness(+(light ? light : dark));
            }
        },
        click(evt) {
            this.select(this.item.selected ^ true);
            return false;
        },
        expandFolder(type = "label") {
            console.log(type, this.expandClickMode)
            if (this.expandClickMode === 'icon' && type === "label") {
                return false;
            }
            if (this.isFolder) {
                this.item.expanded ^= true;
            }
            return true;
        },
        getStatus() {
            let selectCount = 0;
            if (!this.item.children || !this.item.children.length) {
                if (this.item.selected) {
                    return 'checked';
                } else {
                    return null;
                }
            }
            let children = this.item.children;
            for (let index in children) {
                let item = children[index];
                if (item.selected) {
                    selectCount++;
                }
                if (item.checkboxStatus === 'Indeterminate') {
                    return 'Indeterminate';
                }
            }
            if (children && selectCount === children.length) {
                return 'checked';
            } else if (selectCount > 0) {
                return 'Indeterminate';
            } else {
                return null;
            }
        },
        selectAll(item, status) {
            for (let index in item.children) {
                let child = item.children[index];
                this.selectAll(child, status);
            }
            item.selected = status;
        },
        updateSelect() {
            this.item.checkboxStatus = this.getStatus();
            if (this.item.checkboxStatus === 'checked') {
                this.item.selected = true;
            } else {
                this.item.selected = false;
            }
            if (this.parent) {
                this.parent.updateSelect();
            }
        },
        select(status) {
            if (!this.checkable) {
                this.item.selected ^= true;
                return;
            }
            this.selectAll(this.item, status);
            this.updateSelect();
        },
        clickItem(item) {
            this.$emit('click', item);
        },
        updateParent() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.name && parent.$options.name === 'FvTreeViewItem') {
                    this.parent = parent;
                    return;
                }
                parent = parent.$parent;
            }
        },
    },
    beforeDestroy() {
        this.DestroyEvent();
    },
};
</script>