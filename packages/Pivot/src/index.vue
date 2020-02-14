<template>
<div :class="['fv-'+$theme+'-Pivot', tab ? 'tab' : '']">
    <div class="pivot-container">
        <span class="item" v-for="(item, index) in thisItems" :key="index" :class="{choose: currentItem == item}" :style="{width: `${item.width}px`}" @click="currentItem = item">
            <slot name="container" :item="item" :index="index">
                <p :style="{color: styles.container.color}">{{item.name}}</p>
            </slot>
        </span>
    </div>
    <slider :left="currentLeft" :width="currentWidth" :background="styles.slider.background"></slider>
</div>
</template>

<script>
import slider from './sub/slider.vue';

export default {
    name:'FvPivot',
    components: {
        slider
    },
    props: {
        value: {
            default: () => {
                return {}
            }
        },
        items: {
            default: () => [{ name: "Pivot", width: 80 }]
        },
        tab: {
            default: false
        },
        foreground: {
            default: ""
        },
        sliderBackground: {
            default: ""
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisItems: [],
            currentItem: {},
            styles: {
                slider: {
                    background: ""
                },
                container: {
                    color: ""
                }
            }
        }
    },
    watch: {
        value (val) {
            this.currentItem = val;
        },
        items (val) {
            this.itemsInit();
        },
        currentItem (val) {
            this.$emit("input", val);
        },
        foreground (val) {
            this.stylesInit();
        },
        sliderBackground (val) {
            this.stylesInit();
        }
    },
    computed: {
        currentLeft () {
            let index = this.thisItems.indexOf(this.currentItem);
            if(index < 0)
                return 0;
            let count = 0;
            for(let i = 0; i < index; i++)
                count += this.thisItems[i].width;
            return count;
        },
        currentWidth () {
            return this.currentItem.width == undefined ? 0 : this.currentItem.width;
        },
        $theme () {
          if (this.theme=='system')
              return this.$fvGlobal.state.theme;
          return this.theme;
        }
    },
    mounted () {
        this.itemsInit();
        this.stylesInit();
    },
    methods: {
        itemsInit () {
            let model = { name: "Pivot", width: 60};
            let items = [];
            for(let item of this.items) {
                let m = JSON.parse(JSON.stringify(model));
                for(let it in item) {
                    m[it] = item[it];
                }
                items.push(m);
            }
            this.thisItems = items;
            if(this.value.width == undefined)
                this.currentItem = this.thisItems[0];
        },
        stylesInit () {
            this.styles.slider.background = this.sliderBackground;
            this.styles.container.color = this.foreground;
        }
    }
}
</script>
