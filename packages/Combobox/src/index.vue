<template>
<div :class="'fv-'+$theme+'-combobox'">
    <fv-check-box v-model="a">{{a}}</fv-check-box>
</div>
</template>

<script>
export default {
    name: "FvCombobox",
    data() {
        return {
            a: ''
        };
    },
    computed: {
        $theme() {
            return this.$fvGlobal.state.theme;
        }
    }
};
</script>
