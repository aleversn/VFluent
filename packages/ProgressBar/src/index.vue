<template>
<div :class="['fv-'+$theme+'-ProgressBar', loading.toString() != 'true' ? 'normal' : '', isDisabled ? 'disabled' : '']" :style="{background: background}">
    <p v-show="loading.toString() == 'true'" v-for="i in 5" class="unit" :style="{background: foreground}" :key="i"></p>
    <i v-show="loading.toString() != 'true'" :style="{'width':(percent <= 100 ? percent : 100)+'%', background: foreground}"></i>
</div>
</template>

<script>
export default {
    name: "FvProgressBar",
    props: {
        value: {
            default: 0
        },
        foreground: {
            default: ''
        },
        background: {
            default: ''
        },
        loading: {
            default: false
        },
        disabled: {
            default: false
        }
    },
    data () {
        return {
            percent: this.value
        };
    },
    watch: {
        value (val) {
            this.percent = val;
        },
        percent (val) {
            this.$emit('input', val);
            this.$emit('progress-change', val);
            if(val >= 100)
                this.$emit('progress-finished', val);
        }
    },
    computed: {
        $theme() {
            return this.$fvGlobal.state.theme;
        },
        isDisabled () {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        }
    }
};
</script>
