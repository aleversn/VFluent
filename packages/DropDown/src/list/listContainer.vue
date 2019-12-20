<template>
    <div class="list-container" :style="styles.listContainer">
        <div
            v-for="(item, index) in options"
            :key="`item: ${index}`"
            @click="onClick(item)"
        >
            <div
                class="list-item"
                :class="{hr:item.type == 'divider', normal:item.type == 'default' || item.type == undefined, disabled: item.disabled, choose: item.choosed}"
            >
                <p
                    v-show="item.type == 'header'"
                    class="title"
                    :style="styles.title"
                >{{item.text}}</p>
                <slot
                    name="options"
                    :option="item"
                    :index="index"
                >
                    <fv-check-box
                        v-model="item.choosed"
                        v-show="item.type == 'default' || item.type == undefined && multiple"
                        :disabled="item.disabled"
                        :borderColor="dropDownListForeground"
                        :background="dropDownListForeground"
                        :theme="theme"
                    >{{item.text}}</fv-check-box>
                    <p v-show="item.type == 'default' || item.type == undefined && !multiple">{{item.text}}</p>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => []
        },
        options: {
            default: () => []
        },
        multiple: {
            default: false
        },
        borderRadius: {
            default: '3'
        },
        dropDownListForeground: {
            default: "rgba(0,120,215,0.9)"
        },
        dropDownListBackground: {
            default: ""
        },
        theme: {
            default: "system"
        }
    },
    data() {
        return {
            choosenValue: this.value,
            styles: {
                listContainer: {
                    background: "",
                    borderRadius: ""
                },
                title: {
                    color: ""
                }
            }
        };
    },
    watch: {
        value(val) {
            this.choosenValue = val;
        },
        choosenValue(val) {
            this.$emit("input", val);
        },
        borderRadius () {
            this.stylesInit();
        },
        dropDownListForeground() {
            this.stylesInit();
        },
        dropDownListBackground() {
            this.stylesInit();
        }
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.stylesInit();
    },
    methods: {
        stylesInit() {
            this.styles.listContainer.borderRadius = `${this.borderRadius}px`;
            this.styles.listContainer.background = this.dropDownListBackground;
            this.styles.title.color = this.dropDownListForeground;
        },
        onClick(cur) {
            if (cur.disabled) return 0;
            if (this.multiple) {
                let t = this.choosenValue.find(item => item.key === cur.key);
                if (t != undefined) {
                    cur.choosed = false;
                    this.choosenValue.splice(this.choosenValue.indexOf(t), 1);
                    this.$set(this.options, this.options.indexOf(cur), cur);
                } else {
                    cur.choosed = true;
                    this.choosenValue.push(cur);
                    this.$set(this.options, this.options.indexOf(cur), cur);
                }
            } else {
                for (let it of this.choosenValue) {
                    it.choosed = false;
                    this.$set(this.options, this.options.indexOf(it), it);
                }
                cur.choosed = true;
                this.choosenValue = [];
                this.choosenValue.push(cur);
                this.$set(this.options, this.options.indexOf(cur), cur);
            }

            this.$emit("chooseItem", {
                option: cur,
                index: this.options.indexOf(cur)
            });
        }
    }
};
</script>