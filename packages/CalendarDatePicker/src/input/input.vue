<template>
<div class="calendar-picker-drop-down" :style="{ borderRadius: `${borderRadius}px`}" :title="inputValue">
    <fv-reveal-container
        :parent="() => $el"
        class="fv-calendar-date-picker-reveal-container"
        :backgroundColor="backgroundLightColor"
        :borderColor="borderLightColor"
        :backgroundGradientSize="120"
        :borderGradientSize="80"
        :borderWidth="borderWidth"
        :borderRadius="borderRadius"
        :disabled="disabled"
    ></fv-reveal-container>
    <div class="calendar-picker-drop-down-container" :style="{borderRadius: `${borderRadius}px`}">
        <slot name="input" :placeholder="placeholder" :value="inputValue">
            <input class="input" :placeholder="placeholder" readonly :value="inputValue" :style="{ color: inputForeground, background: inputBackground, borderRadius: `${borderRadius}px`}"/>
            <i class="right-icon ms-Icon" :class="[`ms-Icon--${dropDownIcon}`]" aria-hidden="true" :style="{color: dropDownIconForeground}"></i>
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
            default: 'Pick a day'
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
            default: 'CalendarDay'
        },
        dropDownIconForeground: {
            default: ''
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
            choosenValue: this.value,
            FR: null
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
            let result = "";
            for(let i = 0; i < this.choosenValue.length; i++) {
                if(i > 0)
                    result += `,`;
                result += `${this.choosenValue[i].year}-${this.choosenValue[i].month + 1}-${this.choosenValue[i].no}`;
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
    },
    methods: {
        
    }
};
</script>