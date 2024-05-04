<template>
    <transition :name="fullExpandAnimation ? 'fv-rightMenu-full-zoom-in-top' : 'fv-rightMenu-zoom-in-top'">
        <div
            v-show="thisValue"
            :class="['fv-'+$theme+'-RightMenu']"
            :style="{left: posX + 'px', top: posY + 'px', width: rightMenuWidth + 'px', background: background}"
        >
            <div class="right-menu-list">
                <slot>

                    <span>
                        <p>Selected</p>
                    </span>
                </slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'FvRightMenu',
    props: {
        value: {
            default: false
        },
        rightMenuWidth: {
            default: 200
        },
        background: {
            default: ''
        },
        fullExpandAnimation: {
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
            posX: 0,
            posY: 0,
            rightMenuHeight: 0
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('input', val);
        }
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.globalAppendInit();
        this.rightMenuClearInit();
        this.resizeInit();
    },
    methods: {
        globalAppendInit() {
            this.$nextTick(() => {
                const body = document.querySelector('body');
                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }
            });
        },
        rightMenuClearInit() {
            window.addEventListener('click', (event) => {
                let x = event.target;
                if (x && x !== this.$el) this.thisValue = false;
            });
        },
        resizeInit() {
            const observer = new ResizeObserver(() => {
                if (this.$el) {
                    if (this.$el.clientHeight > 0) {
                        this.rightMenuHeight = this.$el.clientHeight;
                        this.$emit('update-height', this.rightMenuHeight);
                    }
                }
            });
            observer.observe(this.$el);
        },
        rightClick(event, el) {
            event.preventDefault();
            this.thisValue = true;
            let bounding = el.getBoundingClientRect();
            let targetPos = {};
            targetPos.x = event.x;
            targetPos.y = event.y;
            if (targetPos.x < bounding.left) targetPos.x = bounding.left;
            if (targetPos.x + this.rightMenuWidth > bounding.right)
                targetPos.x = bounding.right - this.rightMenuWidth;
            if (targetPos.y < bounding.top) targetPos.y = bounding.top;
            if (targetPos.y + this.rightMenuHeight > bounding.bottom)
                targetPos.y = bounding.bottom - this.rightMenuHeight;
            this.posX = targetPos.x;
            this.posY = targetPos.y;
        }
    }
};
</script>
