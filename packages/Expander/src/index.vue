<template>
    <div
        :class="['fv-'+$theme+'-Expander', {visibleOverflow: disabledExpander && visibleOverflow}]"
        :style="{height: !thisValue ? `${defaultHeight}px` : `${maxHeight}px`, 'max-height': `${maxHeight}px`}"
        @mouseenter="hover = true"
        @touchstart="hover = true"
        @mouseleave="hover = false"
        @touchend="hover = false"
    >
        <div
            class="expander-description-container"
            :style="{height: `${defaultHeight}px`, background: hover ? hoverBackground : titleBackground}"
            @click="itemClick"
        >
            <div class="expander-description-box">
                <div
                    class="expander-description"
                    @click="$emit('description-click')"
                >
                    <div class="expander-text">
                        <slot
                            name="content"
                            :title="title"
                            :contnet="content"
                        >
                            <div class="expander-title">{{ title }}</div>
                        </slot>
                    </div>
                </div>
                <div class="expander-description-extension-block">
                    <slot name="extension"></slot>
                </div>
            </div>
            <div
                class="expander-expand-icon-block"
                @click="$emit('icon-click')"
            >
                <slot
                    name="expand-icon"
                    :value="thisValue"
                    :disabledCollaspe="disabledExpander"
                >
                    <i
                        v-show="thisValue"
                        class="ms-Icon ms-Icon--ChevronUpMed"
                    ></i>
                    <i
                        v-show="!thisValue && !disabledExpander"
                        class="ms-Icon ms-Icon--ChevronDownMed"
                    ></i>
                    <i
                        v-show="!thisValue && disabledExpander"
                        class="ms-Icon ms-Icon--ChevronRightMed"
                    ></i>
                </slot>
            </div>
        </div>
        <transition name="expander-expanded">
            <div
                v-show="thisValue"
                class="expander-detail"
                :style="{background: expandBackground}"
            >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
    
    <script>
import one from 'onecolor';

export default {
    name: 'FvExpander',
    props: {
        value: {
            default: false,
        },
        icon: {
            type: String,
            default: 'Mail',
        },
        title: {
            type: String,
            default: 'Title of Expander.',
        },
        content: {
            type: String,
            default: 'Content information of Expander.',
        },
        titleBackground: {
            default: '',
        },
        expandBackground: {
            default: '',
        },
        defaultHeight: {
            default: 50,
        },
        maxHeight: {
            default: 300,
        },
        disabledExpander: {
            default: false,
        },
        visibleOverflow: {
            default: true,
        },
        theme: {
            type: String,
            default: 'system',
        },
    },
    data() {
        return {
            thisValue: this.value,
            hover: false,
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('input', val);
        },
    },
    computed: {
        hoverBackground() {
            try {
                let color = one(this.titleBackground);
                let hue = color.hue();
                return color.hue(hue - 0.01).cssa();
            } catch (e) {
                return '';
            }
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    methods: {
        itemClick() {
            !this.disabledExpander ? (this.thisValue ^= true) : '';
            this.$emit('item-click', this.thisValue);
        },
    },
};
</script>
    