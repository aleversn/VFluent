<template>
  <div :class="'fv-'+$theme+'-TreeView'">
    TreeView TEMPLATE 
  </div>
</template>

<script>
export default {
    name:'FvTreeView',
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
