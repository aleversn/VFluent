<template>
<div :class="['fv-'+$theme+'-TextBox', status, isFocus ? 'focus' : '', isDisabled ? 'disabled' : '', isUnderline ? 'underline': '']" :style="isFocus ? focusStyles.textBox : styles.textBox">
    <div v-show="prefix != ''" class="fix-block">
        <p>{{prefix}}</p>
    </div>
    <i v-show="leftIcon != ''" class="ms-Icon icon-block" :class="[`ms-Icon--${leftIcon}`]" @click="$emit('left-icon-click', $event)"></i>
    <core v-model="thisValue" :mode="mode" :type="type" :placeholder="placeholder" :mask="mask" :flag="flag" :pattern="pattern" :readonly="readonly" :maxlength="maxlength" :disabled="disabled" :focus.sync="isFocus" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)"></core>
    <i v-show="icon != ''" class="ms-Icon icon-block" :class="[`ms-Icon--${icon}`]" @click="$emit('left-icon-click', $event)"></i>
    <div v-show="suffix != ''" class="fix-block">
        <p>{{suffix}}</p>
    </div>
</div>
</template>

<script>
import core from './sub/core.vue';

export default {
    name: "FvTextBox",
    components: {
        core
    },
    props: {
        value: {
            default: ""
        },
        mode: {
            default: "default"
        },
        placeholder: {
            default: ""
        },
        type: {
            default: "text"
        },
        mask: {
            type: String,
            default: "mask:___"
        },
        flag: {
            type: String,
            default: "_"
        },
        pattern: {
            type: String,
            default: "[\S\s]*"
        },
        readonly: {
            default: false
        },
        maxlength: {
            default: ''
        },
        prefix: {
            default: ""
        },
        suffix: {
            default: ""
        },
        leftIcon: {
            default: ""
        },
        icon: {
            default: ""
        },
        underline: {
            default: false
        },
        background: {
            default: ""
        },
        borderWidth: {
            default: ""
        },
        borderColor: {
            default: ""
        },
        focusBorderColor: {
            default: ""
        },
        status: {
            default: ""
        },
        disabled: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            isFocus: false,
            styles: {
                textBox: {
                    background: this.background,
                    borderWidth: `${this.borderWidth}px`,
                    borderColor: `${this.borderColor}`
                }
            },
            focusStyles: {
                textBox: {
                    background: this.background,
                    borderWidth: `${this.borderWidth}px`,
                    borderColor: `${this.focusBorderColor}`
                }
            }
        };
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit("input", val);
        },
        background (val) {
            this.stylesInit();
            this.onFocusStylesInit();
        },
        borderWidth (val) {
            this.stylesInit();
            this.onFocusStylesInit();
        },
        borderColor (val) {
            this.stylesInit();
        },
        focusBorderColor (val) {
            this.onFocusStylesInit();
        }
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isUnderline () {
            return (
                this.underline.toString() == "true" ||
                this.underline == "underline" ||
                this.underline === ""
            );
        },
        isDisabled () {
            return (
                this.disabled.toString() == "true" ||
                this.disabled == "disabled" ||
                this.disabled === ""
            );
        }
    },
    mounted () {
        this.stylesInit();
        this.onFocusStylesInit();
    },
    methods: {
        stylesInit () {
            this.styles.textBox.background = this.background;
            this.styles.textBox.borderWidth = `${this.borderWidth}px`;
            this.styles.textBox.borderColor = this.borderColor;
        },
        onFocusStylesInit () {
            this.focusStyles.textBox.background = this.background;
            this.focusStyles.textBox.borderWidth = `${this.borderWidth}px`;
            this.focusStyles.textBox.borderColor = this.focusBorderColor;
        }
    }
};
</script>
