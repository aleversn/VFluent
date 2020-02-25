<template>
<div :class="'fv-'+$theme+'-ListView'">
    <div class="list-view-container" ref="container">
        <span v-show="item.show !== false" v-for="(item, index) in thisValue" :class="{choose: item.choosen, header: item.type == 'header', hr: item.type == 'divider', normal: item.type == 'default' || item.type == undefined, disabled: item.disabled}" class="item" :key="index" :style="item.choosen ?choosenStyles.item : ''" @click="onClick($event, item)">
            <slot name="listItem" :item="item" :index="index">
                <p>{{item.name}}</p>
            </slot>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: 'FvListView',
    props: {
        value: {
            default: () => []
        },
        multiple: {
            default: false
        },
        rowHeight: {
            default: ""
        },
        choosenBackground: {
            default: ""
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: [],
            choosenStyles: {
                item: {
                    background: ""
                }
            }
        }
    },
    watch: {
        value (val) {
            this.valueInit();
        },
        choosenBackground (val) {
            this.stylesInit();
        }
    },
    computed: {
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
        currentChoosen () {
            let result = [];
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen && this.thisValue[i].show)
                    result.push(this.thisValue[i]);
            }
            return result;
        },
        currentChoosenAll () {
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen != true && this.thisValue[i].show)
                    return false;
            }
            return true;
        },
        currentChoosenNum () {
            let count = 0;
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen && this.thisValue[i].show)
                    count++;
            }
            return count;
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.FRInit();
        this.valueInit();
        this.stylesInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffects(this.$el, {
                selector: `.fv-${this.$theme}-ListView .list-view-container .item.normal`,
                borderGradientSize: 30,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        stylesInit () {
            this.choosenStyles.item.background = this.choosenBackground;
        },
        valueInit () {
            let model = {
                name: "",
                show: true,
                choosen: false,
                disabled: false
            };

            let result = [];
            
            for(let item of this.value) {
                let m = JSON.parse(JSON.stringify(model));
                result.push(Object.assign(m, item));
            }
            this.thisValue = result;
        },
        onClick($event, cur) {
            if (cur.disabled) return 0;
            if (cur.type === "header" || cur.type == "divider") return 0;
            if (this.multiple) {
                let t = this.currentChoosen.find(item => item.key === cur.key);
                if (t != undefined) {
                    cur.choosen = false;
                    this.$set(this.thisValue, this.thisValue.indexOf(cur), cur);
                } else {
                    cur.choosen = true;
                    this.$set(this.thisValue, this.thisValue.indexOf(cur), cur);
                }
            } else {
                for (let it of this.currentChoosen) {
                    it.choosen = false;
                    this.$set(this.thisValue, this.thisValue.indexOf(it), it);
                }
                cur.choosen = true;
                this.$set(this.thisValue, this.thisValue.indexOf(cur), cur);
            }

            this.scrollFormat($event);

            this.$emit("chooseItem", {
                item: cur,
                index: this.thisValue.indexOf(cur),
                event: $event
            });

            this.$emit("choosen-items", this.currentChoosen);
        },
        scrollFormat (event) {
            let targetPos = event.target.getBoundingClientRect();
            let elPos = this.$refs.container.getBoundingClientRect();
            if(targetPos.top < elPos.top) {
                let dis = elPos.top - targetPos.top;
                this.$refs.container.scrollTop -= dis;
            }
            if(targetPos.bottom > elPos.bottom) {
                let dis = elPos.bottom - targetPos.bottom;
                this.$refs.container.scrollTop -= dis;
            }
        },
        inspectItemAPI (cur) {
            let c = this.thisValue.find(it => {
                return it.name === cur.name && it.type === cur.type && it.key === cur.key;
            });
            let index = this.thisValue.indexOf(c);
            if(index < 0)   return 0;
            let items = this.$refs.container.querySelectorAll(".item");
            this.onClick({ target: items[index] }, cur);
        }
    }
}
</script>
