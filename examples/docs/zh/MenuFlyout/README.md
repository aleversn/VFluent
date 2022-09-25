---
title: MenuFlyout
sidebarDepth: 2
---

[[toc]]

<script>
export default {
    data () {
        return {
            value: [],
            options: [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple", children: [
                    { key: "A", text: "A" },
                    { key: "B", text: "B" },
                    { key: "Apple C", text: "Apple C", children: [
                        { key: "A", text: "A" },
                        { key: "B", text: "B" },
                        { key: "Apple C-C", text: "Apple C-C", children: [
                            { key: "A", text: "A" },
                            { key: "B", text: "B" },
                            { key: "Apple C-C-C", text: "Apple C-C-C" }
                        ] }
                    ] }
                ] },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape", children: [
                    { key: "A", text: "A" },
                    { key: "B", text: "B" },
                    { key: "C", text: "C" }
                ] },
                { key: "divider_1", text: "-", type: "divider" },
                { key: "vegetablesHeader", text: "Vegetables", type: "header" },
                { key: "broccoli", text: "Broccoli" },
                { key: "carrot", text: "Carrot" },
                { key: "lettuce", text: "Lettuce" }
            ]
        }
    }
}
</script>

### MenuFlyout

<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option">
</fv-menuFlyout>
</ClientOnly>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option">
</fv-menuFlyout>
```

### menuFlyout-Disabled
---

<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-menuFlyout>
</ClientOnly>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-menuFlyout>
```

### menuFlyout-Dark Theme
---
<div style="width: 100%; background: black;">
    
<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-menuFlyout>
</ClientOnly>
</div>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-menuFlyout>
```

### Propoties
---
|       属性(attr)        |             类型(type)             | 必填(required) | 默认值(default) |  说明(statement)   |
|:-----------------------:|:----------------------------------:|:--------------:|:---------------:|:------------------:|
|      value/v-model      |              Object              |       No       |       N/A       | Combobox当前项绑定 |
|         options         |              Array               |      Yes       |       N/A       |    Combobox数据    |
|       borderWidth       |              Number              |       No       |        2        |                    |
|       placeholder       |              String              |       No       |    Combobox     |                    |
|      borderRadius       |              Number              |       No       |        3        |                    |
|       background        |          [string(color)]           |       No       |       N/A       |                    |
|    choosenBackground    |          [string(color)]           |       No       |       N/A       |                    |
| choosenSliderBackground |          [string(color)]           |       No       |       N/A       |                    |
|     inputForeground     |          [string(color)]           |       No       |       N/A       |                    |
|     inputBackground     |          [string(color)]           |       No       |       N/A       |                    |
|     titleForeground     |          [string(color)]           |       No       |   ChevronDown   |                    |
|      dropDownIcon       |              String              |       No       |       N/A       |                    |
| dropDownIconForeground  |          [string(color)]           |       No       |       N/A       |                    |
|    pivotPlaceholder     |              String              |       No       |  Please Choose  |                    |
|        disabled         |             Boolean              |       No       |       N/A       |                    |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events
---
| 事件名(Name) | 参数类型(args) |   说明(statement)    |
|:------------:|:--------------:|:--------------------:|
| choose-item  |  value/object  | Combobox choose item |

### Slot

---

1. Default

用户可自定义 MenuFlyout Item 内容

```vue
<slot :item="item">
    {{valueTrigger(item.type) !== 'divider' ? valueTrigger(item.text) : ''}}
</slot>
```

用户自定义样式时, 包含以下可选属性

- item: 当前组数据

```vue
<template v-slot:default="x">
  <i>{{x.item.text}}</i>
</template>
```

### Data
---
1. options

```javascript
options = [{key: '', text: '', type: '', disabled: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", text: "Fruits", type: "header" },
    { key: "apple", text: "Apple", children: [
        { key: "A", text: "A" },
        { key: "B", text: "B" },
        { key: "Apple C", text: "Apple C", children: [
            { key: "A", text: "A" },
            { key: "B", text: "B" },
            { key: "Apple C-C", text: "Apple C-C", children: [
                { key: "A", text: "A" },
                { key: "B", text: "B" },
                { key: "Apple C-C-C", text: "Apple C-C-C" }
            ] }
        ] }
    ] },
    { key: "banana", text: "Banana" },
    { key: "orange", text: "Orange", disabled: true },
    { key: "grape", text: "Grape", children: [
        { key: "A", text: "A" },
        { key: "B", text: "B" },
        { key: "C", text: "C" }
    ] },
    { key: "divider_1", text: "-", type: "divider" },
    { key: "vegetablesHeader", text: "Vegetables", type: "header" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
]
```
  
**其中** `text`, `disabled`, `type`属性支持函数式声明.