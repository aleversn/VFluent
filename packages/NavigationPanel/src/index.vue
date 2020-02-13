<template>
<div :class="['fv-'+$theme+'-NavigationPanel', thisExpand ? '' : 'compact', expandMode == 'flyout' ? 'flyout' : '']" :style="{width: `${panelWidth}px`}">
    <div class="panel-container" :style="{width: `${navWidth}px`}">
        <span v-show="showBack" class="default-item">
            <i class="ms-Icon ms-Icon--Back icon"></i>
            <p class="name title">{{title}}</p>
        </span>
        <span class="default-item" @click="thisExpand = !thisExpand">
            <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
            <p v-show="!showBack" class="name title">{{title}}</p>
        </span>
        <span class="search">
            <fv-text-box icon="Search" placeholder="Search" class="nav-search" style="width: 100%;"></fv-text-box>
        </span>
        <div class="template">
            
        </div>
        <span class="default-item">
            <i class="ms-Icon ms-Icon--Settings icon"></i>
            <p class="name">Settings</p>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name:'FvNavigationPanel',
    props: {
        title: {
            default: "NavigationPanel"
        },
        expand: {
            default: false
        },
        expandMode: {
            default: "relative"
        },
        expandDisplay: {
            default: 350
        },
        showBack: {
            default: true
        },
        showSearch: {
            default: true
        },
        settingTitle: {
            default: "Settings"
        },
        showSetting: {
            default: true
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisExpand: this.expand
        }
    },
    watch: {
        expand (val) {
            this.thisExpand = val;
        },
        thisExpand (val) {
            this.$emit("update:expand", val);
        }
    },
    computed: {
        panelWidth () {
            if(this.expandMode == "flyout") return 40;
            if(this.thisExpand) return this.expandDisplay;
            return 40;
        },
        navWidth () {
            if(this.thisExpand) return this.expandDisplay;
            return 40;
        },
        borderLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        },
        $theme () {
            if (this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.FRInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffects("body", {
                selector: `.fv-${this.$theme}-NavigationPanel .panel-container span.default-item`,
                borderGradientSize: 60,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        }
    }
}
</script>
