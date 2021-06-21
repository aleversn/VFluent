<template>
    <!-- <div
        @click="$emit('click', $event)"
        class="fv-TreeView__checkbox"
        :class="[status]"
        role="checkbox"
        :style="{
            borderColor: $attrs.foreground,
        }"
    >
        <i
            class="ms-Icon"
            :style="{
                color:color,
                backgroundColor: status?$attrs.foreground:undefined,
            }"
            :class="icon()"
        />
    </div> -->
    <div>
        <fv-check-box
            role="checkbox"
            class="fv-TreeView__checkbox"
            @click="check"
            :value="checkBoxValue"
            :borderColor="$attrs.foreground"
            :background="color"
        >
        </fv-check-box>
    </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import onecolor from "onecolor";

export default {
    name: "FvTreeViewCheckbox",
    props: {
        status: {
            type: String,
            default: "Indeterminate",
        },
    },
    computed: {
        color() {
            let t = onecolor(this.$attrs.foreground);
            if (t && t.lightness() > 0.6) {
                return "#333";
            }
            return this.$attrs.foreground;
        },
        checkBoxValue() {
            if (this.status == "checked") {
                return true;
            } else if (this.status == "Indeterminate") {
                return "";
            }
            return false;
        },
    },
    methods: {
        icon() {
            if (this.status == "checked") {
                return "ms-Icon--CheckMark";
            } else if (this.status == "Indeterminate") {
                return "ms-Icon--CheckboxIndeterminate";
            } else return null;
        },
        check(value) {
            this.$emit("click", value);
        },
    },
};
</script>