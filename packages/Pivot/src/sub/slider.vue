<template>
<div class="slider">
    <span class="s" :style="{'margin-left': `${thisLeft}px`, width: `${thisWidth}px`}">
        <p :style="{background: styles.slider.background}"></p>
    </span>
</div>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        left: {
            default: 0
        },
        width: {
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
            thisLeft: 0,
            thisWidth: 60,
            styles: {
                slider: {
                    background: ""
                }
            }
        }
    },
    watch: {
        left (val) {
            this.moveInit();
        },
        width (val) {
            this.moveInit();
        },
        background (val) {
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
            let disLeft = this.left - this.thisLeft;
            if(disLeft > 0)
                this.widthExpandToRight(disLeft);
            else
                this.widthExpandToLeft(disLeft);
        },
        stylesInit () {
            this.styles.slider.background = this.background;
        },
        widthExpandToRight (disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
				thisWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: "expo.inOut",
                onComplete: this.widthFormatToRight
			});
        },
        widthFormatToRight () {
            gsap.to(this.$data, {
                thisLeft: this.left,
				thisWidth: this.width,
				duration: 0.2,
				ease: "power3.out"
			});
        },
        widthExpandToLeft (disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
                thisLeft: this.left,
				thisWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: "expo.inOut",
                onComplete: this.widthFormatToLeft
			});
        },
        widthFormatToLeft () {
            gsap.to(this.$data, {
				thisWidth: this.width,
				duration: 0.2,
				ease: "power3.out"
			});
        }
    }
}
</script>