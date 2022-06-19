<template>
    <div :class="['fv-' + $theme + '-Pivot', tab ? 'tab' : '']" :style="{background: background}">
        <div class="pivot-container">
            <span
                v-show="item.show"
                class="pivot-item"
                v-for="(item, index) in thisItems"
                :key="index"
                :class="{
                    choose: eqal(item),
                    disabled: item.disabled,
                }"
                :style="{ width: `${itemWidth(item)}px` }"
                @click="itemClick(item)"
            >
                <slot name="container" :item="item" :index="index">
                    <p :style="{ color: styles.container.color }">
                        {{ item.name }}
                    </p>
                </slot>
            </span>
        </div>
        <slider
            :left="currentLeft"
            :width="currentWidth"
            :sliderBoxshadow="sliderBoxshadow"
            :background="styles.slider.background"
        ></slider>
    </div>
</template>

<script>
import slider from "./sub/slider.vue";

export default {
    name: "FvPivot",
    components: {
        slider,
    },
    props: {
        value: {
            default: () => {
                return null;
            },
        },
        items: {
            default: () => [{ name: "Pivot", width: 80 }],
        },
        tab: {
            default: false,
        },
        foreground: {
            default: "",
        },
        sliderBackground: {
            default: "",
        },
        sliderBoxshadow: {
            default: false
        },
        background: {
            default: "",
        },
        theme: {
            type: String,
            default: "system",
        },
    },
    data() {
        return {
            thisItems: this.items,
            thisValue: this.value,
            styles: {
                slider: {
                    background: "",
                },
                container: {
                    color: "",
                },
            },
        };
    },
    watch: {
        value(val) {
            if(val.key) {
                let match = this.thisItems.find(item => item.key === val.key);
                if(match)
                    this.thisValue = match;
                else
                    this.thisValue = val;
                return;
            }
            else if(val.name) {
                let match = this.thisItems.find(item => item.name === val.name);
                if(match)
                    this.thisValue = match;
                else
                    this.thisValue = val;
            }
            this.thisValue = val;
        },
        items(val) {
            this.itemsInit();
        },
        thisValue(val) {
            this.$emit("input", val);
            this.$emit("change", val);
        },
        foreground(val) {
            this.stylesInit();
        },
        sliderBackground(val) {
            this.stylesInit();
        },
    },
    computed: {
        currentLeft() {
            let index = -1;
            if(this.thisValue.key) index = this.thisItems.findIndex(item => item.key === this.thisValue.key);
            else index = this.thisItems.findIndex(item => item.name === this.thisValue.name);
            if (index < 0) return 0;
            let count = 0;
            for (let i = 0; i < index; i++) {
                if (this.thisItems[i].show) count += this.thisItems[i].width;
            }
            return count;
        },
        currentWidth() {
            return !this.thisValue || !this.thisValue.width
                ? 0
                : this.thisValue.width;
        },
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
    },
    mounted() {
        this.stylesInit();
        this.itemsInit();
    },
    methods: {
        itemsInit() {
            let model = {
                name: "Pivot",
                width: 60,
                show: true,
                disabled: false,
            };
            let items = [];
            for (let item of this.items) {
                let m = JSON.parse(JSON.stringify(model));
                Object.assign(m, item);
                items.push(m);
            }
            this.thisItems = items;
            if (!this.thisValue || !this.value) {
                this.thisValue = this.thisItems[0];
            }
        },
        stylesInit() {
            this.styles.slider.background = this.sliderBackground;
            this.styles.container.color = this.foreground;
        },
        itemClick(item) {
            if (item.disabled) return 0;
            this.thisValue = item;
        },
        itemWidth (item) {
            if(!item.width)
                return 0;
            return item.width;
        },
        eqal (item) {
            for(let key in this.thisValue) {
                if(this.thisValue[key] !== item[key])
                    return false;
            }
            return true;
        }
    },
};
</script>
