<template>
<div :class="['fv-'+$theme+'-NavigationView', {compact: !thisExpand}]">
    <fv-NavigationPanel :title="title" :expand="expand" :expandMode="expandMode" :expandWidth="expandWidth" :expandDisplay="expandDisplay" :flyoutDisplay="flyoutDisplay" :fullSizeDisplay="fullSizeDisplay" :mobileDisplay="mobileDisplay" :showBack="showBack" :showSearch="showSearch" :settingTitle="settingTitle" :showSetting="showSetting" :background="background" :theme="theme" @back="$emit('back', $event)" @expand-change="expandChange" @setting-click="settingClick">
        <template v-slot:searchBlock>
            <fv-search-box :options="options" icon="Search" placeholder="Search" :theme="theme" class="nav-search" style="width: 100%;" @choose-result="onChooseSearch"></fv-search-box>
        </template>
        <template v-slot:panel>
            <fv-list-view v-model="options" class="navigation-list" ref="listView" :theme="theme" :headerForeground="foreground" choosenBackground="transparent" @chooseItem="itemClick">
                <template v-slot:listItem="x">
                    <i v-show="x.item.icon !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.item.icon}`]"></i>
                    <p class="name" :style="{ color: x.item.type == 'header' ? foreground : ''}">{{x.item.name}}</p>
                   
                </template>
            </fv-list-view>
        </template>
    </fv-NavigationPanel>
    <vertical-slider :top="currentTop" :height="currentHeight" :background="foreground"></vertical-slider>
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
        value: {
            default: () => {
                return {}
            }
        },
        options: {
            default: () => []
        },
        title: {
            default: "NavigationView"
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
        foreground: {
            default: ""
        },
        background: {
            default: ""
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: {},
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
        value () {
            this.valueInit();
        },
        thisValue (val, from) {
            if(!(val.name === from.name && val.type === from.type && val.key === from.key)) {
                this.$nextTick(() => {
                    this.onChooseSearch(val);
                });
                this.$emit("input", val);
            }
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.valueInit();
        this.sliderRefreshInit();
    },
    methods: {
        valueInit () {
            if(this.options.find(item => item.name === this.value.name && item.type === this.value.type && item.key === this.value.key) === undefined)
                this.thisValue = this.options.find(item => item.type !== "header" && item.type !== "divider");
            else
                this.thisValue = this.value;
        },
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
        itemClick (event) {
            this.$emit("item-click",event.item)
            this.currentItem = event;
            this.thisValue = event.item;        
        },
        settingClick (item) {
            this.currentItem = item;
            this.$emit("setting-click", item);
        },
        expandChange (status) {
            this.thisExpand = status;
            this.$emit("update:expand", status);
            this.$emit("expand-change", status);
        },
        onChooseSearch (item) {
            this.$refs.listView.inspectItemAPI(item);
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>
