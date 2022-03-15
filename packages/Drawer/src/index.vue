<template>
    <div ref="drawer" :class="['fv-' + $theme + '-drawer']" :style="style.drawer">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FvDrawer',
    props: {
        value: {
            default: false,
        },
        position: {
            type: String,
            default: 'bottom',
        },
        length: {
            default: 300,
        },
        background: {
            default: '',
        },
        zIndex: {
            type: Number,
            default: 9999,
        },
        focusTrap: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: 'system',
        },
    },
    data() {
        return {
            lock: false,
            style: {
                drawer: {
                    zIndex: this.zIndex,
                },
            },
            show: {
                drawer: this.visible == undefined ? false : this.visible,
            },
            window: {
                click: (evt) => {
                    if (!this.computeVisible || this.lock) return;
                    if (this.focusTrap) return;
                    let el = evt.target;
                    let _self = false;
                    while (el) {
                        if (el == this.$el) {
                            _self = true;
                        }
                        if (el.parentNode) el = el.parentNode;
                        else break;
                    }
                    if (!_self) this.computeVisible = false;
                },
            },
            parentBox: null,
            parent: {
                scroll: () => {
                    // to follow scroll
                    let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let left = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
                    this.parentBox.style.top = `${top}px`;
                    this.parentBox.style.left = `${left}px`;
                },
            },
        };
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        },
        computeVisible: {
            get() {
                return this.visible == undefined ? this.show.drawer : this.visible;
            },
            set(val) {
                this.show.drawer = val;
                this.$emit('update:visible', val);
            },
        },
    },
    watch: {
        computeVisible() {
            this.lock = true;
            this.setStyle();
            // Avoid Dumplite Touch
            setTimeout(() => {
                this.lock = false;
            }, 50);
        },
    },
    mounted() {
        this.init();
        this.setStyle();
    },
    beforeDestroy() {
        for (let key in this.window) {
            window.removeEventListener(key, this.window);
        }
        if (this.parentBox != null) {
            this.parentBox.remove();
            window.removeEventListener('scroll', this.parent.scroll);
        }
    },
    methods: {
        init() {
            for (let key in this.window) {
                window.addEventListener(key, this.window[key]);
            }
            // For compatibility with IOS
            if (this.appendBody) {
                // change position style: absolute
                this.parentBox = document.createElement('div');
                document.body.append(this.parentBox);
                this.$refs.drawer.remove();
                this.parentBox.append(this.$refs.drawer);
                this.$refs.drawer.style.position = 'absolute';
                this.$refs.drawer.style.visibility = 'visible';

                this.parentBox.style.top = '0';
                this.parentBox.style.left = '0';
                this.parentBox.style.position = 'absolute';
                this.parentBox.style.width = '100%';
                this.parentBox.style.height = '100%';
                this.parentBox.style.background = 'red';
                this.parentBox.style.zIndex = 9999;
                this.parentBox.style.overflow = 'hidden';
                this.parentBox.style.visibility = 'hidden';
                window.addEventListener('scroll', this.parent.scroll);
            }
        },
        setStyle() {
            let length = this.length;
            if (typeof this.length == 'number') {
                length += 'px';
            }
            if (this.position == 'bottom') {
                this.style.drawer = {
                    left: '0',
                    bottom: '0',
                    height: length,
                    width: '100%',
                    zIndex: this.zIndex,
                    transform: ` ${this.computeVisible ? 'translateY(0%)' : 'translateY(110%)'}`,
                };
            } else if (this.position == 'top') {
                this.style.drawer = {
                    left: '0',
                    top: '0',
                    height: length,
                    width: '100%',
                    zIndex: this.zIndex,
                    transform: `${this.computeVisible ? 'translateY(0%)' : 'translateY(-110%)'}`,
                };
            } else if (this.position == 'left') {
                this.style.drawer = {
                    left: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    zIndex: this.zIndex,
                    transform: `${this.computeVisible ? 'translateX(0%)' : 'translateX(-110%)'}`,
                };
            } else {
                this.style.drawer = {
                    right: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    zIndex: this.zIndex,
                    transform: `${this.computeVisible ? 'translateX(0%)' : 'translateX(110%)'}`,
                };
            }
        },
        close() {
            this.computeVisible = false;
        },
    },
};
</script>
