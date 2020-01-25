<template>
<div>
    <input type="text" ref="input" @keydown="change">
</div>
</template>

<script>
export default {
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
    },
    mounted () {
        this.$refs.input.addEventListener('paste', event => {
            console.log(event);
            console.log(event.clipboardData.getData('text/plain'));
        });
    },
    methods: {
        change (event) {
            event.preventDefault();
            console.log(event);
        }
    }
};
</script>