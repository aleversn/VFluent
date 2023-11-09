<template>
    <div class="fv-details-list-selector">
        <i class="ms-Icon ms-Icon--Completed fv-details-list-icon"></i>
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
            this.$emit('input', val);
        }
    }
};
</script>