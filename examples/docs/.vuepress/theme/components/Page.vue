<template>
    <main class="page" :class="{ dark: isDark ,expand: expand}">
        <slot name="top" />
        <div class="page-top">
            <span class="text">Theme</span>
            <fv-toggle-switch class="toggle" v-model="isDark" on="Dark" off="Light"></fv-toggle-switch>
        </div>
        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
    </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
    components: { PageEdit, PageNav },
    props: {
        sidebarItems: {
        },
        expand: {}
    },
    computed: {
        isDark: {
            set(val) {
                if (val) {
                    this.$fvGlobal.commit("changeTheme", "dark");
                } else {
                    this.$fvGlobal.commit("changeTheme", "light");
                }
            },
            get() {
                return this.$fvGlobal.state.theme == "dark";
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.page-top {
    margin: 0 auto;
    padding-top: 50px;
    padding-left: 30px;
    max-width: 740px;
    display: flex;
    align-items: center;

    .toggle {
        display: inline-flex;
    }

    .text {
        margin-right: 10px;
        font-weight: bold;
    }
}

@media (max-width: 959px) {
    .page-top {
        padding: 2rem;
    }
}
</style>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
    padding-bottom: 2rem;
    display: block;
    &.dark{
      background:#0d1117;
      color:white;
    }
}
</style>
