<template>
<div :class="['fv-'+$theme+'-NavigationView', {compact: !thisExpand}]">
    <fv-NavigationPanel :title="title" :expand="expand" :expandMode="expandMode" :expandWidth="expandWidth" :expandDisplay="expandDisplay" :flyoutDisplay="flyoutDisplay" :fullsizeDisplay="fullSizeDisplay" :mobileDisplay="mobileDisplay" :showBack="showBack" :showSearch="showSearch" :settingTitle="settingTitle" :showSetting="showSetting" :theme="theme" @expand-change="thisExpand = $event" @setting-click="settingClick">
        <template v-slot:searchBlock>
            <fv-search-box :options="options" icon="Search" placeholder="Search" class="nav-search" style="width: 100%;"></fv-search-box>
        </template>
        <template v-slot:panel>
            <fv-list-view v-model="options" class="navigation-list" @chooseItem="currentItem = $event">
                <template v-slot:listItem="x">
                    <i v-show="x.item.icon !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.item.icon}`]"></i>
                    <p class="name">{{x.item.name}}</p>
                </template>
            </fv-list-view>
        </template>
    </fv-NavigationPanel>
    <vertical-slider :top="currentTop" :height="currentHeight"></vertical-slider>
</div>
</template>

<script>
import verticalSlider from './sub/verticalSlider.vue';

export default {
    name:'FvNavigationView',
    components: {
        verticalSlider
    },
    props: {
        options: {
            default: () => []
        },
        title: {
            default: "NavigationPanel"
        },
        expand: {
            default: true
        },
        expandMode: {
            default: "relative"
        },
        expandWidth: {
            default: 350
        },
        expandDisplay: {
            default: 1024
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
            currentItem: {},
            currentTop: 0,
            currentHeight: 0,
            thisExpand: this.expand,
            timer: {
                slider: {}
            }
        }
    },
    watch: {
        
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.sliderRefreshInit();
    },
    methods: {
        sliderRefreshInit () {
            this.timer.slider = setInterval(() => {
                if(this.currentItem.event !== undefined) {
                    let target = this.currentItem.event.target;
                    let elTop = this.$el.getBoundingClientRect().top;
                    let targetTop = target.getBoundingClientRect().top;
                    this.currentTop = targetTop - elTop;
                }
                else
                    this.currentTop = 0;
                if(this.currentItem.event !== undefined) {
                    let target = this.currentItem.event.target;
                    this.currentHeight = target.clientHeight;
                }
                else
                    this.currentHeight = 0;
            }, 30);
        },
        settingClick (item) {
            this.currentItem = item;
            this.$emit("setting-click", item);
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>
