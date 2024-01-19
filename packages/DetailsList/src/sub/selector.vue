<template>
    <div
        class="fv-details-list-selector"
        :class="[{choosen: checked}]"
    >
        <div
            class="fv-details-list-icon-ring"
            :style="{background: checked ? color : ''}"
        >
            <i class="ms-Icon ms-Icon--StatusCircleCheckmark fv-details-list-icon-accept"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: false
        },
        color: {
            default: ''
        }
    },
    data() {
        return {
            checked: this.value
        };
    },
    watch: {
        value(val) {
            this.checked = val;
        },
        checked(val) {
            // this.$emit('input', val);
        }
    }
};
</script>