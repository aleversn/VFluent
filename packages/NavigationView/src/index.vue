<template>
    <div :class="['fv-'+$theme+'-NavigationView', {compact: !thisExpand}]">
        <fv-NavigationPanel
            :title="title"
            :expand.sync="thisExpand"
            :expandMode="expandMode"
            :expandWidth="expandWidth"
            :expandDisplay="expandDisplay"
            :compactWidth="compactWidth"
            :flyoutDisplay="flyoutDisplay"
            :fullSizeDisplay="fullSizeDisplay"
            :mobileDisplay="mobileDisplay"
            :showBack="showBack"
            :showNav="showNav"
            :showSearch="showSearch"
            :settingTitle="settingTitle"
            :showSetting="false"
            :background="background"
            :theme="theme"
            ref="panel"
            @back="$emit('back', $event)"
            @expand-click="$emit('expand-click', $event)"
            @expand-change="expandChange"
            @setting-click="settingClick"
        >
            <template v-slot:searchBlock>
                <fv-search-box
                    :options="options"
                    icon="Search"
                    :placeholder="searchPlaceholder"
                    :theme="theme"
                    class="nav-search"
                    :revealBorder="true"
                    borderRadius="3"
                    :isBoxShadow="true"
                    style="width: 95%;"
                    @choose-result="onChooseSearch"
                ></fv-search-box>
            </template>
            <template v-slot:panel>
                <fv-list-view
                    v-model="options"
                    class="navigation-list"
                    ref="listView"
                    :theme="theme"
                    :headerForeground="foreground"
                    choosenBackground="transparent"
                    :sliderTarget.sync="currentTarget"
                    :showSlider="true"
                    @chooseItem="itemClick"
                    @item-click="$emit('item-click', $event.item)"
                >
                    <template v-slot:listItem="x">
                        <slot
                            name="listItem"
                            :item="x.item"
                            :index="x.index"
                            :valueTrigger="x.valueTrigger"
                        >
                            <i
                                v-show="x.valueTrigger(x.item.icon) !== undefined"
                                class="ms-Icon icon"
                                :class="[`ms-Icon--${x.valueTrigger(x.item.icon)}`]"
                            ></i>
                            <p
                                class="name"
                                :style="{ color: x.valueTrigger(x.item.type) == 'header' ? foreground : ''}"
                            >{{x.valueTrigger(x.item.name)}}</p>
                        </slot>
                    </template>
                    <template v-slot:footer>
                        <fv-animated-icon
                            v-show="showSetting"
                            ref="setting"
                            value="bounceRotate"
                            class="fv-nav-default-item"
                            :hideContent="!thisExpand"
                            style="width: calc(100% - 10px);"
                            @click="settingClick({event: $event})"
                        >
                            <i class="ms-Icon ms-Icon--Settings icon"></i>
                            <template v-slot:content>
                                <p class="name">{{settingTitle}}</p>
                            </template>
                        </fv-animated-icon>
                    </template>
                </fv-list-view>
            </template>
        </fv-NavigationPanel>
    </div>
</template>

<script>
export default {
    name: 'FvNavigationView',
    props: {
        value: {
            default: () => {
                return {};
            }
        },
        options: {
            default: () => []
        },
        title: {
            default: 'NavigationView'
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
            default: 46
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
        searchPlaceholder: {
            default: 'Search'
        },
        foreground: {
            default: ''
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
            thisValue: {},
            thisExpand: this.expand,
            currentTarget: {},
            currentTop: 0,
            currentHeight: 0,
            timer: {
                slider: {}
            }
        };
    },
    watch: {
        value(val, from) {
            this.valueInit();
        },
        thisValue(val, from) {
            if (!(val.name === from.name && val.key === from.key)) {
                this.$nextTick(() => {
                    this.onChooseSearch(val);
                });
                this.$emit('input', val);
            }
        },
        expand(val) {
            this.thisExpand = val;
        },
        thisExpand(val) {
            this.$emit('update:expand', val);
        }
    },
    computed: {
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.valueInit();
    },
    methods: {
        valueInit() {
            if (this.value.type === 'setting') {
                this.thisValue = this.value;
                return 0;
            }
            let thisValue = this.options.find(
                (item) =>
                    item.name === this.value.name && item.key === this.value.key
            );
            if (thisValue !== undefined) this.thisValue = thisValue;
            else
                this.thisValue = this.options.find(
                    (item) => item.type !== 'header' && item.type !== 'divider'
                );
        },
        itemClick(event) {
            this.thisValue = event.item;
        },
        settingClick(item) {
            this.currentTarget = this.$refs.setting.$el;
            this.thisValue = {
                key: '>setting',
                name: '>setting',
                type: 'setting'
            };
            this.$emit('setting-click', item);
        },
        expandChange(status) {
            this.$emit('expand-change', status);
        },
        onChooseSearch(item) {
            if (item.type === 'setting') {
                this.currentTarget = this.$refs.setting.$el;
                this.thisValue = {
                    key: '>setting',
                    name: '>setting',
                    type: 'setting'
                };
                return 0;
            }
            let c = this.options.find((it) => {
                return it.name === item.name && it.key === item.key;
            });
            let index = this.options.indexOf(c);
            if (index < 0) return 0;
            this.currentTarget =
                this.$refs.listView.$refs[`list_item_${index}`][0];
            this.thisValue = c;
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>
