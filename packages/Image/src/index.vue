<template>
<div :class="'fv-'+$theme+'-Image'">
    <transition name="fade-in">
        <img v-show="status" draggable="false" alt="" :src="thisSrc" ref="img"/>
    </transition> 
</div>
</template>

<script>
export default {
    name:'FvImage',
    props: {
        src: {
            default: ""
        },
        onlazy: {
            default: false
        },
        theme:{
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisSrc: "",
            status: false,
            lazy: this.onlazy,
            lazyTimer: {}
        }
    },
    watch: {
        src (to, from) {
            if(to !== from)
                this.status = false;
        },
        lazy (val) {
            if(val === false)
                this.thisSrc = this.src;
        },
        onlazy (val) {
            this.lazy = val;
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.watchImgInit();
        if(this.lazy)
            this.lazyInit();
        else
            this.thisSrc = this.src;
    },
    methods: {
        watchImgInit () {
            this.$refs.img.onload = event => {
                this.status = true;
            }
        },
        lazyInit () {
            clearInterval(this.lazyTimer);
            this.lazyTimer = setInterval(() => {
                if(this.$el.getBoundingClientRect().top < window.innerHeight)
                {
                    this.lazy = false;
                    clearInterval(this.lazyTimer);
                }
            }, 300);
        }
    },
    beforeDestroy () {
        clearInterval(this.lazyTimer);
    }
}
</script>