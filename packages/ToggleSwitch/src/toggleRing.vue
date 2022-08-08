<template>
    <div
        class="fv-toggle-ring"
        :style="{left: moveable ? `${left}px` : '', background: !value ? ringBackground : ''}"
        @mousedown="forward"
        @mouseup="stop"
        @touchstart="forward"
        @touchend="stop"
    ></div>
</template>

<script>
export default {
    props: {
        value: {
            default: false,
        },
        left: {
            default: 5
        },
        ringBackground: {
            default: '',
        },
        theme: {
            type: String,
            default: 'system',
        },
    },
    data() {
        return {
            thisValue: this.value,
            moveable: false,
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        }
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    mounted() {
        this.Init();
    },
    methods: {
        Init() {
            window.addEventListener('mousemove', (event) => {
                if (this.moveable) {
                    this.$emit('mousemove', event);
                }
            });
            window.addEventListener('mouseup', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
            window.addEventListener('touchmove', (event) => {
                if (this.moveable) {
                    this.$emit('touchmove', event);
                }
            });
            window.addEventListener('touchend', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
        },
        forward(event) {
            event.preventDefault();
            this.moveable = true;
            if (event.type === 'mousedown') this.$emit('mousedown', event);
            else this.$emit('touchstart', event);
        },
        stop(event) {
            this.moveable = false;
            if (!event) return;
            if (event.type === 'mouseup') this.$emit('mouseup', event);
            else this.$emit('touchend', event);
        },
    },
};
</script>
