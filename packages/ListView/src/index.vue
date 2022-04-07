<template>
<div :class="'fv-'+$theme+'-ListView'" @click="focus = true">
    <div class="list-view-container" ref="container">
        <span v-show="valueTrigger(item.show) !== false" v-for="(item, index) in thisValue" :class="{choose: valueTrigger(item.choosen), header: valueTrigger(item.type) == 'header', hr: valueTrigger(item.type) == 'divider', normal: valueTrigger(item.type) == 'default' || valueTrigger(item.type) == undefined, disabled: valueTrigger(item.disabled), selected: item.selected && showSelectedBorder}" class="item" :key="index" :style="{ background: valueTrigger(item.choosen) ? choosenBackground : '' }" :ref="`list_item_${index}`" @click="onClick($event, item)">
            <slot name="listItem" :item="item" :index="index" :valueTrigger="valueTrigger">
                <p :style="{ color: valueTrigger(item.type) == 'header' ? headerForeground : '' }">{{valueTrigger(item.name)}}</p>
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
        headerForeground: {
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
            focus: false,
            showSelectedBorder: false
        }
    },
    watch: {
        value (val) {
            this.valueInit();
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
                return 'rgba(160, 160, 160, 0.2)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.1)';
            }
            return 'rgba(160, 160, 160, 0.2)';
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
        this.outSideClickInit();
        this.keyDownEventInit();
        window.addEventListener("click", () => {
            this.showSelectedBorder = false;
        });
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffects(this.$el, {
                selector: `.fv-${this.$theme}-ListView .list-view-container .item.normal`,
                borderGradientSize: 25,
                borderLightColor: this.borderLightColor,
                backgroundGradientSize: 120,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        valueInit () {
            let model = {
                name: "",
                show: true,
                choosen: false,
                selected: false,
                disabled: false
            };

            let result = [];
            
            for(let item of this.value) {
                let m = JSON.parse(JSON.stringify(model));
                result.push(Object.assign(m, item));
            }
            this.thisValue = result;
        },
        outSideClickInit () {
            window.addEventListener("click", event => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                    if (x == this.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.focus = false;
            });
        },
        keyDownEventInit () {
            window.addEventListener("keydown", event => {
                if(!this.focus) return;
                if(event.keyCode === 40) this.move(event, 1);
                else if(event.keyCode === 38) this.move(event, -1);
                if(event.keyCode === 13) this.enter(event);
            });
        },
        valueTrigger (val) {
            if(typeof(val) === 'function')  return val();
            return val;
        },
        onClick($event, cur) {
            if (this.valueTrigger(cur.disabled)) return 0;
            if (this.valueTrigger(cur.type) === "header" || this.valueTrigger(cur.type) == "divider") return 0;
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

            this.selectionFormat(cur);
            this.scrollFormat($event.target);

            this.$emit("chooseItem", {
                item: cur,
                index: this.thisValue.indexOf(cur),
                event: $event
            });

            this.$emit("choosen-items", this.currentChoosen);
        },
        move ($event, direction) {
            $event.preventDefault();
            this.showSelectedBorder = true;
            let selectedItem = this.thisValue.find(it => it.selected === true);
            if(!selectedItem) {
                selectedItem = this.thisValue.find(it => {
                    if (this.valueTrigger(it.disabled)) return false;
                    if (this.valueTrigger(it.type) === "header" || this.valueTrigger(it.type) == "divider") return false;
                    return true;
                });
                if(!selectedItem) return;
                let selectedItemIndex = this.thisValue.indexOf(selectedItem);
                this.selectionFormat(selectedItem);
                this.scrollFormat(this.$refs[`list_item_${selectedItemIndex}`][0]);
                return;
            }
            let selectedItemIndex = this.thisValue.indexOf(selectedItem);
            if(direction == 1) {
                for(let i = selectedItemIndex + 1; i < this.thisValue.length; i++) {
                    if(this.valueTrigger(this.thisValue[i].disabled)) continue;
                    if(this.valueTrigger(this.thisValue[i].type) === "header" || this.valueTrigger(this.thisValue[i].type) == "divider") continue;
                    selectedItem = this.thisValue[i];
                    selectedItemIndex = i;
                    break;
                }
            }
            else if(direction == -1) {
                for(let i = selectedItemIndex - 1; i >= 0; i--) {
                    if(this.valueTrigger(this.thisValue[i].disabled)) continue;
                    if(this.valueTrigger(this.thisValue[i].type) === "header" || this.valueTrigger(this.thisValue[i].type) == "divider") continue;
                    selectedItem = this.thisValue[i];
                    selectedItemIndex = i;
                    break;
                }
            }
            this.selectionFormat(selectedItem);
            this.scrollFormat(this.$refs[`list_item_${selectedItemIndex}`][0]);
        },
        enter ($event) {
            let cur = this.thisValue.find(it => it.selected === true);
            if(!cur) return;
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

            this.$emit("chooseItem", {
                item: cur,
                index: this.thisValue.indexOf(cur),
                event: $event
            });

            this.$emit("choosen-items", this.currentChoosen);
        },
        scrollFormat (target) {
            let targetPos = target.getBoundingClientRect();
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
        selectionFormat (cur) {
            this.thisValue.forEach((el, idx) => {
                if(el.key === cur.key && el.name === cur.name) {
                    el.selected = true;
                    this.$set(this.thisValue, idx, el);
                    this.$emit('selection-change', el);
                } else {
                    el.selected = false;
                    this.$set(this.thisValue, idx, el);
                }
            });
        },
        inspectItemAPI (cur) {
            let c = this.thisValue.find(it => {
                return this.valueTrigger(it.name) === this.valueTrigger(cur.name) && this.valueTrigger(it.type) === this.valueTrigger(cur.type) && it.key === cur.key;
            });
            let index = this.thisValue.indexOf(c);
            if(index < 0)   return 0;
            let items = this.$refs.container.querySelectorAll(".item");
            this.onClick({ target: items[index] }, cur);
        }
    }
}
</script>
