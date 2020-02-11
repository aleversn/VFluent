<template>
  <div :class="'fv-'+$theme+'-NavigationView'">
    NavigationView TEMPLATE 
  </div>
</template>

<script>
export default {
    name:'FvNavigationView',
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
