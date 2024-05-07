<template>
    <div
        :class="['fv-'+$theme+'-NavigationPanel', {compact: !thisExpand}, {flyout: isFlyout}, {mobile: isMobile}]"
        :style="{position: (this.screenWidth <= this.fullSizeDisplay) && thisExpand ? 'static' : '', width: panelWidth}"
    >
        <div
            class="panel-container-mobile"
            :style="{background: !thisExpand ? background : ''}"
        >
            <fv-animated-icon
                v-show="showBack"
                value="backScale"
                class="fv-nav-default-item"
                :hideContent="true"
                :style="{width: `${compactWidth}px`}"
                @click="$emit('back', $event)"
            >
                <i class="ms-Icon ms-Icon--Back icon"></i>
            </fv-animated-icon>
            <fv-animated-icon
                v-show="showNav"
                value="scaleXDown"
                class="fv-nav-default-item"
                :hideContent="true"
                :style="{width: `${compactWidth}px`}"
                @click="expandClick"
            >
                <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
            </fv-animated-icon>
        </div>
        <div
            class="panel-container"
            :style="{width: navWidth, background: background}"
        >
            <fv-animated-icon
                v-show="showBack"
                value="backScale"
                class="fv-nav-default-item control"
                :hideContent="!thisExpand"
                style="width: calc(100% - 10px);"
                @click="$emit('back', $event)"
            >
                <i class="ms-Icon ms-Icon--Back icon"></i>
                <template v-slot:content>
                    <p class="name title">{{title}}</p>
                </template>
            </fv-animated-icon>
            <fv-animated-icon
                v-show="showNav"
                value="scaleXDown"
                class="fv-nav-default-item control"
                :hideContent="!thisExpand"
                style="width: calc(100% - 10px);"
                @click="expandClick"
            >
                <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
                <template v-slot:content>
                    <p
                        v-show="!showBack"
                        class="name title"
                    >{{title}}</p>
                </template>
            </fv-animated-icon>
            <span
                v-show="showSearch && thisExpand"
                class="search"
            >
                <slot name="searchBlock">
                    <fv-search-box
                        icon="Search"
                        placeholder="Search"
                        class="nav-search"
                        :theme="theme"
                        :revealBorder="true"
                        borderWidth="2"
                        borderRadius="6"
                        :isBoxShadow="true"
                        style="width: 95%;"
                    ></fv-search-box>
                </slot>
            </span>
            <div class="template">
                <slot name="panel"></slot>
            </div>
            <fv-animated-icon
                v-show="showSetting"
                ref="setting"
                value="bounceRotate"
                class="fv-nav-default-item"
                :hideContent="!thisExpand"
                style="width: calc(100% - 10px);"
                @click="$emit('setting-click', { event: $event })"
            >
                <i class="ms-Icon ms-Icon--Settings icon"></i>
                <template v-slot:content>
                    <p class="name">{{settingTitle}}</p>
                </template>
            </fv-animated-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvNavigationPanel',
    props: {
        title: {
            default: 'NavigationPanel'
        },
        expand: {
            default: true
        },
        expandMode: {
            default: 'relative'
        },
        expandWidth: {
            default: 350
        },
        expandDisplay: {
            default: 1024
        },
        compactWidth: {
            default: 50
        },
        flyoutDisplay: {
            default: 0
        },
        fullSizeDisplay: {
            default: 800
        },
        mobileDisplay: {
            default: 0
        },
        showBack: {
            default: true
        },
        showNav: {
            default: true
        },
        showSearch: {
            default: true
        },
        settingTitle: {
            default: 'Settings'
        },
        showSetting: {
            default: true
        },
        background: {
            default: ''
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            FR: null,
            thisExpand: this.expand,
            thisExpandBackup: this.expand,
            screenWidth: window.innerWidth,
            timer: {
                widthTimer: {}
            }
        };
    },
    watch: {
        expand(val) {
            this.thisExpand = val;
        },
        thisExpand(val) {
            this.$emit('update:expand', val);
            this.$emit('expand-change', val);
        },
        screenWidth(val) {
            if (this.expandDisplay < this.screenWidth) {
                if (!this.isFlyout) this.thisExpand = this.thisExpandBackup;
                else this.thisExpand = false;
            } else this.thisExpand = false;
        }
    },
    computed: {
        panelWidth() {
            if (this.isFlyout) return `${this.compactWidth}px`;
            if (this.thisExpand)
                return this.screenWidth <= this.fullSizeDisplay
                    ? '100%'
                    : `${this.expandWidth}px`;
            return `${this.compactWidth}px`;
        },
        navWidth() {
            let size =
                this.screenWidth <= this.fullSizeDisplay
                    ? '100%'
                    : `${this.expandWidth}px`;
            if (this.thisExpand) return size;
            return `${this.compactWidth}px`;
        },
        isFlyout() {
            if (this.expandMode == 'flyout') return true;
            if (this.flyoutDisplay > this.screenWidth) return true;
            return false;
        },
        isMobile() {
            if (this.mobileDisplay > this.screenWidth) return true;
            return false;
        },
        borderLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.6)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.6)';
                }
                return 'rgba(121, 119, 117, 0.6)';
            };
        },
        backgroundLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.3)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.3)';
                }
                return 'rgba(121, 119, 117, 0.3)';
            };
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.screenWidthInit();
        this.outSideClickInit();
    },
    methods: {
        FRInit() {
            this.FR = this.$RevealDirect.apply(this.$el, {
                selector: `.fv-${this.$theme}-NavigationPanel .panel-container .fv-nav-default-item`,
                borderGradientSize: 60,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        screenWidthInit() {
            this.timer.widthTimer = setInterval(() => {
                this.screenWidth = window.innerWidth;
            }, 30);
        },
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) {
                if (this.isFlyout || this.isMobile) this.thisExpand = false;
            }
        },
        expandClick() {
            this.thisExpandBackup = !this.thisExpand;
            this.thisExpand = !this.thisExpand;
            this.$emit('expand-click', this.thisExpand);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer.widthTimer);
        this.$RevealDirect.destroy(this.FR);
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
