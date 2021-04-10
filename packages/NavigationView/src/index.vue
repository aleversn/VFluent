<template>
<div :class="['fv-'+$theme+'-NavigationView', {compact: !thisExpand}]">
    <fv-NavigationPanel :title="title" :expand="expand" :expandMode="expandMode" :expandWidth="expandWidth" :expandDisplay="expandDisplay" :flyoutDisplay="flyoutDisplay" :fullSizeDisplay="fullSizeDisplay" :mobileDisplay="mobileDisplay" :showBack="showBack" :showSearch="showSearch" :settingTitle="settingTitle" :showSetting="showSetting" :background="background" :theme="theme" ref="panel" @back="$emit('back', $event)" @expand-change="expandChange" @setting-click="settingClick">
        <template v-slot:searchBlock>
            <fv-search-box :options="options" icon="Search" placeholder="Search" :theme="theme" class="nav-search" :revealBorder="true" borderWidth="2" borderRadius="3" style="width: 100%; box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);" @choose-result="onChooseSearch"></fv-search-box>
        </template>
        <template v-slot:panel>
            <fv-list-view v-model="options" class="navigation-list" ref="listView" :theme="theme" :headerForeground="foreground" choosenBackground="transparent" @chooseItem="itemClick" @click.native="$emit('item-click', thisValue)">
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
            currentTarget: {},
            currentTop: 0,
            currentHeight: 0,
            thisExpand: this.expand,
            timer: {
                slider: {}
            }
        }
    },
    watch: {
        value (val, from) {
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
            if(this.value.type === 'setting') {
                this.thisValue = this.value;
                return 0;
            }
            if(this.options.find(item => item.name === this.value.name && item.type === this.value.type && item.key === this.value.key) === undefined)
                this.thisValue = this.options.find(item => item.type !== "header" && item.type !== "divider");
            else
                this.thisValue = this.value;
        },
        sliderRefreshInit () {
            this.timer.slider = setInterval(() => {
                if(this.currentTarget !== undefined) {
                    let target = this.currentTarget;
                    let elTop = this.$el.getBoundingClientRect().top;
                    let targetTop = target.getBoundingClientRect().top;
                    this.currentTop = targetTop - elTop;
                }
                else
                    this.currentTop = 0;
                if(this.currentTarget !== undefined) {
                    let target = this.currentTarget;
                    this.currentHeight = target.clientHeight;
                }
                else
                    this.currentHeight = 0;
            }, 30);
        },
        itemClick (event) {
            let index = event.index;
            this.currentTarget = (this.$refs.listView.$refs[`list_item_${index}`])[0];
            this.thisValue = event.item;
        },
        settingClick (item) {
            this.currentTarget = this.$refs.panel.$refs.setting;
            this.thisValue = {
                name: ">setting",
                type: "setting"
            };
            this.$emit("setting-click", item);
        },
        expandChange (status) {
            this.thisExpand = status;
            this.$emit("update:expand", status);
            this.$emit("expand-change", status);
        },
        onChooseSearch (item) {
            if(item.type === "setting") {
                this.currentTarget = this.$refs.panel.$refs.setting;
                return 0;
            }
            let c = this.options.find(it => {
                return it.name === item.name && it.type === item.type && it.key === item.key;
            });
            let index = this.options.indexOf(c);
            if(index < 0)
                return 0;
            this.currentTarget = (this.$refs.listView.$refs[`list_item_${index}`])[0];
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>
