<template>
<div :class="'fv-'+$theme+'-ListView'">
    ListView TEMPLATE 
</div>
</template>

<script>
export default {
    name: 'FvListView',
    data () {
        return {}
    },
    props: {
        theme: {
            type: String,
            default: "system"
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    }
}
</script>
