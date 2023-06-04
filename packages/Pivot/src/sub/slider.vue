<template>
    <div class="slider">
        <span
            class="fv-pivot-s"
            :class="[{'is-boxshadow': sliderBoxshadow}]"
            :style="{'margin-left': `${domLeft}px`, width: `${domWidth}px`}"
        >
            <p :style="{background: background}"></p>
        </span>
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        els: {
            default: () => null,
        },
        sliderBoxshadow: {
            default: false,
        },
        background: {
            default: '',
        },
        theme: {
            type: String,
            default: 'system',
        },
    },
    data() {
        return {
            domLeft: 0,
            domWidth: 60,
            styles: {
                slider: {
                    background: '',
                },
            },
        };
    },
    watch: {
        left(val) {
            this.moveInit();
        },
        width(val) {
            this.moveInit();
        },
    },
    computed: {
        left() {
            let { els, index } = this.els();
            let left = 0;
            for (let i = 0; i < index; i++) {
                let elItem = els[i];
                if (!elItem.el || !elItem.show) left += 0;
                else {
                    let elWidth = elItem.el.clientWidth;
                    left += elWidth;
                }
            }
            return left;
        },
        width() {
            let { els, index } = this.els();
            let elItem = els[index];
            if (elItem.el) return elItem.el.clientWidth;
            return 60;
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    mounted() {
        this.moveInit();
    },
    methods: {
        moveInit() {
            let disLeft = this.left - this.domLeft;
            if (disLeft > 0) this.widthExpandToRight(disLeft);
            else this.widthExpandToLeft(disLeft);
        },
        widthExpandToRight(disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
                domWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: 'expo.inOut',
                onComplete: this.widthFormatToRight,
            });
        },
        widthFormatToRight() {
            gsap.to(this.$data, {
                domLeft: this.left,
                domWidth: this.width,
                duration: 0.2,
                ease: 'power3.out',
            });
        },
        widthExpandToLeft(disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
                domLeft: this.left,
                domWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: 'expo.inOut',
                onComplete: this.widthFormatToLeft,
            });
        },
        widthFormatToLeft() {
            gsap.to(this.$data, {
                domWidth: this.width,
                duration: 0.2,
                ease: 'power3.out',
            });
        },
    },
};
</script>