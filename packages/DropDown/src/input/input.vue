<template>
<div class="drop-down-box" :style="{padding: `${borderWidth}px`, 'border-radius': `${borderRadius}px`}">
    <div class="drop-down-container" :style="{background: inputBackground, 'border-radius': `${borderRadius}px`}">
        <slot name="input" :placeholder="placeholder" :value="inputValue">
            <input class="fv-drop-down-input" :placeholder="placeholder" readonly :value="inputValue" :style="{color: inputForeground}"/>
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
            default: 2
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
        dropDownIcon: {
            default: 'ChevronDown'
        },
        dropDownIconForeground: {
            default: ''
        },
        theme: {
            default: 'system'
        }
    },
    data () {
        return {
            choosenValue: this.value
        };
    },
    watch: {
        value (val) {
            this.choosenValue = val;
        },
        choosenValue (val) {
            this.$emit('input', val);
        },
        theme (val) {
            this.FRInit();
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
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor () {
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
        this.FRInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffectsMasked("body", {
                selector: this.$el,
                childrenSelector: this.$el.querySelectorAll('input'),
                borderGradientSize: 80,
                backgroundGradientSize: 120,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        valueTrigger (val) {
            if(typeof(val) === 'function')  return val();
            return val;
        }
    }
};
</script>