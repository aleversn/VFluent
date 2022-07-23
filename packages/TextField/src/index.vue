<template>
    <div :class="['fv-'+$theme+'-TextField', status, {focus: isFocus}, {disabled: isDisabled}, {underline: isUnderline}, { shadow: isBoxShadow }]" :style="[{ 'border': disabledBorderWhenReveal && revealBorder ? 'none' : `` }, { background: background, borderWidth: `${borderWidth}px`, borderColor: isFocus ? focusBorderColor : borderColor }, { borderRadius: `${borderRadius}px` }, { padding: revealBorder ? `${borderWidth}px` : ''}]">
        <div class="text-field-reveal-container" :style="{ background: background, borderRadius: `${borderRadius}px` }">
            <textarea v-model="thisValue" :placeholder="placeholder" class="fv-text-field-input" :readonly="isReadOnly" :disabled="isDisabled" :maxlength="maxlength" :style="{'font-size': `${fontSize}px`, 'font-weight': fontWeight, color: foreground, 'text-align': textAlign}" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)" @change="$emit('change', $event)" @paste="$emit('paste', $event)" @focus="focus(true, $event)" @blur="focus(false, $event)"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvTextField',
    props: {
        value: {
            default: ""
        },
        readonly: {
            default: false
        },
        placeholder: {
            default: ""
        },
        maxlength: {
            default: ''
        },
        disabled: {
            default: false
        },
        underline: {
            default: false
        },
        background: {
            default: ""
        },
        borderWidth: {
            default: 1
        },
        borderColor: {
            default: ""
        },
        focusBorderColor: {
            default: ""
        },
        fontSize: {
            default: 13.8
        },
        fontWeight: {
            default: 'normal'
        },
        foreground: {
            default: ""
        },
        textAlign: {
            default: 'left'
        },
        borderRadius: {
            default: 3
        },
        isBoxShadow: {
            default: false
        },
        revealBorder: {
            default: false
        },
        disabledBorderWhenReveal: {
            default: true
        },
        status: {
            default: ""
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            FR: null,
            thisValue: (typeof(this.value)).toString() == 'string' ? this.value : '',
            isFocus: false,
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit("input", val);
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isUnderline () {
            return (
                this.underline.toString() == "true" ||
                this.underline == "underline" ||
                this.underline === ""
            );
        },
        isReadOnly () {
            return (
                this.readonly.toString() == "true" ||
                this.readonly == "readonly" ||
                this.readonly === ""
            );
        },
        isDisabled () {
            return (
                this.disabled.toString() == "true" ||
                this.disabled == "disabled" ||
                this.disabled === ""
            );
        },
        borderLightColor () {
            return () => {
                if(this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.6)';
                }
                if(this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.6)';
                }
                return 'rgba(121, 119, 117, 0.6)';
            }
        },
        backgroundLightColor () {
            return () => {
                if(this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.3)';
                }
                if(this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.3)';
                }
                return 'rgba(121, 119, 117, 0.3)';
            }
        }
    },
    mounted () {
        if(this.revealBorder)
            this.FRInit();
    },
    methods: {
        FRInit () {
            this.FR = this.$RevealMasked.apply(this.$el, {
                maskedSelector: this.$el,
                borderGradientSize: 60,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor,
                selector: this.$el.querySelectorAll('.text-field-reveal-container')[0],
                status: () => this.isDisabled ? 'disabled' : 'enabled'
            });
        },
        focus(status, event) {
            this.isFocus = status;
            if(status)
                this.$emit('focus', event);
            else
                this.$emit('blur', event);
        }
    },
    beforeDestroy () {
        this.$RevealMasked.destroy(this.FR);
    }
}
</script>
