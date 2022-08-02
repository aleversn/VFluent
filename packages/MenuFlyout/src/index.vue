<template>
    <fv-callout :class="['fv-' + $theme + '-menuFlyout', { actived: callout.show }, { disabled: disabled }]"
        :style="flyout" :visible.sync="callout.show" :beak="beak" :focusTrap="callout.focusTrap" :popperStyle="{
            padding: '0px',
            minWidth: '300px',
            backgroundColor: backgroundColor,
            color: color,
            borderRadius: borderRadius,
            overflow: overflow,
            'box-shadow': 'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
        }" :position="position" :popperClass="['fv-' + $theme + '-menuFlyoutPopper']" :theme="$theme"
        :disabled="disabled">
        <template>
            <button ref="button" class="fv-menuFlyout__button" :style="{ borderColor: borderColor }">
                <fv-reveal-container :parent="() => $refs.button" class="fv-menuFlyout__reveal"
                    :backgroundColor="backgroundLightColor()" :borderColor="borderLightColor()" :borderGradientSize="80"
                    :borderWidth="0" :borderRadius="0" :disabled="disabled">
                </fv-reveal-container>
                <span>{{ label ? label : "Click the Menu" }}</span>
                <i class="ms-Icon ms-Icon--ChevronDown right-icon"></i>
            </button>
        </template>
        <main>
            <slot></slot>
        </main>
    </fv-callout>
</template>

<script>
export default {
    name: "FvMenuFlyout",
    props: {
        theme: {
            type: String,
            default: "system",
        },
        label: {
            type: String,
        },
        position: {
            type: String,
            default: "bottomLeft",
        },
        beak: {
            type: Number,
            default: 0,
        },
        checkable: {
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        backgroundColor: {},
        color: {},
        borderColor: {},
        borderRadius: {},
    },
    data() {
        return {
            FR: null,
            callout: {
                show: false,
                focusTrap: false,
            },
            overflow: this.borderRadius ? "hidden" : undefined,
        };
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        flyout() {
            return {
                backgroundColor: this.backgroundColor,
                color: this.color,
            };
        },
        borderLightColor() {
            return () => {
                if (this.$theme == "light") {
                    return "rgba(121, 119, 117, 0.6)";
                }
                if (this.$theme == "dark" || this.$theme == "custom") {
                    return "rgba(255, 255, 255, 0.6)";
                }
                return "rgba(121, 119, 117, 0.6)";
            }
        },
        backgroundLightColor() {
            return () => {
                if (this.$theme == "light") {
                    return "rgba(121, 119, 117, 0.3)";
                }
                if (this.$theme == "dark" || this.$theme == "custom") {
                    return "rgba(255, 255, 255, 0.3)";
                }
                return "rgba(121, 119, 117, 0.3)";
            }
        },
    },
    methods: {
        show() {
            this.callout.focusTrap = true;
            setTimeout(() => {
                this.callout.focusTrap = false;
            }, 100);
        },
    },
};
</script>
