<template>
<div :class="'fv-'+$theme+'-ScrollStory'">
    <transition :name="name">
        <div v-show="show">
            <slot>
                <p>Scroll Story</p>
            </slot>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name:'FvScrollStory',
    props: {
        name: {
            default: ''
        },
        overCollapse: {
            default: false
        },
        infinite: {
            default: false
        },
        theme: {
			type: String,
			default: "system"
		}
    },
    data () {
        return {
            show: false,
            bounding: Infinity,
            event: () => {
                this.refreshBounding();
            },
            timer: {}
        }
    },
    watch: {
        show (val) {
            this.$emit("show-changed", val);
        }
    },
    computed:{
        $theme() {
          if (this.theme=='system')
              return this.$fvGlobal.state.theme;
          return this.theme;
        }
    },
    mounted () {
        this.timerInit();
    },
    methods: {
        timerInit () {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.refreshBounding();
            }, 30);
        },
        refreshBounding () {
            this.bounding = this.$el.getBoundingClientRect();
            if(this.bounding.top < window.innerHeight)
                this.show = true;
            if(this.bounding.top > window.innerHeight && this.infinite)
                this.show = false;
            if(this.bounding.bottom < 100 && this.overCollapse)
                this.show = false;
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>
