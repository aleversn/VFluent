import MenuFlyout from "./src/index.vue";

MenuFlyout.install = function (Vue) {
    Vue.component(MenuFlyout.name, MenuFlyout);
  
};

export default MenuFlyout;
