<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >

        <NavPanel
            :show.sync="isSidebarOpen"
            @toggle-sidebar="toggleSidebar"
            :items="sidebarItems"
            :title="$description"
            @expand-click="isSidebarOpen ^= true"
        ></NavPanel>

        <Home v-if="$page.frontmatter.home" />

        <Page
            v-else
            :sidebar-items="sidebarItems"
            :expand="isSidebarOpen"
        >
            <template #top>
                <slot name="page-top" />
            </template>
            <template #bottom>
                <slot name="page-bottom" />
            </template>
        </Page>
    </div>
</template>

<script>
import Home from '@theme/components/Home.vue';
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import { resolveSidebarItems } from '../util';
import NavPanel from '@theme/components/custom/NavPanel.vue';

export default {
    name: 'Layout',

    components: {
        Home,
        Page,
        Sidebar,
        Navbar,
        NavPanel,
    },

    data() {
        return {
            isSidebarOpen: false,
        };
    },

    computed: {
        shouldShowNavbar() {
            const { themeConfig } = this.$site;
            const { frontmatter } = this.$page;
            if (frontmatter.navbar === false || themeConfig.navbar === false) {
                return false;
            }
            return this.$title || themeConfig.logo || themeConfig.repo || themeConfig.nav || this.$themeLocaleConfig.nav;
        },

        shouldShowSidebar() {
            const { frontmatter } = this.$page;
            return !frontmatter.home && frontmatter.sidebar !== false && this.sidebarItems.length;
        },

        sidebarItems() {
            return resolveSidebarItems(this.$page, this.$page.regularPath, this.$site, this.$localePath);
        },

        pageClasses() {
            const userPageClass = this.$page.frontmatter.pageClass;
            return [
                {
                    'no-navbar': !this.shouldShowNavbar,
                    'sidebar-open': this.isSidebarOpen,
                    'no-sidebar': !this.shouldShowSidebar,
                },
                userPageClass,
            ];
        },
    },

    mounted() {
        this.$router.afterEach(() => {
            this.isSidebarOpen = false;
        });
    },

    methods: {
        toggleSidebar(to) {
            this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
            this.$emit('toggle-sidebar', this.isSidebarOpen);
        },

        // side swipe
        onTouchStart(e) {
            this.touchStart = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };
        },

        onTouchEnd(e) {
            const dx = e.changedTouches[0].clientX - this.touchStart.x;
            const dy = e.changedTouches[0].clientY - this.touchStart.y;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0 && this.touchStart.x <= 80) {
                    this.toggleSidebar(true);
                } else {
                    this.toggleSidebar(false);
                }
            }
        },
    },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 10px;
    height: 8px;

    &:hover {
        width: 16px;
    }
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
    border-radius: 10px;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-right: rgba(191, 190, 189, 0.2) solid 5px;
    background-color: rgba(191, 190, 189, 0);
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        border-radius: 10px;
        border-color: transparent;
        background-color: rgba(191, 190, 189, 0.6);
    }

    &:active {
        background-color: rgba(191, 190, 189, 0.5);
    }

    &:horizontal {
        border-right: none;
        border-bottom: rgba(191, 190, 189, 0.2) solid 5px;
    }
}

body {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>