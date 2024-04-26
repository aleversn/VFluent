<template>
    <div
        :class="['fv-'+$theme+'-Affix']"
        :style="{position: mode === 'fixed' ? 'absolute' : '', width: isFixed ? computedWidth : 'auto', height: isFixed ? computedHeight : 'auto'}"
    >
        <div
            class="fv-affix-container"
            ref="container"
            :style="{position: isFixed ? 'fixed' : 'relative', left: isFixed ? computedLeft : '', top: isFixed ? computedTop : '', right: isFixed ? computedRight : '', bottom: isFixed ? computedBottom : '', 'z-index': zIndex}"
        >
            <slot>
                Affix TEMPLATE
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvAffix',
    props: {
        left: {
            default: ''
        },
        top: {
            default: ''
        },
        right: {
            default: ''
        },
        bottom: {
            default: ''
        },
        target: {
            default: null
        },
        mode: {
            default: 'fixed'
        },
        affixPos: {
            default: () => ['top']
        },
        zIndex: {
            default: ''
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            parent: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0
            },
            current: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0
            },
            wrapper: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0
            },
            timer: null
        };
    },
    watch: {
        isFixed() {
            this.$emit('change', this.isFixed);
        }
    },
    computed: {
        leftValue() {
            if (isNaN(parseFloat(this.left))) return 0;
            if (this.left.toString().indexOf('%') > -1) {
                let relativeLeft =
                    (this.parent.width * parseFloat(this.left)) / 100;
                return relativeLeft;
            }
            return parseFloat(this.left);
        },
        topValue() {
            if (isNaN(parseFloat(this.top))) return 0;
            if (this.top.toString().indexOf('%') > -1) {
                let relativeTop =
                    (this.parent.height * parseFloat(this.top)) / 100;
                return relativeTop;
            }
            return parseFloat(this.top);
        },
        rightValue() {
            if (isNaN(parseFloat(this.right))) return 0;
            if (this.right.toString().indexOf('%') > -1) {
                let relativeRight =
                    (this.parent.width * parseFloat(this.right)) / 100;
                return relativeRight;
            }
            return parseFloat(this.right);
        },
        bottomValue() {
            if (isNaN(parseFloat(this.bottom))) return 0;
            if (this.bottom.toString().indexOf('%') > -1) {
                let relativeBottom =
                    (this.parent.height * parseFloat(this.bottom)) / 100;
                return relativeBottom;
            }
            return parseFloat(this.bottom);
        },
        computedLeft() {
            if (isNaN(parseFloat(this.left))) return '';
            return this.parent.left + this.leftValue + 'px';
        },
        computedTop() {
            if (isNaN(parseFloat(this.top))) return '';
            return this.parent.top + this.topValue + 'px';
        },
        computedRight() {
            if (isNaN(parseFloat(this.right))) return '';
            let windowWidth = window.innerWidth;
            let parentRight = windowWidth - this.parent.right;
            return parentRight + this.rightValue + 'px';
        },
        computedBottom() {
            if (isNaN(parseFloat(this.bottom))) return '';
            let windowHeight = window.innerHeight;
            let parentBottom = windowHeight - this.parent.bottom;
            return parentBottom + this.bottomValue + 'px';
        },
        computedWidth() {
            if (this.current.width.toString().indexOf('%') > -1) {
                let relativeWidth =
                    (this.parent.width * parseFloat(this.current.width)) / 100;
                return relativeWidth + 'px';
            }
            return parseFloat(this.current.width) + 'px';
        },
        computedHeight() {
            if (this.current.height.toString().indexOf('%') > -1) {
                let relativeHeight =
                    (this.parent.height * parseFloat(this.current.height)) /
                    100;
                return relativeHeight + 'px';
            }
            return parseFloat(this.current.height) + 'px';
        },
        isFixed() {
            if (this.mode === 'fixed') return true;
            if (this.mode === 'relative') return false;
            if (this.affixPos.includes('top')) {
                if (this.wrapper.top < this.parent.top + this.topValue)
                    return true;
            }
            if (this.affixPos.includes('bottom')) {
                if (this.wrapper.bottom > this.parent.bottom + this.bottomValue)
                    return true;
            }
            if (this.affixPos.includes('left')) {
                if (this.wrapper.left < this.parent.left + this.leftValue)
                    return true;
            }
            if (this.affixPos.includes('right')) {
                if (this.wrapper.right > this.parent.right + this.rightValue)
                    return true;
            }
            return false;
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.wrapperPosInit();
    },
    methods: {
        getParentPos() {
            if (!this.valueTrigger(this.target)) return;
            const { left, top, right, bottom, width, height } =
                this.valueTrigger(this.target).getBoundingClientRect();
            this.parent.left = left;
            this.parent.top = top;
            this.parent.right = right;
            this.parent.bottom = bottom;
            this.parent.width = width;
            this.parent.height = height;
        },
        getCurrentPos() {
            if (!this.$refs.container) return;
            const { left, top, right, bottom, width, height } =
                this.$refs.container.getBoundingClientRect();
            this.current.left = left;
            this.current.top = top;
            this.current.right = right;
            this.current.bottom = bottom;
            this.current.width = width;
            this.current.height = height;
        },
        getWrapperPos() {
            if (!this.$el) return;
            const { left, top, right, bottom } =
                this.$el.getBoundingClientRect();
            const width = right - left;
            const height = bottom - top;
            this.wrapper.left = left;
            this.wrapper.top = top;
            this.wrapper.right = right;
            this.wrapper.bottom = bottom;
            this.wrapper.width = width;
            this.wrapper.height = height;
        },
        wrapperPosInit() {
            this.timer = setInterval(() => {
                window.requestAnimationFrame(() => {
                    this.getParentPos();
                    this.getCurrentPos();
                    this.getWrapperPos();
                });
            }, 10);
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>
