<template>
<div class="calendar-picker-drop-down" :style="styles.dropDownBox" :title="inputValue">
    <div class="calendar-picker-drop-down-container">
        <slot name="input" :placeholder="placeholder" :value="inputValue">
            <input :placeholder="placeholder" readonly :value="inputValue" :style="styles.input"/>
            <i class="right-icon ms-Icon" :class="[`ms-Icon--${dropDownIcon}`]" aria-hidden="true" :style="styles.icon"></i>
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
        theme: {
            default: 'system'
        }
    },
    data () {
        return {
            choosenValue: this.value,
            styles: {
                dropDownBox: {
                    padding: '2px',
                    borderRadius: ''
                },
                input: {
                    color: '',
                    background: ''
                },
                icon: {
                    color: ''
                }
            }
        };
    },
    watch: {
        value (val) {
            this.choosenValue = val;
        },
        choosenValue (val) {
            this.$emit('input', val);
        },
        borderWidth () {
            this.stylesInit();
        },
        borderRadius () {
            this.stylesInit();
        },
        inputForeground () {
            this.stylesInit();
        },
        inputBackground () {
            this.stylesInit();
        },
        dropDownIconForeground () {
            this.stylesInit();
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
        this.FRInit();
        this.stylesInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffectsMasked("body", {
                selector: this.$el,
                childrenSelector: this.$el.querySelectorAll('.calendar-picker-drop-down-container input'),
                borderGradientSize: 80,
                backgroundGradientSize: 120,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        stylesInit () {
            this.styles.dropDownBox.padding = `${this.borderWidth}px`;
            this.styles.dropDownBox.borderRadius = `${this.borderRadius}px`;
            this.styles.input.color = this.inputForeground;
            this.styles.input.background = this.inputBackground;
            this.styles.icon.color = this.dropDownIconForeground;
        }
    }
};
</script>