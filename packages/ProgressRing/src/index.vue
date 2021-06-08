<template>
<div :class="['fv-'+$theme+'-progressRing']" :style="{width: `${r * 2}px`, height: `${r * 2}px`}">
    <svg v-show="!legacy" :width="`${r * 2}px`" :height="`${r * 2}px`" class="svg">
        <circle :r="r - borderWidth" :cy="r" :cx="r" :stroke-width="borderWidth" :stroke="background" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
        <circle class="progress-rotate" :r="r - borderWidth" :cy="r" :cx="r" :stroke-width="borderWidth" :stroke="color" stroke-linejoin="round" stroke-linecap="round" fill="none" :stroke-dashoffset="`${loading ? l - Loading.ratio / 100 * l : l - value / 100 * l}px`"  :stroke-dasharray="`${l}px`" :style="{transform: `rotate(${loading ? Loading.rotate : -90}deg)`}"/>
    </svg>
    <legacy v-show="legacy" :size="size" :color="color"></legacy>
</div>
</template>

<script>
import gsap from 'gsap';
import legacy from './legacy.vue';

export default {
    name: "FvProgressRing",
    components: {
        legacy
    },
    props: {
        value: {
            default: 0
        },
        size: {
            default: 'xs'
        },
        r: {
            default: 40
        },
        loading: {
            default: false
        },
        color: {
            default: 'rgba(0, 120, 215, 1)'
        },
        background: {
            default: 'rgba(204, 204, 204, 1)'
        },
        borderWidth: {
            default: 8
        },
        legacy: {
            default: false
        }
    },
    data () {
        return {
            thisValue: this.value,
            Loading: {
                ratio: 5,
                rotate: -90
            }
        };
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
        l () {
            return (2 * Math.PI * (this.r - this.borderWidth)).toFixed(2);
        },
        $theme() {
            return this.$fvGlobal.state.theme;
        }
    },
    mounted () {
        this.loadingInit();
    },
    methods: {
        loadingInit () {
            gsap.to(this.$data.Loading, {
                ratio: 70,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'linear'
            });

            gsap.to(this.$data.Loading, {
                rotate: 270,
                duration: 0.8,
                repeat: -1,
                ease: 'linear'
            });
        }
    }
};
</script>
