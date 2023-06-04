<template>
<div class="drop-down-box" :style="{'border-radius': `${borderRadius}px`}">
    <div class="drop-down-container" :style="{background: inputBackground, 'border-radius': `${borderRadius}px`}">
        <fv-reveal-container
            :parent="() => $el"
            class="fv-dropdown-reveal-container"
            :backgroundColor="backgroundLightColor"
            :borderColor="borderLightColor"
            :backgroundGradientSize="120"
            :borderGradientSize="80"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :disabled="disabled"
        ></fv-reveal-container>
        <slot name="input" :placeholder="placeholder" :value="inputValue">
            <input class="fv-drop-down-input" :placeholder="placeholder" readonly :value="inputValue" :style="{color: inputForeground, 'border-radius': `${borderRadius}px`, borderWidth: `${borderWidth}px`, borderColor: inputBorderColor}"/>
            <i class="right-icon ms-Icon" :class="[`ms-Icon--${dropDownIcon}`]" :style="{color: dropDownIconForeground}"></i>
        </slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => []
        },
        borderWidth: {
            default: 1
        },
        placeholder: {
            default: 'Dropdown'
        },
        borderRadius: {
            default: '3'
        },
        inputForeground: {
            default: ''
        },
        inputBackground: {
            default: ''
        },
        inputBorderColor: {
            default: ''
        },
        dropDownIcon: {
            default: 'ChevronDown'
        },
        dropDownIconForeground: {
            default: ''
        },
        revealBorderColor: {
            default: false
        },
        revealBackgroundColor: {
            default: false
        },
        disabled: {
            default: false,
        },
        theme: {
            default: 'system'
        }
    },
    data () {
        return {
            FR: null,
            choosenValue: this.value
        };
    },
    watch: {
        value (val) {
            this.choosenValue = val;
        },
        choosenValue (val) {
            this.$emit('input', val);
        }
    },
    computed: {
        $theme () {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        inputValue () {
            let result = '';
            for(let item of this.choosenValue) {
                if(result == '')
                    result += this.valueTrigger(item.text);
                else
                    result += `,${this.valueTrigger(item.text)}`;
            }
            return result;
        },
        borderLightColor () {
            if(this.revealBorderColor) return this.revealBorderColor;
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor () {
            if(this.revealBackgroundColor) return this.revealBackgroundColor;
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        }
    },
    mounted () {
    },
    methods: {
        valueTrigger (val) {
            if(typeof(val) === 'function')  return val();
            return val;
        }
    }
};
</script>