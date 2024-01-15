<template>
    <div
        v-show="valueTrigger(value.show) !== false"
        class="fv-tree-view-item"
        :draggable="draggable"
        @dragstart="handleDrag"
        @dragend="dragMode = false"
    >
        <div
            class="fv-tree-view-item-container"
            :class="[{selected: value.selected, disabled: valueTrigger(value.disabled)}]"
            ref="item"
            :style="{height: `${itemHeight}px`, 'background-color': dropMode === 'enter' ? dropBackgroundColor : backgroundColor, 'border-top': dropMode === 'before' ? `${itemHeight}px solid transparent` : ''}"
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropItem"
            @click="expandClick('normal', $event)"
            @mouseenter="switchCSSMode('hover')"
            @mouseleave="switchCSSMode('normal')"
            @mousedown="switchCSSMode('active')"
            @mouseup="switchCSSMode('hover')"
            @touchstart="switchCSSMode('active')"
            @touchend="switchCSSMode('normal')"
        >
            <i
                v-show="value.selected && !checkable"
                class="fv-tree-view-item-choosen-bar"
                :style="{background: foreground}"
            ></i>
            <fv-check-box
                v-show="checkable"
                v-model="value.selected"
                :theme="theme"
                :background="foreground"
                ref="check"
                style="margin-right: 10px;"
                @click="changeChildren"
            ></fv-check-box>
            <div
                class="fv-tree-view-item-container-main"
                :style="{'padding-left': `${deep * space}px`}"
            >
                <div
                    v-if="expandedIconPosition === 'left'"
                    class="fv-tree-view-item-expander"
                    style="margin-right: 10px;"
                >
                    <i
                        v-if="!valueTrigger(value.loading) || !showLoading"
                        v-show="value.children"
                        class="ms-Icon fv-tree-view-item-expander-icon"
                        :class="[`ms-Icon--${value.expanded ? expandedIcon : unexpandedIcon}`]"
                        ref="expander"
                        @click="expandClick('icon', $event)"
                    ></i>
                    <fv-progress-ring
                        v-else
                        :loading="true"
                        :r="10"
                        borderWidth="2"
                        :color="foreground"
                        :background="'transparent'"
                    ></fv-progress-ring>
                </div>
                <div class="fv-tree-view-item-content">
                    <slot
                        :item="value"
                        :deep="deep"
                    >
                        <i
                            v-show="value.icon && !isURL(valueTrigger(value.icon))"
                            class="ms-Icon fv-tree-view-item-std-icon"
                            :class="`ms-Icon--${valueTrigger(value.icon)}`"
                        ></i>
                        <img
                            v-if="value.icon && isURL(valueTrigger(value.icon))"
                            class="fv-tree-view-item-std-icon"
                            :src="valueTrigger(value.icon)"
                        />
                        <p
                            class="fv-tree-view-item-text"
                            :style="{'margin-left': value.icon ? '10px' : ''}"
                        >{{valueTrigger(value.label)}}</p>
                    </slot>
                </div>
                <div
                    v-if="expandedIconPosition === 'right'"
                    class="fv-tree-view-item-expander"
                >
                    <i
                        v-if="!valueTrigger(value.loading) || !showLoading"
                        v-show="value.children"
                        class="ms-Icon fv-tree-view-item-expander-icon"
                        :class="[`ms-Icon--${value.expanded ? expandedIcon : unexpandedIcon}`]"
                        ref="expander"
                        @click="expandClick('icon', $event)"
                    ></i>
                    <fv-progress-ring
                        v-else
                        :loading="true"
                        :r="10"
                        borderWidth="2"
                        :color="foreground"
                        :background="'transparent'"
                    ></fv-progress-ring>
                </div>
            </div>
        </div>
        <transition name="fv-tree-view-children-list">
            <div
                v-if="value.children"
                v-show="value.expanded"
                class="fv-tree-view-item-children"
            >
                <tree-view-item
                    v-for="(item, index) in value.children"
                    :key="`parent: ${kIndex}, self: ${index}`"
                    :value="item"
                    :parent="value"
                    :kIndex="index"
                    :deep="deep + 1"
                    :space="space"
                    :expandClickMode="expandClickMode"
                    :draggable="draggable"
                    :checkable="checkable"
                    :foreground="foreground"
                    :expandedIcon="expandedIcon"
                    :unexpandedIcon="unexpandedIcon"
                    :backgroundColorHover="backgroundColorHover"
                    :backgroundColorActive="backgroundColorActive"
                    :itemHeight="itemHeight"
                    :expandedIconPosition="expandedIconPosition"
                    :showLoading="showLoading"
                    :dragItem="dragItem"
                    :theme="theme"
                    @selected-change="$emit('selected-change', $event)"
                    @set-drag-item="$emit('set-drag-item', $event)"
                    @drop-item="$emit('drop-item', $event)"
                    @handle-click="$emit('handle-click', $event)"
                >
                </tree-view-item>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'TreeViewItem',
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        parent: {
            type: Object,
            default: () => ({})
        },
        kIndex: {
            default: 0
        },
        deep: {
            default: 0
        },
        space: {
            default: 20
        },
        expandClickMode: {
            default: 'icon'
        },
        backgroundColorHover: {
            default: ''
        },
        backgroundColorActive: {
            default: ''
        },
        foreground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        dropBackgroundColor: {
            default: 'rgba(0, 90, 158, 0.1)'
        },
        draggable: {
            default: false
        },
        checkable: {
            default: false
        },
        expandedIcon: {
            default: 'ChevronDownSmall'
        },
        unexpandedIcon: {
            default: 'ChevronRightSmall'
        },
        itemHeight: {
            default: 30
        },
        showLoading: {
            default: false
        },
        expandedIconPosition: {
            default: 'left'
        },
        dragItem: {
            default: () => ({
                item: null,
                parent: null
            })
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            cssMode: 'normal',
            dropMode: 'none',
            dragMode: false,
            timer: {
                drop: null,
                delayExpand: null
            }
        };
    },
    watch: {},
    computed: {
        backgroundColor() {
            if (this.cssMode === 'hover') {
                return this.backgroundColorHover;
            } else if (this.cssMode === 'active') {
                return this.backgroundColorActive;
            }
            return '';
        }
    },
    mounted() {},
    methods: {
        expandClick(mode = 'icon', event) {
            if (this.valueTrigger(this.value.disabled)) return;
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x === this.$refs.expander || x === this.$refs.check.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) {
                this.$emit('selected-change', this.value);
                this.$set(this.value, 'selected', true);
                this.$emit('handle-click', this.value);
            }
            x = event.target;
            if (mode === 'icon' && this.expandClickMode === 'icon') {
                event.stopPropagation();
                if (x === this.$refs.expander)
                    this.$set(this.value, 'expanded', !this.value.expanded);
            } else if (mode === 'normal' && this.expandClickMode === 'normal') {
                _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                    if (x === this.$refs.check.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self)
                    this.$set(this.value, 'expanded', !this.value.expanded);
            }
        },
        switchCSSMode(mode) {
            if (this.valueTrigger(this.value.disabled)) return;
            this.cssMode = mode;
        },
        handleDrag(event) {
            event.stopPropagation();
            this.$set(this.value, 'expanded', false);
            console.log('expanded');
            this.$emit('set-drag-item', {
                item: this.value,
                parent: this.parent
            });
            this.dragMode = true;
        },
        isURL(url) {
            if (
                url.startsWith('http') ||
                url.startsWith('.') ||
                url.startsWith('/')
            ) {
                return true;
            }
            return false;
        },
        changeChildren(val) {
            if (this.value.children) {
                let children = this.value.children;
                for (let i = 0; i < children.length; i++) {
                    let item = children[i];
                    this.$set(item, 'selected', val);
                    if (item.children) {
                        children = children.concat(item.children);
                    }
                }
            }
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        dragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(this.value.disabled)) return;
            if (this.dragItem.item === this.value) return;
            const { clientY } = event;
            const { top, height } = this.$refs.item.getBoundingClientRect();
            if (clientY - top < height / 2) {
                this.dropMode = 'before';
                clearTimeout(this.timer.delayExpand);
            } else if (this.valueTrigger(this.value.dropInside) === false) {
                this.dropMode = 'before';
                clearTimeout(this.timer.delayExpand);
            } else {
                this.dropMode = 'enter';
                this.timer.delayExpand = setTimeout(() => {
                    this.$set(this.value, 'expanded', true);
                }, 500);
            }
            clearTimeout(this.timer.drop);
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.timer.drop);
            this.timer.drop = setTimeout(() => {
                this.dropMode = 'leave';
            }, 100);
        },
        dropItem(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(this.value.disabled)) {
                this.dropMode = 'leave';
                return;
            }
            if (this.dragItem) {
                this.$emit('drop-item', {
                    drop: this.value,
                    dropParent: this.parent,
                    drag: this.dragItem.item,
                    dragParent: this.dragItem.parent,
                    mode: this.dropMode
                });
            }
            this.dropMode = 'leave';
        }
    }
};
</script>