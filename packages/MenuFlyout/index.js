import MenuFlyout from "./src/index.vue";
import MenuSubFlyout from "./src/MenuSubFlyout.vue";
import MenuItemFlyout from "./src/MenuItemFlyout.vue";

MenuFlyout.install = function(Vue) {
  Vue.component(MenuFlyout.name, MenuFlyout);
  Vue.component(MenuSubFlyout.name, MenuSubFlyout);
  Vue.component(MenuItemFlyout.name,MenuItemFlyout)
};

export default MenuFlyout;
