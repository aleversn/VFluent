<template>
    <transition name="fv-menu-flyout">
        <div class="menu-flyout-list-container">
            <fv-pivot
                v-model="pivotValue"
                :items="pivotItems"
                :fontSize="12"
                :sliderBackground="choosenSliderBackground"
                style="width: 100%; height: 50px; overflow-x: auto;"
            ></fv-pivot>
            <transition-group
                name="fv-menu-flyout-item"
                tag="div"
                class="menu-flyout-item-container"
                :style="{background: background, 'overflow-y': 'auto', 'overflow-x': 'visible'}"
                ref="co_items"
            >
                <div
                    v-for="(item) in computedOptions"
                    class="fv-menu-flyout-item"
                    :class="{hr:valueTrigger(item.type) == 'divider', normal: (valueTrigger(item.type) == 'default' || valueTrigger(item.type) == undefined) && !valueTrigger(item.disabled), disabled: valueTrigger(item.disabled), choose: isChoosen(item), title: valueTrigger(item.type) == 'header'}"
                    :style="{background: isChoosen(item) ? choosenBackground : '', color: valueTrigger(item.type) === 'header' ? titleForeground : ''}"
                    @click="Choose($event, item)"
                    :key="item"
                    :title="valueTrigger(item.text)"
                >
                    <slot :item="item" :choosenSliderBackground="choosenSliderBackground">
                        <i
                            class="before-choosen"
                            :style="{background: choosenSliderBackground}"
                        ></i>
                        {{valueTrigger(item.type) !== 'divider' ? valueTrigger(item.text) : ''}}
                        <i
                            v-show="item.children"
                            class="ms-Icon ms-Icon--ChevronRight after-expand"
                        ></i>
                    </slot>
                </div>
            </transition-group>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'FvMenuFlyoutChildrenContainer',
    props: {
        value: {
            default: () => [],
        },
        options: {
            default: () => [],
        },
        background: {
            default: '',
        },
        choosenBackground: {
            default: '',
        },
        choosenSliderBackground: {
            default: '',
        },
        titleForeground: {
            default: '',
        },
        pivotPlaceholder: {
            default: 'Please Choose',
        },
    },
    data() {
        return {
            thisValue: this.value,
            pivotValue: null,
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        pivotItems(val) {
            if (val.length > 0) this.pivotValue = val[val.length - 1];
        },
    },
    computed: {
        pivotItems() {
            let result = [];
            for (let item of this.thisValue) {
                result.push({
                    key: item.key,
                    name: item.text,
                    ori: item,
                    width: this.pivotTextWidth(item.text),
                });
            }
            if (result.length == 0 || result[result.length - 1].ori.children)
                result.push({
                    key: '$fv-menu-flyout-pivot-placeholder',
                    name: this.pivotPlaceholder,
                    ori: {},
                    width: this.pivotTextWidth(this.pivotPlaceholder),
                });
            return result;
        },
        pivotTextWidth() {
            return (text) => {
                if (text.length < 5) return 60;
                if (text.length > 20) return 200;
                return 10 * text.length;
            };
        },
        computedOptions() {
            if (!this.pivotValue) return this.options;
            let index = this.pivotItems.findIndex((item) => item.key == this.pivotValue.key);
            if (index > 0) {
                if (this.pivotItems[index - 1].ori.children) return this.pivotItems[index - 1].ori.children;
                return [];
            }
            return this.options;
        },
        isChoosen () {
            return item => {
                if(!this.pivotValue) return false;
                return item.key === this.pivotValue.key && item.text === this.pivotValue.name
            }
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    mounted() {},
    methods: {
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        Choose(event, item) {
            if (this.valueTrigger(item.disabled)) return 0;
            if (this.valueTrigger(item.type) == 'header' || this.valueTrigger(item.type) == 'divider') return 0;
            let target = event.target;
            while (target.getAttribute('class').indexOf('fv-menu-flyout-item') < 0) {
                target = target.parentNode;
            }
            this.$refs.co_items.scrollTop = target.offsetTop;
            this.$emit('choose-item', {
                item: item,
                index: this.thisValue.findIndex((it) => {
                    return it.key == this.pivotValue.key && it.text == this.pivotValue.name;
                }),
            });
        },
    },
};
</script>
