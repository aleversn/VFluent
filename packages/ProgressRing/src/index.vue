<template>
<div :class="['fv-'+$theme+'-progressRing', size]">
    <p v-for="i in 5" :style="styles.p" :key="i"></p>
</div>
</template>

<script>
export default {
    name: "FvProgressRing",
    props: {
        size: {
            default: 'xs'
        },
        color: {
            default: ''
        }
    },
    data () {
        return {
            styles: {
                p: {
                    background: ''
                }
            }
        };
    },
    watch: {
        color (val) {
            this.stylesInit();
        }
    },
    computed: {
        $theme() {
            return this.$fvGlobal.state.theme;
        }
    },
    mounted () {
        this.stylesInit();
    },
    methods: {
        stylesInit () {
            this.styles.p.background = this.color;
        }
    }
};
</script>
