/**
 * @param prefix
 * @param preFix
 * @param componentname
 * @param ComponentName
 */
module.exports = `<template>
    <div :class="'{{prefix}}-'+$theme+'-{{componentname}}'">
        {{ComponentName}} TEMPLATE 
    </div>
</template>

<script>
export default {
    name: '{{preFix}}{{ComponentName}}',
    props: {
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {}
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.\${{prefix}}Global.state.theme;
            return this.theme;
        }
    }
}
</script>`