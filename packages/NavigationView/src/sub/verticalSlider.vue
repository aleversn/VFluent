<template>
<div class="slider">
    <span class="s" :style="{'margin-top': `${thisTop}px`, height: `${thisHeight}px`}">
        <p :style="{background: styles.slider.background}"></p>
    </span>
</div>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        top: {
            default: 0
        },
        height: {
            default: 60
        },
        background: {
            default: ""
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisTop: 0,
            thisHeight: 60,
            styles: {
                slider: {
                    background: ""
                }
            }
        }
    },
    watch: {
        top () {
            this.moveInit();
        },
        height () {
            this.moveInit();
        },
        background () {
            this.stylesInit();
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
        this.moveInit();
        this.stylesInit();
    },
    methods: {
        moveInit () {
            let disTop = this.top - this.thisTop;
            if(disTop > 0)
                this.heightExpandToBottom(disTop);
            else
                this.heightExpandToTop(disTop);
        },
        stylesInit () {
            this.styles.slider.background = this.background;
        },
        heightExpandToBottom (disTop) {
            let addHeight = Math.abs(disTop) + this.height;
            gsap.to(this.$data, {
				thisHeight: addHeight,
                duration: 0.3,
                delay: 0.08,
                ease: "expo.inOut",
                onComplete: this.heightFormatToBottom
			});
        },
        heightFormatToBottom () {
            gsap.to(this.$data, {
                thisTop: this.top,
				thisHeight: this.height,
				duration: 0.2,
				ease: "power3.out"
			});
        },
        heightExpandToTop (disTop) {
            let addHeight = Math.abs(disTop) + this.height;
            gsap.to(this.$data, {
                thisTop: this.top,
				thisHeight: addHeight,
                duration: 0.3,
                delay: 0.08,
                ease: "expo.inOut",
                onComplete: this.heightFormatToTop
			});
        },
        heightFormatToTop () {
            gsap.to(this.$data, {
				thisHeight: this.height,
				duration: 0.2,
				ease: "power3.out"
			});
        }
    }
}
</script>