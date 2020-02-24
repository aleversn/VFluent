<template>
<div :class="'fv-'+$theme+'-CommandBar'">
    <div class="left-command-bar-container" :style="{background: background}">
        <span v-for="(item, index) in thisOptions" class="command-bar-item" :class="[item.type == 'divider' ? 'hr' : 'normal']" :key="index" @click="itemClick($event, item)">
            <span v-show="item.type !== 'more'" class="s1-container">
                <i class="ms-Icon icon" :class="[`ms-Icon--${item.icon}`]" :style="{color: item.iconColor}"></i>
                <p class="name">
                    {{item.name}}
                </p>
                <i v-show="item.secondary.length > 0" class="ms-Icon ms-Icon--ChevronDown icon"></i>
            </span>
            <span v-show="item.type === 'more'" class="s1-container">
                <i class="ms-Icon ms-Icon--More icon"></i>
            </span>
        </span>
    </div>
    <div class="right-command-bar-container">
        <slot name="right-space"></slot>
    </div>
    <transition :name="toward == 'down' ? 'zoom-in-top' : 'zoom-in-bottom'">
        <div v-show="showDropDown" class="command-bar-list-view-container" :class="{'toward-up': toward == 'up'}" :style="{left: `${currentLeft}px`, background: background}">
            <fv-list-view v-model="thisValue.secondary" style="height: auto;" @chooseItem="chooseItem">
                <template v-slot:listItem="x">
                    <i v-show="x.item.icon !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.item.icon}`]" :style="{color: x.item.iconColor}"></i>
                    <p class="name">{{x.item.name}}</p>
                </template>
            </fv-list-view>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name:'FvCommandBar',
    props: {
        value: {
            default: () => {
                return {}
            }
        },
        options: {
            default: () => []
        },
        toward: {
            default: "down"
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
            thisOptions: [],
            currentLeft: 0
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit("input", val);
        },
        options (val) {
            this.optionsInit();
        }
    },
    computed: {
        showDropDown () {
            if(this.thisValue.choosen !== true)
                return false;
            if(this.thisValue.secondary === undefined)
                return false;
            if(this.thisValue.secondary.length > 0)
                return true;
            return false;
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
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.optionsInit();
        this.FRInit();
        this.outSideClickInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffects("body", {
                selector: `.fv-${this.$theme}-CommandBar .left-command-bar-container .command-bar-item.normal`,
                borderGradientSize: 80,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        optionsInit () {
            let model = {
                name: "",
                type: "normal",
                icon: "",
                choosen: false,
                secondary: []
            };
            let result = [];
            for(let item of this.options) {
                let m = JSON.parse(JSON.stringify(model));
                m = Object.assign(m, item);
                result.push(m);
            }
            this.thisOptions = result;
        },
        outSideClickInit() {
            window.addEventListener("click", event => {
                let x = event.target;
                let _self = false;
                while (x.tagName.toLowerCase() != "body") {
                    if (x == this.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.collapseAll();
            });
        },
        collapseAll () {
            for(let i = 0; i < this.thisOptions.length; i++) {
                let t = this.thisOptions[i];
                t.choosen = false;
                this.$set(this.thisOptions, i, t);
            }
        },
        itemClick (event, item) {
            let status = !item.choosen;
            this.collapseAll();
            item.choosen = status;
            this.$set(this.thisOptions, this.thisOptions.indexOf(item), item);
            this.thisValue = item;
            this.$emit("item-click", item);
            if(item.func !== undefined)
                item.func();
            this.leftFormat(event);
        },
        chooseItem (event) {
            let item = event.item;
            this.thisValue = item;
            if(item.func !== undefined)
                item.func();
            this.$emit("item-click", item);
            this.collapseAll();
        },
        leftFormat (event) {
            let x = event.target;
            while (x.getAttribute("class").indexOf("command-bar-item") < 0)
                x = x.parentNode;
            let thisLeft = this.$el.getBoundingClientRect().left;
            let thisRight = this.$el.getBoundingClientRect().right;
            let targetLeft = x.getBoundingClientRect().left;
            let targetRight = x.getBoundingClientRect().right;
            let menuWidth = 200;
            if(targetLeft + menuWidth > thisRight)
                this.currentLeft = thisRight - thisLeft - menuWidth;
            else
                this.currentLeft = targetLeft - thisLeft;
        }
    }
}
</script>
