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
        target: {
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
            }
        }
    },
    watch: {
        target (val) {
            try
            {
                val.removeEventListener('scroll', this.event);
                val.addEventListener('scroll', this.event);
            }
            catch (e)
            {
                console.log('VFluent ScrollStory', e);
            }
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
        setTimeout(() => {
            this.refreshBounding();
            try {
                this.target.removeEventListener('scroll', this.event);
                this.target.addEventListener('scroll', this.event);
            } catch (e) {
                console.log('VFluent ScrollStory', e);
            }
        }, 300);
        window.addEventListener('scroll', event => {
            this.refreshBounding();
        });
    },
    methods: {
        refreshBounding () {
            this.bounding = this.$el.getBoundingClientRect();
            if(this.bounding.top < window.innerHeight)
                this.show = true;
            if(this.bounding.top > window.innerHeight && this.infinite)
                this.show = false;
            if(this.bounding.bottom < 100 && this.overCollapse)
                this.show = false;
            this.$emit("scroll", this.show);
        }
    }
}
</script>
