---
  title: ListView ListView
  sidebarDepth: 2
---
  
[[toc]]

### ListView-DEMO

<script>
export default {
    data () {
        return {
            items: [
                { key: "fruitsHeader", name: "Fruits", type: "header" },
                { key: "apple", name: "Apple" },
                { key: "banana", name: "Banana" },
                { key: "orange", name: "Orange", disabled: true },
                { key: "grape", name: "Grape" },
                { key: "divider_1", name: "", type: "divider" },
                { key: "vegetablesHeader", name: "Vegetables", type: "header" },
                { key: "broccoli", name: "Broccoli" },
                { key: "carrot", name: "Carrot" },
                { key: "lettuce", name: "Lettuce" }
            ]
        }
    }
}
</script>

<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items">
    </fv-ListView>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items">
    </fv-ListView>
</div>
```

### ListView-Multiple
---
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items" :multiple="true">
    </fv-ListView>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items" :multiple="true">
    </fv-ListView>
</div>
```

### ListView-Dark Theme
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark">
    </fv-ListView>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark">
    </fv-ListView>
</div>
```

### ListView-Custom Choosen Background
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark" choosenBackground="rgba(0, 204, 153, 0.6)">
    </fv-ListView>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark" choosenBackground="rgba(0, 204, 153, 0.6)">
    </fv-ListView>
</div>
```

### Propoties
---
|    属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) | 说明(statement)  |
|:-----------------:|:----------------------------------:|:--------------:|:---------------:|:----------------:|
|       value       |              [array]               |      Yes       |       N/A       | ListView数据绑定 |
|     multiple      |             [boolean]              |       No       |      false      |   是否开启多选   |
|     rowHeight     |              [number]              |       No       |       N/A       |    每一项高度    |
| headerForeground  |          [string(color)]           |       No       |       N/A       |    标题前景色    |
| choosenBackground |          [string(color)]           |       No       |       N/A       |   选中项背景色   |
|       theme       | ['light','dark','custom','system'] |       No       |     system      |                  |

### Events
---
| 事件名(Name)  | 参数类型(args) |       说明(statement)        |
|:-------------:|:--------------:|:----------------------------:|
|  chooseItem   |     object     |     选中项点击后返回选项     |
| choosen-items |     array      | 选中项点击后返回所有被选中项 |

### Slot
---
1. ListItem

默认以value中每一项的属性name作为默认显示, 包含以下可选属性
- item: 当前项
- index: 当前项索引

```vue
<template v-slot:listItem="x">
    <p></p>
</template>
```

### Data
---
1. items

其中`key`字段建议开发者在有重复名称和类型字段时声明用来区别项目

```javascript
items = [{key: '', name: '', type: '', disabled: ''}]

//e.g.//

items: [
    { key: "fruitsHeader", name: "Fruits", type: "header" },
    { key: "apple", name: "Apple" },
    { key: "banana", name: "Banana" },
    { key: "orange", name: "Orange", disabled: true },
    { key: "grape", name: "Grape" },
    { key: "divider_1", name: "", type: "divider" },
    { key: "vegetablesHeader", name: "Vegetables", type: "header" },
    { key: "broccoli", name: "Broccoli" },
    { key: "carrot", name: "Carrot" },
    { key: "lettuce", name: "Lettuce" }
]
```

### Appendix

---

1. 获取`ListView`中第`index`项`item`的`dom`方法(其中`<index>`代表`items`索引):

```vue
<fv-ListView v-model="items" ref="list"></fv-ListView>
let item = this.$refs.list.$refs['list_item_<index>]'];
```