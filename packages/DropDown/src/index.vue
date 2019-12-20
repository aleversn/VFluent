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
        <transition name="fv-drop-down">
            <list-container
                v-show="show.listContainer"
                v-model="choosenValue"
                :options="options"
                :multiple="multiple"
                :borderRadius="borderRadius"
                :dropDownListForeground="dropDownListForeground"
                :dropDownListBackground="dropDownListBackground"
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
            default: () => [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple" },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape" },
                { key: "divider_1", text: "-", type: "divider" },
                { key: "vegetablesHeader", text: "Vegetables", type: "header" },
                { key: "broccoli", text: "Broccoli" },
                { key: "carrot", text: "Carrot" },
                { key: "lettuce", text: "Lettuce" }
            ]
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
        theme: {
            default: "system"
        }
    },
    data() {
        return {
            choosenValue: this.value,
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
        "show.listContainer"(val) {
            if (val) {
                this.styles.dropDown.zIndex = 1;
            } else this.styles.dropDown.zIndex = 0;
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
        }
    },
    mounted() {
        this.outSideClick();
    },
    methods: {
        outSideClick() {
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
                if (!_self) this.show.listContainer = false;
            });
        },
        onChange(event) {
            this.show.listContainer = this.multiple;
            this.$emit("change", event);
        }
    }
};
</script>
