<template>
    <div
        :class="['fv-'+$theme+'-DropDown', isDisabled ? 'disabled' : '']"
        :style="styles.dropDown"
    >
        <drop-down-input
            v-model="choosenValue"
            :placeholder="placeholder"
            :theme="$theme"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :inputForeground="inputForeground"
            :inputBackground="inputBackground"
            :dropDownIcon="dropDownIcon"
            :dropDownIconForeground="dropDownIconForeground"
            :class="{error: showError}"
            ref="input"
            @click.native="show.listContainer = !isDisabled ? !show.listContainer : false"
        >
            <template v-slot:input="x">
                <slot
                    name="input"
                    :placeholder="x.placeholder"
                    :value="x.value"
                ></slot>
            </template>
        </drop-down-input>
        <p
            v-show="showError"
            class="err-msg"
        >{{errorMessage}}</p>
        <transition :name="`fv-drop-down-${dropDownListShowStatus.position}`">
            <list-container
                v-show="show.listContainer"
                v-model="choosenValue"
                :options="options"
                :multiple="multiple"
                :borderRadius="borderRadius"
                :dropDownListForeground="dropDownListForeground"
                :dropDownListBackground="dropDownListBackground"
                :showStatus="dropDownListShowStatus"
                :theme="$theme"
                @chooseItem="onChange"
            >
                <template v-slot:options="item">
                    <slot
                        name="options"
                        :option="item.option"
                        :index="item.index"
                    ></slot>
                </template>
            </list-container>
        </transition>
    </div>
</template>

<script>
import dropDownInput from "./input/input.vue";
import listContainer from "./list/listContainer.vue";

export default {
    name: "FvDropDown",
    components: {
        dropDownInput,
        listContainer
    },
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
        borderWidth: {
            default: 2
        },
        borderRadius: {
            default: "3"
        },
        placeholder: {
            default: "Dropdown"
        },
        maxHeight: {
            default: ""
        },
        inputForeground: {
            default: ""
        },
        dropDownListForeground: {
            default: "rgba(0,120,215,0.9)"
        },
        inputBackground: {
            default: ""
        },
        dropDownListBackground: {
            default: ""
        },
        dropDownIcon: {
            default: "ChevronDown"
        },
        dropDownIconForeground: {
            default: ""
        },
        showError: {
            default: false
        },
        errorMessage: {
            default: "This dropdown has an error"
        },
        disabled: {
            default: false
        },
        setFocus: {
            default: false
        },
        theme: {
            default: "system"
        }
    },
    data() {
        return {
            choosenValue: this.value,
            topRemainHeight: window.innerHeight,
            bottomRemainHeight: window.innerHeight,
            timer: {},
            styles: {
                dropDown: {
                    zIndex: 0
                }
            },
            show: {
                listContainer: false
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
        setFocus (val) {
            this.show.listContainer = val;
        },
        "show.listContainer"(val) {
            if (val) {
                this.styles.dropDown.zIndex = 1;
            } else this.styles.dropDown.zIndex = 0;
            this.$emit('visible-change', val);
        }
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isDisabled() {
            return (
                this.options.length == 0 ||
                this.disabled.toString() == "true" ||
                this.disabled == "disabled" ||
                this.disabled === ""
            );
        },
        dropDownListHeight() {
            return 36 * this.options.length;
        },
        dropDownListShowStatus() {
            if (this.dropDownListHeight < this.bottomRemainHeight)
                return {
                    position: "bottom",
                    top: "100%",
                    bottom: "",
                    height: "auto",
                    overflow: "hidden"
                };
            if (this.dropDownListHeight < this.topRemainHeight)
                return {
                    position: "top",
                    top: "",
                    bottom: "100%",
                    height: "auto",
                    overflow: "hidden"
                };
            if (this.topRemainHeight > this.bottomRemainHeight)
                return {
                    position: "top",
                    top: "",
                    bottom: "100%",
                    height: `${this.topRemainHeight}px`,
                    overflow: "auto"
                };
            return {
                position: "bottom",
                top: "100%",
                bottom: "",
                height: `${this.bottomRemainHeight}px`,
                overflow: "auto"
            };
        }
    },
    mounted() {
        this.outSideClickInit();
        this.heightSenseInit();
    },
    methods: {
        outSideClickInit() {
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
                if (!_self) this.show.listContainer = false;
            });
        },
        heightSenseInit() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                try {
                    this.topRemainHeight = this.$refs.input.$el.getBoundingClientRect().top;
                } catch (e) {
                    this.topRemainHeight = window.innerHeight;
                }
                try {
                    this.bottomRemainHeight =
                        window.innerHeight -
                        this.$refs.input.$el.getBoundingClientRect().bottom;
                } catch (e) {
                    this.bottomRemainHeight = window.innerHeight;
                }
            }, 300);
        },
        onChange(event) {
            this.show.listContainer = this.multiple;
            this.$emit("change", event);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>
