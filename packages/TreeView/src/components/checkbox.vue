<template>
    <div
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
    computed:{
        color(){
            let t = onecolor(this.$attrs.foreground);
            if (t && t.lightness()>0.8){
                return "#333"
            }
            return undefined;
        }
    },
    methods: {
        icon() {
            if (this.status == "checked") {
                return "ms-Icon--CheckMark";
            } else if (this.status == "Indeterminate") {
                return "ms-Icon--CheckboxIndeterminate";
            } else return null;
        },
    },
};
</script>