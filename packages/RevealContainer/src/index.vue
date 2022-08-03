<template>
    <div
        :class="['fv-' + $theme + '-RevealContainer']"
        :style="{ 'border-radius': `${borderRadius}px` }"
        @click="$event => {
        $event.preventDefault();
        if (!isDisabled)
            $emit('click', $event);
    }"
    >
        <svg
            v-show="offset.right - offset.left > 0"
            width="100%"
            height="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            >
            <defs>
                <radialGradient
                    cx="50%"
                    cy="50%"
                    :r="backgroundGradientSize"
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="pad"
                    :id="`backgroundG_${id}`"
                    :gradientTransform="borderMatrix"
                >
                    <stop
                        v-if="backgroundGradientList.length == 0"
                        offset="0"
                        :stop-color="backgroundColor"
                    />
                    <stop
                        v-if="backgroundGradientList.length == 0"
                        offset="1"
                        stop-color="rgba(255, 255, 255, 0)"
                    />
                    <stop
                        v-for="(color, index) in backgroundGradientList"
                        :offset="1 / backgroundGradientList.length * index"
                        :stop-color="color"
                        :key="`bg:${index}`"
                    />
                </radialGradient>
                <radialGradient
                    cx="50%"
                    cy="50%"
                    :r="borderGradientSize"
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="pad"
                    :id="`borderG_${id}`"
                    :gradientTransform="borderMatrix"
                >
                    <stop
                        v-if="borderGradientList.length == 0"
                        offset="0"
                        :stop-color="borderColor"
                    />
                    <stop
                        v-if="borderGradientList.length == 0"
                        offset="1"
                        stop-color="rgba(255, 255, 255, 0)"
                    />
                    <stop
                        v-for="(color, index) in borderGradientList"
                        :offset="1 / borderGradientList.length * index"
                        :stop-color="color"
                        :key="`border:${index}`"
                    />
                </radialGradient>
                <radialGradient
                    cx="50%"
                    cy="50%"
                    :r="wave"
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="pad"
                    :id="`clickG_${id}`"
                    :gradientTransform="borderMatrix"
                >
                    <stop
                        offset="0"
                        stop-color="rgba(255, 255, 255, 0)"
                    />
                    <stop
                        offset="0.33"
                        :stop-color="backgroundColor"
                    />
                    <stop
                        offset="0.66"
                        stop-color="rgba(255, 255, 255, 0)"
                    />
                    <stop
                        offset="1"
                        stop-color="rgba(255, 255, 255, 0)"
                    />
                </radialGradient>
            </defs>
            <rect
                :x="borderWidth / 2"
                :y="borderWidth / 2"
                :rx="borderRadius"
                :ry="borderRadius"
                style="box-sizing: border-box;"
                :style="{ width: `${offset.right - offset.left - borderWidth}px`, height: `${offset.bottom - offset.top - borderWidth}px`, stroke: `url(#borderG_${id})`, fill: inside ? `url(#backgroundG_${id})` : 'transparent', 'stroke-width': borderWidth }"
            />
            <rect
                v-show="clickDown"
                :x="borderWidth / 2"
                :y="borderWidth / 2"
                :rx="borderRadius"
                :ry="borderRadius"
                style="stroke: transparent; box-sizing: border-box;"
                :style="{ width: `${offset.right - offset.left - borderWidth}px`, height: `${offset.bottom - offset.top - borderWidth}px`, fill: inside ? `url(#clickG_${id})` : 'transparent', 'stroke-width': borderWidth }"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'FvRevealContainer',
    props: {
        revealContainer: {
            default: false,
        },
        parent: {
            default: null,
        },
        borderWidth: {
            default: 1,
        },
        borderRadius: {
            default: 6,
        },
        backgroundColor: {
            default: 'rgba(121, 119, 117, 0.6)',
        },
        backgroundGradientList: {
            default: () => [],
        },
        backgroundGradientSize: {
            default: 120,
        },
        borderColor: {
            default: 'rgba(121, 119, 117, 0.6)',
        },
        borderGradientList: {
            default: () => [],
        },
        borderGradientSize: {
            default: 60,
        },
        debounceDistance: {
            default: 300,
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
            id: this.GuidWithoutDash(),
            offset: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            disEl: {
                // x: window.innerWidth,
                // y: window.innerHeight,
                x: 0,
                y: 0,
            },
            inside: false,
            wave: 0,
            clickDown: false,
            timer: {
                wave: null,
            },
        };
    },
    watch: {
        inside(val) {
            if (!val) {
                this.leaveEvent(null);
            }
        },
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
        borderMatrix() {
            const { left, top, right, bottom } = this.offset;
            let width = right - left;
            let height = bottom - top;
            let matrix = [1, 0, 0, 1, (this.disEl.x - width / 2).toFixed(3), (this.disEl.y - height / 2).toFixed(3)];
            return `matrix(${matrix.join(' ')})`;
        },
        isDisabled() {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        },
    },
    mounted() {
        // mount data
        this.disEl.y = window.innerHeight;
        this.disEl.x = window.innerWidth;
        this.mouseMoveInit();
        this.mouseClickInit();
    },
    methods: {
        mouseMoveInit() {
            if (this.revealContainer === false) {
                this.$fvGlobal.commit('setRevealHandler', {
                    id: this.id,
                    moveHandler: this.moveEvent,
                    leaveHandler: this.leaveEvent,
                });
                if (window.$FvRevealContainer) return;
                window.$FvRevealContainer = true;
                window.removeEventListener('mousemove', this.globalMoveEventListener);
                window.addEventListener('mousemove', this.globalMoveEventListener);
                window.removeEventListener('touchmove', this.globalMoveEventListener);
                window.addEventListener('touchmove', this.globalMoveEventListener);
                window.removeEventListener('mouseleave', this.globalLeaveEventListener);
                window.addEventListener('mouseleave', this.globalLeaveEventListener);
            } else {
                this.revealContainer.revealHandlerList.push({
                    id: this.id,
                    moveHandler: this.moveEvent,
                    downHandler: this.downEvent,
                    upHandler: this.upEvent,
                    leaveHandler: this.leaveEvent,
                });
                if (this.revealContainer.init) return;
                this.revealContainer.init = true;
                this.revealContainer.el().removeEventListener('mousemove', this.globalMoveEventListener);
                this.revealContainer.el().addEventListener('mousemove', this.globalMoveEventListener);
                this.revealContainer.el().removeEventListener('touchmove', this.globalMoveEventListener);
                this.revealContainer.el().addEventListener('touchmove', this.globalMoveEventListener);
                this.revealContainer.el().removeEventListener('mouseleave', this.globalLeaveEventListener);
                this.revealContainer.el().addEventListener('mouseleave', this.globalLeaveEventListener);
            }
        },
        mouseClickInit() {
            if (this.parent) {
                this.parent().removeEventListener('mousedown', this.downEvent);
                this.parent().addEventListener('mousedown', this.downEvent);
                this.parent().removeEventListener('touchstart', this.downEvent);
                this.parent().addEventListener('touchstart', this.downEvent);
                this.parent().removeEventListener('mouseup', this.upEvent);
                this.parent().addEventListener('mouseup', this.upEvent);
                this.parent().removeEventListener('touchend', this.leaveEvent);
                this.parent().addEventListener('touchend', this.leaveEvent);
            } else {
                this.$el.removeEventListener('mousedown', this.downEvent);
                this.$el.addEventListener('mousedown', this.downEvent);
                this.$el.removeEventListener('touchstart', this.downEvent);
                this.$el.addEventListener('touchstart', this.downEvent);
                this.$el.removeEventListener('mouseup', this.upEvent);
                this.$el.addEventListener('mouseup', this.upEvent);
                this.$el.removeEventListener('touchend', this.leaveEvent);
                this.$el.addEventListener('touchend', this.leaveEvent);
            }
        },
        globalMoveEventListener(e) {
            if (this.revealContainer === false) {
                for (let item of this.$fvGlobal.state.revealHandlerList) {
                    if (item.moveHandler) item.moveHandler(e);
                }
            } else {
                for (let item of this.revealContainer.revealHandlerList) {
                    if (item.moveHandler) item.moveHandler(e);
                }
            }
        },
        globalLeaveEventListener(e) {
            if (this.revealContainer === false) {
                for (let item of this.$fvGlobal.state.revealHandlerList) {
                    if (item.leaveHandler) item.leaveHandler(e);
                }
            } else {
                for (let item of this.revealContainer.revealHandlerList) {
                    if (item.leaveHandler) item.leaveHandler(e);
                }
            }
        },
        moveEvent(e) {
            if (this.isDisabled) return;
            if (!this.inVisual()) return;
            if (e.type.indexOf('mouse') < 0) e = e.targetTouches[0];

            const { left, top } = this.getOffset(this.$el);
            let x = e.pageX - left - window.scrollX;
            let y = e.pageY - top - window.scrollY;
            let distance = this.distanceOfElement(this.$el, e.clientX, e.clientY);
            if (distance.left > this.debounceDistance || distance.top > this.debounceDistance || distance.right > this.debounceDistance || distance.bottom > this.debounceDistance) return;
            this.disEl.x = x;
            this.disEl.y = y;

            this.inside = this.moveInsideElement(this.$el, e.clientX, e.clientY);
        },
        downEvent(e) {
            if (this.isDisabled) return;
            if (!this.clickInsideElement(e)) return;
            if (e.type.indexOf('mouse') < 0) e = e.targetTouches[0];

            const { left, top } = this.getOffset(this.$el);
            let x = e.pageX - left - window.scrollX;
            let y = e.pageY - top - window.scrollY;
            this.disEl.x = x;
            this.disEl.y = y;

            this.wave = 120;
            this.inside = true;
            this.clickDown = true;
            clearInterval(this.timer.wave);
            this.timer.wave = setInterval(() => {
                try {
                    let cur = this.wave;
                    let step = cur / 60 + 1;
                    cur += step;
                    if (cur >= 1000) clearInterval(this.timer.wave);
                    else this.wave = cur;
                } catch (e) {}
            }, 50);
        },
        upEvent(e) {
            this.wave = 0;
            this.clickDown = false;
            clearInterval(this.timer.wave);
        },
        leaveEvent(e) {
            this.wave = 0;
            this.disEl.x = window.innerWidth;
            this.disEl.y = window.innerHeight;
            this.inside = false;
            clearInterval(this.timer.wave);
        },
        getOffset(el) {
            const { left, top, right, bottom } = el.getBoundingClientRect();
            this.offset.left = left;
            this.offset.top = top;
            this.offset.right = right;
            this.offset.bottom = bottom;
            return { left, top, right, bottom };
        },
        moveInsideElement(el, cursorX, cursorY) {
            const { left, top, right, bottom } = el.getBoundingClientRect();

            return cursorX >= left && cursorX <= right && cursorY >= top && cursorY <= bottom;
        },
        distanceOfElement(el, cursorX, cursorY) {
            const { left, top, right, bottom } = el.getBoundingClientRect();

            return {
                left: left - cursorX,
                right: cursorX - right,
                top: top - cursorY,
                bottom: cursorY - bottom,
            };
        },
        clickInsideElement(event) {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                if (this.parent) {
                    if (x == this.parent()) {
                        _self = true;
                        break;
                    }
                }
                x = x.parentNode;
            }
            return _self;
        },
        inVisual() {
            const { left, top, right, bottom } = this.$el.getBoundingClientRect();
            const width = right - left;
            const height = bottom - top;
            const clientWidth = window.innerWidth;
            const clientHeight = window.innerHeight;
            let h = false;
            let v = false;
            if (bottom >= 0 && bottom <= clientHeight + height) v = true;
            if (right >= 0 && right <= clientWidth + width) h = true;
            return h && v;
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
    },
    beforeDestroy() {
        if (this.revealContainer === false) {
            this.$fvGlobal.commit('removeRevealHandler', this.id);
        } else {
            let index = this.revealContainer.revealHandlerList.findIndex((item) => item.id == this.id);
            if (index > -1) this.revealContainer.revealHandlerList.splice(index, 1);
        }

        if (this.parent && this.parent()) {
            this.parent().removeEventListener('mousedown', this.downEvent);
            this.parent().removeEventListener('touchstart', this.downEvent);
            this.parent().removeEventListener('mouseup', this.upEvent);
        }
    },
};
</script>
