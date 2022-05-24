<template>
    <div :class="['fv-'+$theme+'-VerifyBox']">
        <div v-if="thisValue.length === length" class="fv-verify-container" @paste="handlePaste($event)">
            <fv-text-box
                :value="thisValue[idx]"
                class="fv-verify-unit"
                :theme="theme"
                v-for="(i, idx) in length"
                :key="idx"
                :disabled="isDisabled"
                :maxlength="1"
                :underline="underline"
                :background="background"
                :border-width="borderWidth"
                :border-color="borderColor"
                :focus-border-color="focusBorderColor"
                :font-size="fontSize"
                :font-weight="fontWeight"
                :foreground="foreground"
                :textAlign="'center'"
                :border-radius="borderRadius"
                :is-box-shadow="isBoxShadow"
                :reveal-border="revealBorder"
                :ref="`t${idx}`"
                @keydown="handleKeyDown($event, idx)"
            ></fv-text-box>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvVerifyBox',
    props: {
        value: {
            default: ""
        },
        length: {
            default: 4
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
            default: 18
        },
        fontWeight: {
            default: 'bold'
        },
        foreground: {
            default: ""
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
            thisValue: [],
        }
    },
    watch: {
        value () {
            this.valueFormat();
        },
        thisValue: {
            deep: true,
            handler (val) {
                this.$emit('input', val.join(""));
            }
        }
    },
    computed: {
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
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.valueFormat();
    },
    methods: {
        valueFormat () {
            this.thisValue = [];
            for(let i = 0; i < this.length; i++) {
                if(this.value[i])
                    this.thisValue.push(this.value[i]);
                else
                    this.thisValue.push("");
            }
        },
        handleKeyDown (event, idx) {
            event.preventDefault();
            if(event.key.length === 1 && !event.ctrlKey) {
                this.$set(this.thisValue, idx, event.key);
            }
            if(event.keyCode === 8) {
                this.$set(this.thisValue, idx, "");
                if(idx > 0) {
                    let target = this.$refs[`t${idx - 1}`][0];
                    target.focus();
                }
                return;
            }
            if(event.keyCode === 13) {
                this.$emit('confirm', this.thisValue.join(""));
            }
            if(idx < this.length - 1 && (event.key.length === 1 || event.keyCode === 9)) {
                let target = this.$refs[`t${idx + 1}`][0];
                target.focus();
            }
            if(idx === this.length - 1) {
                this.$emit('confirm', this.thisValue.join(""));
            }
        },
        handlePaste(event) {
            let data = event.clipboardData.getData('text/plain');
            for(let i = 0; i < this.length; i++) {
                this.$set(this.thisValue, i, data[i]);
            }
        }
    }
}
</script>
