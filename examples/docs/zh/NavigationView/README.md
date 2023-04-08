---
title: NavigationView
sidebarDepth: 2
---

[[toc]]

### NavigationView-DEMO
---

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { name: "Fruits", type: "header"},
                { name: "Apple", icon: "WindowsLogo"},
                { name: "Banana", icon: "DelveAnalyticsLogo"},
                { name: "Orange", icon: "Guitar"},
                { name: "Grape", icon: "HailDay"},
                { name: "", type: "divider" },
                { name: "Vegetables", type: "header"},
                { name: "Broccoli", icon: "QuadColumn"},
                { name: "Carrot", icon: "Quantity"},
                { name: "Lettuce", icon: "TestBeaker"}
            ]
        }
    }
}
</script>

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Mobile Display

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

1. Standard

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

2. Flyout

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

3. Mobile

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### Propoties

---

|   属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |                                说明(statement)                                 |
|:---------------:|:----------------------------------:|:--------------:|:---------------:|:------------------------------------------------------------------------------:|
|      value      |              Array               |       No       |       N/A       |                          当前选中项, 用`v-model`绑定                           |
|     options     |              Array               |      Yes       |       N/A       |                  选项数据, 参照`ListView`中的`items`数据格式                   |
|      title      |              String              |       No       | NavigationView  |                              NavigationView 标题                               |
|     expand      |             Boolean              |       No       |      true       |                    初始是否展开, 可通过 sync 方法来同步状态                    |
|   expandMode    |       ['relative','flyout']        |       No       |    relative     |                           展开模式, 有占位和浮动两种                           |
|   expandWidth   |              Number              |       No       |       350       |                             展开宽度, 以`px`为单位                             |
|  expandDisplay  |              Number              |       No       |      1024       |                            浏览器宽度大于多少时展开                            |
|  flyoutDisplay  |              Number              |       No       |        0        | 浏览器宽度小于多少时开启浮动模式, 若`expandMode`设为`flyout`, 则始终为浮动模式 |
| fullSizeDisplay |              Number              |       No       |       800       |                          浏览器宽度小于多少时全屏显示                          |
|  mobileDisplay  |              Number              |       No       |        0        |                       浏览器宽度小于多少时开启移动端模式                       |
|    showBack     |             Boolean              |       No       |      true       |                                是否显示后退按钮                                |
|   showSearch    |             Boolean              |       No       |      true       |                                 是否显示搜索框                                 |
|  settingTitle   |              String              |       No       |    Settings     |                                 设置选项的标题                                 |
|   showSetting   |             Boolean              |       No       |      true       |                                是否显示设置选项                                |
|   foreground    |          [string(color)]           |       No       |       N/A       |                             NavigationView 前景色                              |
|   background    |          [string(color)]           |       No       |       N/A       |                             NavigationView 背景色                              |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---

| 事件名(Name)  | 参数类型(args) |                    说明(statement)                    |
|:-------------:|:--------------:|:-----------------------------------------------------:|
|  item-click   |     object     |                    选项点击后触发                     |
| setting-click |     Object     | 设置选项被点击后触发事件, 返回`{ event: MouseEvent }` |
| update:expand |    boolean     |         当折叠或展开时同步外界传入的`expand`          |
| expand-change |    boolean     |         当折叠或展开时触发事件并提供当前状态          |
|     back      |   MouseEvent   |               返回选项被点击后触发事件                |

### Slot

---

1. ListItem

默认以value中每一项的属性name作为默认显示, 参考`ListView`, 包含以下可选属性
- item: 当前项
- index: 当前项索引

```vue
<template v-slot:listItem="x">
    <i v-show="x.valueTrigger(x.item.icon) !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.valueTrigger(x.item.icon)}`]"></i>
    <p class="name" :style="{ color: x.valueTrigger(x.item.type) == 'header' ? foreground : ''}">{{x.valueTrigger(x.item.name)}}</p>
</template>
```

注意在收缩时要隐藏<p>标签的话一定要将其类型加上`name`.

### Data

---

1. options

- 数据格式参考`ListView`中`items`的形式, 其中`key`字段建议开发者在有重复名称和类型字段时声明用来区别项目
- 开发者可利用`icon`字段来应用`Fabric Icon`

```javascript
options = [{ key: "", name: "", type: "", icon: "", disabled: "" }];

//e.g.//

options: [
  { name: "Fruits", type: "header" },
  { name: "Apple", icon: "WindowsLogo" },
  { name: "Banana", icon: "DelveAnalyticsLogo" },
  { name: "Orange", icon: "Guitar" },
  { name: "Grape", icon: "HailDay" },
  { name: "", type: "divider" },
  { name: "Vegetables", type: "header" },
  { name: "Broccoli", icon: "QuadColumn" },
  { name: "Carrot", icon: "Quantity" },
  { name: "Lettuce", icon: "TestBeaker" }
];
```

### Appendix

---

1. `NavigationView`中的`setting`项由于不包含在`options`中, 故无法在`options`中找到`setting`项. 但是当选中`setting`项时, `value`值会改变为`{ name: ">setting", type: "setting" }`, 你也可以通过在外部赋值的方式将当前选项更改为`setting`项.

**特别地** 0.1.54版本后支持采用函数式字段, 其中支持的字段包括`name`, `disabled`, `choosen`, `type`, `icon`, `show`