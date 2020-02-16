---
  title: NavigationView NavigationView
  sidebarDepth: 2
---
  
[[toc]]

### NavigationView-DEMO

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

<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### NavigationView-Flyout
---
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### NavigationView-Mobile Display
---
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### NavigationView-Flyout
---

1. Standard

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

2. Flyout

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

3. Mobile

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" theme="dark"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### Propoties
---
|   属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |                                说明(statement)                                 |
|:---------------:|:----------------------------------:|:--------------:|:---------------:|:------------------------------------------------------------------------------:|
|      value      |              [array]               |       No       |       N/A       |                          当前选中项, 用`v-model`绑定                           |
|     options     |              [array]               |      Yes       |       N/A       |                  选项数据, 参照`ListView`中的`items`数据格式                   |
|      title      |              [string]              |       No       | NavigationView  |                               NavigationView标题                               |
|     expand      |             [boolean]              |       No       |      true       |                     初始是否展开, 可通过sync方法来同步状态                     |
|   expandMode    |       ['relative','flyout']        |       No       |    relative     |                           展开模式, 有占位和浮动两种                           |
|   expandWidth   |              [number]              |       No       |       350       |                             展开宽度, 以`px`为单位                             |
|  expandDisplay  |              [number]              |       No       |      1024       |                            浏览器宽度大于多少时展开                            |
|  flyoutDisplay  |              [number]              |       No       |        0        | 浏览器宽度小于多少时开启浮动模式, 若`expandMode`设为`flyout`, 则始终为浮动模式 |
| fullsizeDisplay |              [number]              |       No       |       800       |                          浏览器宽度小于多少时全屏显示                          |
|  mobileDisplay  |              [number]              |       No       |        0        |                       浏览器宽度小于多少时开启移动端模式                       |
|    showBack     |             [boolean]              |       No       |      true       |                                是否显示后退按钮                                |
|   showSearch    |             [boolean]              |       No       |      true       |                                 是否显示搜索框                                 |
|  settingTitle   |              [string]              |       No       |    Settings     |                                 设置选项的标题                                 |
|   showSetting   |             [boolean]              |       No       |      true       |                                是否显示设置选项                                |
|   background    |          [string(color)]           |       No       |       N/A       |                              NavigationView背景色                              |
|      theme      | ['light','dark','custom','system'] |       No       |     system      |                                                                                |

### Events
---
| 事件名(Name)  | 参数类型(args) |           说明(statement)            |
|:-------------:|:--------------:|:------------------------------------:|
| setting-click |   MouseEvent   |       设置选项被点击后触发事件       |
| update:expand |    boolean     | 当折叠或展开时同步外界传入的`expand` |
| expand-change |    boolean     | 当折叠或展开时触发事件并提供当前状态 |
|     back      |   MouseEvent   |       返回选项被点击后触发事件       |

### Data
---

1. options

- 数据格式参考`ListView`中`items`的形式, 其中`key`字段建议开发者在有重复名称和类型字段时声明用来区别项目
- 开发者可利用`icon`字段来应用`Fabric Icon`

```javascript
options = [{key: '', name: '', type: '', icon: '', disabled: ''}]

//e.g.//

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
```