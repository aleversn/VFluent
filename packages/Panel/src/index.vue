<template>
    <transition name="fv-panel-show">
        <div
            v-show="thisValue"
            :class="['fv-'+$theme+'-Panel']"
        >
            <div
                class="fv-panel-back-board"
                @click="isLightDismiss ? thisValue = false : 0"
            ></div>
            <transition :name="transitionInName">
                <div
                    v-show="thisValue"
                    class="fv-panel-container"
                    :class="[`${sideName}-side`, {'acrylic-style': isAcrylic}]"
                    :style="{width: finalWidth, height: finalHeight, background: background}"
                >
                    <div
                        v-show="showTitleBar"
                        class="fv-panel-control-block"
                        :style="{padding: controlPadding}"
                    >
                        <slot name="header">
                            <p
                                class="panel-title"
                                :style="{'font-size': `${titleSize}px`, 'font-weight': titleWeight, color: titleColor}"
                            >{{title}}</p>
                            <i
                                class="control-btn ms-Icon ms-Icon--Cancel"
                                @click="thisValue = !thisValue"
                            ></i>
                        </slot>
                    </div>
                    <div
                        class="fv-panel-main-container"
                        :style="{padding: contentPadding}"
                    >
                        <slot name="container">
                            Content Here
                        </slot>
                    </div>
                    <div
                        v-show="isFooter"
                        class="fv-panel-footer"
                        :style="{padding: controlPadding}"
                    >
                        <slot name="footer">
                            <fv-button
                                theme="dark"
                                background="rgba(0, 90, 158, 1)"
                            >OK</fv-button>
                            <fv-button>Cancel</fv-button>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'FvPanel',
    props: {
        value: {
            default: !false
        },
        title: {
            default: 'Sample Panel'
        },
        titleSize: {
            default: 20
        },
        titleWeight: {
            default: 600
        },
        titleColor: {
            default: ''
        },
        width: {
            default: '340'
        },
        height: {
            default: '100%'
        },
        background: {
            default: ''
        },
        controlPadding: {
            default: '15px'
        },
        contentPadding: {
            default: '0px'
        },
        isNearSide: {
            default: false
        },
        isBottomSide: {
            default: false
        },
        isTopSide: {
            default: false
        },
        isCentralSide: {
            default: false
        },
        isLightDismiss: {
            default: false
        },
        showTitleBar: {
            default: true
        },
        isFooter: {
            default: false
        },
        isAcrylic: {
            default: false
        },
        teleport: {
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
            screenWidth: window.innerWidth,
            timer: {
                widthTimer: {}
            }
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
        finalWidth() {
            if (isNaN(this.width)) {
                return this.width;
            } else {
                if (this.width > this.screenWidth)
                    return `${this.screenWidth}px`;
                return `${this.width}px`;
            }
        },
        finalHeight() {
            if (isNaN(this.height)) {
                return this.height;
            } else {
                if (this.height > this.screenHeight)
                    return `${this.screenHeight}px`;
                return `${this.height}px`;
            }
        },
        sideName() {
            if (this.isCentralSide) return 'central';
            if (this.isNearSide) return 'near';
            if (this.isTopSide) return 'top';
            if (this.isBottomSide) return 'bottom';
            return 'default';
        },
        transitionInName() {
            if (this.sideName === 'central')
                if (this.thisValue) return 'fv-panel-scale-up-to-up';
                else return 'fv-panel-scale-down-to-down';
            if (this.sideName === 'near')
                if (this.thisValue) return 'move-left-to-right';
                else return 'move-right-to-left';
            if (this.sideName === 'top')
                if (this.thisValue) return 'move-top-to-bottom';
                else return 'move-bottom-to-top';
            if (this.sideName === 'bottom')
                if (this.thisValue) return 'move-bottom-to-top';
                else return 'move-top-to-bottom';
            if (this.thisValue) return 'move-right-to-left';
            return 'move-left-to-right';
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.screenWidthInit();
        if (this.teleport) this.globalAppendInit();
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
        screenWidthInit() {
            this.timer.widthTimer = setInterval(() => {
                this.screenWidth = window.innerWidth;
            }, 30);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer.widthTimer);
        try {
            const body = document.querySelector('body');
            body.removeChild(this.$el);
        } catch (e) {
        }
    }
};
</script>
