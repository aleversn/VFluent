<template>
    <div
        v-show="thisValue"
        :class="['fv-'+$theme+'-WebWindow', {'static-transition' : !freezeTransition, 'enabled-resize': isResize, dark : theme == 'dark', 'is-acrylic': isAcrylic}]"
        :style="{left: currentLeft, top: currentTop, width: currentWidth == 0 ? '' : `${currentWidth}px`, height: currentHeight == 0 ? '' : `${currentHeight}px`}"
        ref="block"
    >
        <div
            draggable="false"
            class="title-bar"
            @mousedown="forward"
            @mouseup="stop"
            @touchstart="forward"
            @touchend="stop"
        >
            <p style="margin-left: 10px; user-select: none;">{{title}}</p>
            <button
                class="control-btn shut-down"
                @mousedown="stopPropagation"
                @click="close"
            >
                <i class="ms-Icon ms-Icon--Cancel"></i>
            </button>
        </div>
        <slot></slot>
        <spliter
            v-if="isResize"
            @mousedown="resizeStart"
            @touchstart="resizeStart"
            @mousemove="resizeMove"
            @touchmove="resizeMove"
        ></spliter>
        <spliter
            v-if="isResize"
            :type="'vertical'"
            @mousedown="resizeStart($event, 'v')"
            @touchstart="resizeStart($event, 'v')"
            @mousemove="resizeMove($event, 'v')"
            @touchmove="resizeMove($event, 'v')"
        ></spliter>
        <spliter
            v-if="isResize"
            :type="'both'"
            @mousedown="resizeStart($event, 'both')"
            @touchstart="resizeStart($event, 'both')"
            @mousemove="resizeMove($event, 'both')"
            @touchmove="resizeMove($event, 'both')"
        ></spliter>
    </div>
</template>

<script>
import spliter from './sub/spliter.vue';

export default {
    name: 'FvWebWindow',
    components: {
        spliter
    },
    props: {
        value: {
            default: true
        },
        title: {
            type: String,
            default: 'WebWindow'
        },
        left: {
            default: 0
        },
        top: {
            default: 0
        },
        refreshPos: {
            default: false
        },
        isResize: {
            default: false
        },
        isAcrylic: {
            default: false
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            thisValue: this.value,
            moveable: false,
            freezeTransition: true,
            disX: 0,
            disY: 0,
            disWidth: 0,
            disHeight: 0,
            currentLeft: '0px',
            currentTop: '0px',
            currentWidth: 0,
            currentHeight: 0,
            isInit: true
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            if (this.refreshPos && val) this.posInit();
            this.$emit('input', val);
        },
        left(val) {
            this.currentLeft = `${val}px`;
        },
        top(val) {
            this.currentTop = `${val}px`;
        }
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.Init();
        this.eventInit();
    },
    methods: {
        Init() {
            window.addEventListener('mousemove', (event) => {
                if (this.moveable) {
                    this.currentLeft = `${event.clientX - this.disX}px`;
                    this.currentTop = `${event.clientY - this.disY}px`;
                }
            });
            window.addEventListener('touchmove', (event) => {
                event = event.targetTouches[0];
                if (this.moveable) {
                    this.currentLeft = `${event.clientX - this.disX}px`;
                    this.currentTop = `${event.clientY - this.disY}px`;
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
        posInit() {
            let el = this;
            let width = this.$el.clientWidth;
            let height = this.$el.clientHeight;
            if (this.left == 0)
                this.currentLeft = `${window.innerWidth / 2 - width / 2}px`;
            else this.currentLeft = `${this.left}px`;
            if (this.top == 0)
                this.currentTop = `${window.innerHeight / 2 - height / 2}px`;
            else this.currentTop = `${this.top}px`;
        },
        eventInit() {
            let el = this.$el;
            const resizeObserver = new ResizeObserver(() => {
                // for (const entry of entries) {
                //     const { contentRect, target } = entry;
                //     const { width } = contentRect;
                // }
                if (!this.isResize || this.isInit) this.posInit();
                if (this.isInit) {
                    this.currentWidth = this.$el.clientWidth;
                    this.currentHeight = this.$el.clientHeight;
                    this.isInit = false;
                }
            });
            resizeObserver.observe(el);
        },
        forward(event) {
            this.moveable = true;
            this.freezeTransition = true;
            event.preventDefault();
            let { clientX, clientY } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            this.disX = clientX - this.$el.getBoundingClientRect().left;
            this.disY = clientY - this.$el.getBoundingClientRect().top;
        },
        stop() {
            this.moveable = false;
            this.freezeTransition = false;
            if (this.$el.getBoundingClientRect().left < 0)
                this.currentLeft = `0px`;
            if (this.$el.getBoundingClientRect().top < 0)
                this.currentTop = `0px`;
            if (
                this.$el.getBoundingClientRect().left + this.$el.clientWidth >
                window.innerWidth
            )
                this.currentLeft = `${
                    window.innerWidth - this.$el.clientWidth
                }px`;
            if (
                this.$el.getBoundingClientRect().top + this.$el.clientHeight >
                window.innerHeight
            )
                this.currentTop = `${
                    window.innerHeight - this.$el.clientHeight
                }px`;
            setTimeout(() => {
                this.freezeTransition = true;
            }, 300);
        },
        resizeStart(event, type = 'h') {
            let { clientX, clientY } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            if (type !== 'v')
                this.disWidth =
                    clientX - this.$el.getBoundingClientRect().right;
            if (type !== 'h')
                this.disHeight =
                    clientY - this.$el.getBoundingClientRect().bottom;
        },
        resizeMove(event, type = 'h') {
            let { clientX, clientY } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            if (type !== 'v')
                this.currentWidth =
                    clientX -
                    this.$el.getBoundingClientRect().left +
                    this.disWidth +
                    15;
            if (type !== 'h')
                this.currentHeight =
                    clientY -
                    this.$el.getBoundingClientRect().top +
                    this.disHeight +
                    15;
        },
        stopPropagation(event) {
            event.stopPropagation();
        },
        close() {
            this.$emit('close');
            this.thisValue = false;
        }
    }
};
</script>
