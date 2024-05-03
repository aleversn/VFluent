<template>
    <div :class="[
            'fv-' + $theme + '-slider',
            {vertical, disabled: isDisabled}
        ]">
        <div
            class="fv-slider-main"
            ref="bar"
            :style="{background: progress >= 100 ? color : background ? background : ''}"
        >
            <div
                ref="btn"
                class="fv-slider-ring-container"
                :style="{left: finalLeft + 'px', top: finalTop + 'px', background: iconWrapperBackground}"
                @mousedown="forward"
                @mouseup="stop"
                @touchstart="forward"
                @touchend="stop"
            >
                <i
                    class="ms-Icon fv-slider-ring-icon"
                    :class="[`ms-Icon--${icon}`]"
                    :style="{color: color}"
                ></i>
            </div>
            <div
                class="fv-slider-loaded"
                :style="{width: !vertical ? finalLeft + btnEl.width / 2 + 'px' : '', height: vertical ? finalTop + btnEl.height / 2 + 'px' : '', background: color}"
            ></div>
            <div
                v-show="isShowLabel && moveable"
                class="fv-slider-label"
                :title="progress"
                :style="{left: !vertical ? finalLeft - 20 + btnEl.width / 2 + 'px' : '', top: vertical ? finalTop - 14 + btnEl.height / 2 + 'px' : ''}"
            >
                <slot :value="progress">
                    <p>{{progress}}</p>
                </slot>
            </div>
            <div class="fv-slider-unit-container">
                <i
                    v-for="(item, index) in scaleList"
                    :key="`top: ${index}`"
                    class="fv-slider-unit-item first"
                    :style="{left: !vertical ? `calc(${item.ratio * (barEl.width - btnEl.width) + btnEl.width / 2}px)` : '', top: vertical ? `calc(${item.ratio * (barEl.height - btnEl.height) + btnEl.height / 2}px)` : ''}"
                ></i>
                <i
                    v-for="(item, index) in scaleList"
                    :key="`bottom: ${index}`"
                    class="fv-slider-unit-item second"
                    :style="{left: !vertical ? `calc(${item.ratio * (barEl.width - btnEl.width) + btnEl.width / 2}px)` : '', top: vertical ? `calc(${item.ratio * (barEl.height - btnEl.height) + btnEl.height / 2}px)` : ''}"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
import '../../office-ui-fabric-core/dist/css/fabric.min.css';
export default {
    name: 'FvSlider',
    props: {
        theme: {
            type: String,
            default: 'system'
        },
        disabled: {
            default: false
        },
        value: {
            default: 0
        },
        unit: {
            default: 1
        },
        maxinum: {
            default: 100
        },
        mininum: {
            default: 0
        },
        icon: {
            type: String,
            default: 'CircleFill'
        },
        vertical: {
            default: false
        },
        showLabel: {
            default: false
        },
        scale: {
            type: [Boolean, Number],
            default: false
        },
        color: {
            default: ''
        },
        background: {
            default: ''
        },
        iconWrapperBackground: {
            default: ''
        }
    },
    data() {
        return {
            progress: this.getValue(this.value), //percent,
            moveable: false,
            mouseDownPos: {
                disX: 0,
                disY: 0
            },
            currentLeft: 0,
            currentTop: 0,
            freezeTransition: false,
            btnEl: {
                width: 0,
                height: 0
            },
            barEl: {
                width: 0,
                height: 0
            }
        };
    },
    watch: {
        value(val, old) {
            this.$nextTick(() => {
                this.progress = this.getValue(val);
                this.setPos();
            });
        },
        progress(val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        finalLeft() {
            if (this.moveable) this.progress = this.setProgress();
        },
        finalTop() {
            if (this.moveable) this.progress = this.setProgress(true);
        }
    },
    computed: {
        $theme() {
            if (this.theme === 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        isShowLabel() {
            return this.showLabel.toString() == 'true' || this.showLabel === '';
        },
        finalLeft() {
            if (this.vertical) return -7.5;
            if (this.currentLeft < 0) return 0;
            if (this.currentLeft > this.barEl.width - this.btnEl.width)
                return this.barEl.width - this.btnEl.width;
            return this.currentLeft;
        },
        finalTop() {
            if (!this.vertical) return -7.5;
            if (this.currentTop < 0) return 0;
            if (this.currentTop > this.barEl.height - this.btnEl.height)
                return this.barEl.height - this.btnEl.height;
            return this.currentTop;
        },
        scaleList() {
            if (!this.scale) return [];
            let result = [];
            let i = 0;
            let max = this.maxinum - this.mininum;
            while (i <= max) {
                result.push({
                    ratio: i / max
                });
                i += this.scale;
            }
            return result;
        },
        unitList() {
            let result = [];
            let i = 0;
            let max = this.maxinum - this.mininum;
            while (i <= max) {
                result.push({
                    ratio: i / max,
                    value: this.mininum + i
                });
                i += this.unit;
            }
            return result;
        }
    },
    mounted() {
        this.Init();
        this.resizeInit();
    },
    methods: {
        Init() {
            window.addEventListener('mousemove', (event) => {
                if (this.moveable) {
                    this.currentLeft = event.clientX - this.mouseDownPos.disX;
                    this.currentTop = event.clientY - this.mouseDownPos.disY;
                }
            });
            window.addEventListener('touchmove', (event) => {
                event = event.targetTouches[0];
                if (this.moveable) {
                    this.currentLeft = event.clientX - this.mouseDownPos.disX;
                    this.currentTop = event.clientY - this.mouseDownPos.disY;
                }
            });
            window.addEventListener('mouseup', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
            window.addEventListener('touchup', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
        },
        resizeInit() {
            const btnObserver = new ResizeObserver(() => {
                if (this.$refs.btn) {
                    this.btnEl.width = this.$refs.btn.clientWidth;
                    this.btnEl.height = this.$refs.btn.clientHeight;
                    this.setPos();
                }
            });
            btnObserver.observe(this.$refs.btn);
            const barObserver = new ResizeObserver(() => {
                if (this.$refs.bar) {
                    this.barEl.width = this.$refs.bar.clientWidth;
                    this.barEl.height = this.$refs.bar.clientHeight;
                    this.setPos();
                }
            });
            barObserver.observe(this.$refs.bar);
        },
        forward(event) {
            if (this.isDisabled) return;
            this.moveable = true;
            this.freezeTransition = true;
            event.preventDefault();
            let { clientX, clientY } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            this.mouseDownPos.disX = clientX - this.$refs.btn.offsetLeft;
            this.mouseDownPos.disY = clientY - this.$refs.btn.offsetTop;
        },
        correctPos() {
            if (this.$refs.btn.offsetLeft < -this.$refs.btn.clientWidth / 2)
                this.currentLeft = 0;
            if (this.$refs.btn.offsetTop < -this.$refs.btn.clientHeight / 2)
                this.currentTop = 0;
            if (
                this.$refs.btn.offsetLeft + this.$refs.btn.clientWidth >
                this.$refs.bar.clientWidth
            )
                this.currentLeft =
                    this.$refs.bar.clientWidth - this.$refs.btn.clientWidth;
            if (
                this.$refs.btn.offsetTop + this.$refs.btn.clientHeight >
                this.$refs.bar.clientHeight
            )
                this.currentTop =
                    this.$refs.bar.clientHeight - this.$refs.btn.clientHeight;
            for (let i = 0; i < this.unitList.length; i++) {
                let curRatio =
                    this.currentLeft / (this.barEl.width - this.btnEl.width);
                let fromRatio = this.unitList[i].ratio;
                let toRatio = this.unitList[i + 1]
                    ? this.unitList[i + 1].ratio
                    : 1;
                if (curRatio >= fromRatio && curRatio <= toRatio) {
                    if (curRatio - fromRatio < toRatio - curRatio) {
                        this.currentLeft =
                            fromRatio * (this.barEl.width - this.btnEl.width);
                    } else {
                        this.currentLeft =
                            toRatio * (this.barEl.width - this.btnEl.width);
                    }
                    if (!this.vertical) this.progress = this.setProgress();
                    break;
                }
            }
            for (let i = 0; i < this.unitList.length; i++) {
                let curRatio =
                    this.currentTop / (this.barEl.height - this.btnEl.height);
                let fromRatio = this.unitList[i].ratio;
                let toRatio = this.unitList[i + 1]
                    ? this.unitList[i + 1].ratio
                    : 1;
                if (curRatio >= fromRatio && curRatio <= toRatio) {
                    if (curRatio - fromRatio < toRatio - curRatio) {
                        this.currentTop =
                            fromRatio * (this.barEl.height - this.btnEl.height);
                    } else {
                        this.currentTop =
                            toRatio * (this.barEl.height - this.btnEl.height);
                    }
                    if (this.vertical) this.progress = this.setProgress(true);
                    break;
                }
            }
        },
        stop() {
            if (this.isDisabled) return;
            this.moveable = false;
            this.freezeTransition = false;
            this.correctPos();
            this.$emit('click', this.progress);
            setTimeout(() => {
                this.freezeTransition = true;
            }, 300);
        },
        getValue(val) {
            if (val < this.mininum) val = this.mininum;
            else if (val > this.maxinum) val = this.maxinum;
            val = parseFloat(val).toFixed(0);
            return val;
        },
        setPos() {
            if (!this.btnEl.width || !this.barEl.width) return;
            if (this.vertical)
                this.currentTop =
                    (this.progress / (this.maxinum - this.mininum)) *
                    (this.barEl.height - this.btnEl.height);
            else
                this.currentLeft =
                    (this.progress / (this.maxinum - this.mininum)) *
                    (this.barEl.width - this.btnEl.width);
        },
        setProgress(vertical = false) {
            if (!vertical) {
                let ratio =
                    this.finalLeft / (this.barEl.width - this.btnEl.width);
                ratio = ratio * (this.maxinum - this.mininum) + this.mininum;
                return ratio.toFixed(0);
            }
            let ratio = this.finalTop / (this.barEl.height - this.btnEl.height);
            ratio = ratio * (this.maxinum - this.mininum) + this.mininum;
            return ratio.toFixed(0);
        }
    }
};
</script>
