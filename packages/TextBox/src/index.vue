<template>
<div :class="'fv-'+$theme+'-TextBox'">
    <core></core>
</div>
</template>

<script>
import core from './sub/core.vue';

export default {
    name: "FvTextBox",
    components: {
        core
    },
    data () {
        return {};
    },
    props: {
        theme: {
            type: String,
            default: "system"
        }
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        }
    }
};
</script>
