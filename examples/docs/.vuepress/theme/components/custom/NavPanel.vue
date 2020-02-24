<template>
  <fv-NavigationPanel
    class="sidebar"
    :title="''"
    :expand.sync="expand"
    style="position:fixed;"
    @back="go('/')"
    :showSetting="false"
    :showBack="false"
    :showExpand="false"
  >
    <template v-slot:searchBlock>
      <fv-search-box
        icon="Search"
        v-model="search"
        placeholder="Search Component"
        class="nav-search"
        style="width: 100%;"
      ></fv-search-box>
    </template>
    <template v-slot:panel>
      <span
        v-for="item in data"
        :key="item.title"
        class="default-item control"
        @click="go(item.path)"
        style="cursor:pointer;"
      >
        <i class="ms-Icon ms-Icon--WebComponents icon" />
        <span v-show="expand" class="router-link">{{item.title.split(' ')[0]}}</span>
      </span>
    </template>
  </fv-NavigationPanel>
</template>

<script>
export default {
  name: "NavPanel",
  props: {
    items: {},
    title: {}
  },
  data() {
    return {
      expand: true,
      search: ""
    };
  },
  computed: {
    data() {
      let data = this.items.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
      return !this.search || this.search == ""
        ? data
        : data.filter(
            item =>
              item.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
          );
    }
  },
  methods: {
    go(url) {
      if (this.$route.path != url) this.$router.push(url);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>