<template>
    <div :class="['fv-'+$theme+'-SwipeControl']">
        <div
            class="fv-swiper-container swiper-container"
            ref="container"
        >
            <div
                class="swiper-wrapper"
                ref="wrapper"
            >
                <div class="fv-SwipeControl-left swiper-slide">
                    <div
                        v-for="(item, index) in leftOptions"
                        class="fv-SwipeControl-btn"
                        :class="[valueTrigger(item.type)]"
                        :key="index"
                        :style="{width: index === leftOptions.length - 1 ? '' : `${opWidth / leftOptions.length}px`}"
                        @click="callFunc(item)"
                    >
                        <div
                            class="fv-SwipeControl-btn-content-block"
                            :style="{width: `${opWidth / leftOptions.length}px`}"
                        >
                            <i
                                v-show="valueTrigger(item.icon)"
                                class="ms-Icon"
                                :class="[`ms-Icon--${valueTrigger(item.icon)}`]"
                            ></i>
                            <p
                                v-show="valueTrigger(item.text)"
                                style="margin-left: 5px;"
                            >{{valueTrigger(item.text)}}</p>
                        </div>
                    </div>
                </div>
                <div class="fv-SwipeControl-main swiper-slide" :style="{padding: itemPadding}">
                    <slot>
                        Swipe Control
                    </slot>
                </div>
                <div class="fv-SwipeControl-right swiper-slide">
                    <div
                        v-for="(item, index) in thisOptions"
                        class="fv-SwipeControl-btn"
                        :class="[valueTrigger(item.type)]"
                        :key="index"
                        :style="{width: index === thisOptions.length - 1 ? '' : `${opWidth / thisOptions.length}px`}"
                        @click="callFunc(item)"
                    >
                        <div
                            class="fv-SwipeControl-btn-content-block"
                            :style="{width: `${opWidth / thisOptions.length}px`}"
                        >
                            <i
                                v-show="valueTrigger(item.icon)"
                                class="ms-Icon"
                                :class="[`ms-Icon--${valueTrigger(item.icon)}`]"
                            ></i>
                            <p
                                v-show="valueTrigger(item.text)"
                                style="margin-left: 5px;"
                            >{{valueTrigger(item.text)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper.min.css';

export default {
    name: 'FvSwipeControl',
    props: {
        value: {
            default: () => ({}),
        },
        minOpWidth: {
            default: 60,
        },
        maxOpWidth: {
            default: 300,
        },
        leftOptions: {
            default: () => [],
        },
        options: {
            default: () => [
                {
                    icon: 'Delete',
                    func: () => {},
                    type: 'delete',
                },
            ],
        },
        itemPadding: {
            default: '0 10px'
        },
        disabledLeft: {
            default: true,
        },
        disabledRight: {
            default: false,
        },
        disabledLeftFull: {
            default: true,
        },
        disabledRightFull: {
            default: false,
        },
        disabled: {
            default: false,
        },
        theme: {
            type: String,
            default: 'system',
        },
    },
    data() {
        return {
            status: 'normal', // normal, left, right, leftFull, rightFull
            triggerType: 'auto', // auto, manual
            swiper: null,
            swiperProgress: 0,
            slidesProgress: [],
            thisLeftOptions: this.leftOptions,
            thisOptions: this.options,
        };
    },
    watch: {
        value() {
            this.triggerType = 'auto';
            this.swiper.slideTo(1, 300, false);
            this.status = 'normal';
        },
        status(val) {
            this.$emit('status-change', val);
        },
        isDisabled(val) {
            if (val) this.swiper.disabled();
            else this.swiper.enable();
        },
    },
    computed: {
        computedProgress() {
            return (index) => this.slidesProgress[index];
        },
        computedWidth() {
            return (ratio) => {
                if (!this.swiper) return 0;
                return this.swiper.width * ratio;
            };
        },
        opWidth() {
            let width = this.computedWidth(0.3);
            if (width < this.minOpWidth) {
                width = this.minOpWidth;
            } else if (width > this.maxOpWidth) {
                width = this.maxOpWidth;
            }
            return width;
        },
        isDisabled() {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    mounted() {
        this.init();
        if (this.isDisabled) this.swiper.disable();
        else this.swiper.enable();
    },
    methods: {
        init() {
            this.swiper = new Swiper(this.$refs.container, {
                initialSlide: 1,
                slidesPerView: 1,
                longSwipesRatio: 2,
                shortSwipes: false,
                watchSlidesProgress: true,
                on: {
                    touchStart: (swiper) => {
                        this.triggerType = 'manual';
                    },
                    touchMove: (swiper, event) => {
                        this.refreshProgress(swiper);
                    },
                    touchEnd: (swiper, event) => {
                        this.refreshProgress(swiper);
                    },
                    transitionStart: (event) => {
                        if (this.triggerType === 'auto') return;
                        let progress = this.slidesProgress[1];
                        if (this.status != 'normal' && progress >= -0.5 && progress < 0.5) {
                            this.status = 'normal';
                            this.swiper.slideTo(1, 300, false);
                        } else if (progress < -0.1 && progress >= -0.5) {
                            if (this.disabledLeft) {
                                this.status = 'normal';
                                this.swiper.slideTo(1, 300, false);
                            } else {
                                this.swiper.setTransition(300);
                                this.swiper.setTranslate(-this.computedWidth(0.7));
                                this.status = 'left';
                            }
                        } else if (progress < -0.5) {
                            if (!this.disabledLeftFull) {
                                this.swiper.slidePrev();
                                this.status = 'leftFull';
                            } else this.swiper.slideTo(1, 300, false);
                        } else if (progress > 0.1 && progress <= 0.5) {
                            if (this.disabledRight) {
                                this.status = 'normal';
                                this.swiper.slideTo(1, 300, false);
                            } else {
                                this.swiper.setTransition(300);
                                this.swiper.setTranslate(-this.computedWidth(1.3));
                                this.status = 'right';
                            }
                        } else if (progress > 0.5) {
                            if (!this.disabledRightFull) {
                                this.swiper.slideNext();
                                this.status = 'rightFull';
                            } else this.swiper.slideTo(1, 300, false);
                        }
                    },
                    transitionEnd: (swiper, event) => {
                        this.triggerType = 'auto';
                        this.refreshProgress(swiper);
                        if (this.status == 'rightFull') this.callFunc(this.thisOptions[this.thisOptions.length - 1]);
                        else if (this.status == 'leftFull') this.callFunc(this.thisLeftOptions[this.thisLeftOptions.length - 1]);
                    },
                },
            });
        },
        refreshProgress(swiper) {
            this.swiperProgress = swiper.progress;
            let slidesProgress = [];
            for (let i = 0; i < swiper.slides.length; i++) {
                slidesProgress.push(swiper.slides[i].progress);
            }
            this.slidesProgress = slidesProgress;
        },
        callFunc(item) {
            if (this.valueTrigger(item.disabled)) return;
            if (item.func) item.func(this.value);
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
    },
};
</script>
