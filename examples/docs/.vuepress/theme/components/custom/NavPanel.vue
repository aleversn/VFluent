<template>
    <ClientOnly>
        <fv-NavigationView class="sidebar" :class="{ dark: isDark }" v-model="value" :title="'Fluent Vue Design'"
            :options="currentData" :expand.sync="computedExpand" :showSetting="false" :showExpand="false"
            @expand-click="$emit('expand-click', $event)" @back="go('/')"></fv-NavigationView>
    </ClientOnly>
</template>

<script>
export default {
    name: "NavPanel",
    props: {
        items: {},
        title: {},
        show: {
            default: false
        }
    },
    data() {
        return {
            value: {},
        };
    },
    watch: {
        value(val, from) {
            if (val !== from) {
                this.go(val.path);
            }
        },
    },
    computed: {
        computedExpand: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit("update:show", val);
            }
        },
        isDark() {
            return this.$fvGlobal.state.theme == "dark";
        },
        currentData() {
            let data = this.items.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else {
                    return 1;
                }
            });
            for (let i = 0; i < data.length; i++) {
                data[i].name = data[i].title;
                data[i].icon = "AppIconDefault";
                data[i]._type = data[i].type;
                data[i].type = "default";
            }
            return !this.search || this.search == ""
                ? data
                : data.filter(
                    (item) =>
                        item.title
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) != -1
                );
        },
    },
    methods: {
        go(url) {
            if (this.$route.path != url) this.$router.push(url);
        },
    },
    mounted() {
        this.value = this.currentData.find(
            (item) => item.key === this.$route.name
        );
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    overflow-x: hidden;
    top: 0;
}
</style>