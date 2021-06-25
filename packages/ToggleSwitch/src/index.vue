<template>
<div :class="['fv-'+$theme+'-ToggleSwitch', isDisabled ? 'disabled' : '']" @click="toggle">
    <div class="fv-toggle-border" :class="{'toggle-on': thisValue}" :style="styles.toggleStyle()">
        <p class="fv-toggle-ring" :style="styles.themeRingStyle()"></p>
    </div>
    <p class="fv-toggle-content" :style="styles.themeContentStyle()">{{thisValue ? on: off}}</p>
</div>
</template>

<script>
export default {
    name: "FvToggleSwitch",
    props: {
        value: {
            default: false
        },
        on: {
            default: 'On'
        },
        off: {
            default: 'Off'
        },
        onForeground: {
            default: ''
        },
        offForeground: {
            default: ''
        },
        borderColor: {
            default: ''
        },
        ringBackground: {
            default: ''
        },
        switchOnBackground: {
            default: ''
        },
        disabled: {
            default: false
        },
        theme: {
            default: 'system'
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
        }
    },
    data () {
        return {
            thisValue: this.value,
            styles: {
                toggleStyle: () => {
                    if(!this.thisValue)
                        return {
                            borderColor: this.borderColor
                        }
                    else
                        return {
                            background: this.switchOnBackground
                        }
                },
                themeRingStyle: () => {
                    if(!this.thisValue)
                        return {
                            background: this.ringBackground
                        }
                },
                themeContentStyle: () => {
                    if(!this.thisValue)
                        return {
                            color: this.offForeground
                        }
                    else
                        return{
                            color: this.onForeground
                        }
                }
            }
        };
    },
    computed: {
        $theme() {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isDisabled () {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        }
    },
    methods:{
        toggle () {
            if(this.isDisabled)
                return 0;
            this.thisValue = !this.thisValue;
            this.$emit('toggle', this.thisValue);
        }
    }
};
</script>
