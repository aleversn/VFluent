<template>
<transition name="fv-panel-show">
    <div v-show="thisValue" :class="['fv-'+$theme+'-Panel']">
        <div class="fv-panel-back-board" @click="isLightDismiss ? thisValue = false : 0"></div>
        <transition :name="transitionInName">
            <div v-show="thisValue" class="fv-panel-container" :class="[{'near-side': isNearSide, 'acrylic-style': isAcrylic}]" :style="{width: finalWidth, background: background}">
                <div class="fv-panel-control-block">
                    <p class="panel-title">{{title}}</p>
                    <i class="ms-Icon ms-Icon--Cancel" @click="thisValue = !thisValue"></i>
                </div>
                <div class="fv-panel-main-container">
                    <slot name="container">
                        Content Here
                    </slot>
                </div>
                <div v-show="isFooter" class="fv-panel-footer">
                    <slot name="footer">
                        <fv-button theme="dark" background="rgba(0, 90, 158, 1)">OK</fv-button>
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
            default: "Sample Panel"
        },
        width: {
            default: "340"
        },
        background: {
            default: ''
        },
        isNearSide: {
            default: false
        },
        isLightDismiss: {
            default: false
        },
        isFooter: {
            default: false
        },
        isAcrylic: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            screenWidth: window.innerWidth,
            timer: {
                widthTimer: {}
            }
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
        }
    },
    computed: {
        finalWidth () {
            if(this.width > this.screenWidth)
                return `${this.screenWidth}px`;
            return `${this.width}px`;
        },
        transitionInName () {
            if(this.isNearSide)
                if(this.thisValue)
                    return 'move-left-to-right';
                else
                    return 'move-right-to-left';
            if(this.thisValue)
                return 'move-right-to-left';
            return 'move-left-to-right';
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.screenWidthInit();
    },
    methods: {
        screenWidthInit() {
            this.timer.widthTimer = setInterval(() => {
                this.screenWidth = window.innerWidth;
            }, 30);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer.widthTimer);
    }
}
</script>
