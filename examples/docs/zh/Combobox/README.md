---
  title: Combobox
  sidebarDepth: 2
---
  
[[toc]]

### Combobox-DEMO
---

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple" },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape" },
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


<ClientOnly>
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
</fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
</fv-Combobox>
```

### Combobox-Disabled
---

<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-Combobox>
```

### Combobox-Dark Theme
---
<div style="width: 100%; background: black;">
    
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-Combobox>
</div>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-Combobox>
```

### Combobox Customize
---

<fv-Combobox v-model="value" :options="options" placeholder="Pick a option"><template v-slot:default="x"><i>{{x.item.text}}</i></template></fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
    <template v-slot:default="x">
        <i>{{x.item.text}}</i>
    </template>
</fv-Combobox>
```

Default Styles

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
    <template v-slot:default="x">
        <i class="before-choosen" :style="{background: choosenSliderBackground}"></i>
        {{valueTrigger(x.item.type) !== 'divider' ? valueTrigger(x.item.text) : ''}}
    </template>
</fv-Combobox>
```

</ClientOnly>

### Propoties
---
|       属性(attr)        |   类型(type)    | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:-----------------------:|:---------------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|      value/v-model      |     Object      |       No       |       N/A       |                    Combobox当前项绑定                     |
|         options         |      Array      |      Yes       |       N/A       |                       Combobox数据                        |
|       borderWidth       |     Number      |       No       |        1        |                                                           |
|       placeholder       |     String      |       No       |    Combobox     |                                                           |
|      borderRadius       |     Number      |       No       |        3        |                                                           |
|       background        | [string(color)] |       No       |       N/A       |                                                           |
|    choosenBackground    | [string(color)] |       No       |       N/A       |                                                           |
| choosenSliderBackground | [string(color)] |       No       |       N/A       |                                                           |
|     inputForeground     | [string(color)] |       No       |       N/A       |                                                           |
|     inputBackground     | [string(color)] |       No       |       N/A       |                                                           |
|     titleForeground     | [string(color)] |       No       |   ChevronDown   |                                                           |
|       itemHeight        |     Number      |       No       |       40        |                    Combobox Item 高度                     |
|      dropDownIcon       |     String      |       No       |       N/A       |                                                           |
| dropDownIconForeground  | [string(color)] |       No       |       N/A       |                                                           |
|    revealBorderColor    | [string(color)] |       No       |       N/A       |                                                           |
|  revealBackgroundColor  | [string(color)] |       No       |       N/A       |                                                           |
|        disabled         |     Boolean     |       No       |       N/A       |                                                           |
|          theme          |     String      |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name) | 参数类型(args) |   说明(statement)    |
|:------------:|:--------------:|:--------------------:|
| choose-item  |  value/object  | Combobox choose item |

### Slot

---

1. Default

用户可自定义 Combobx Item 内容

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
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "orange", text: "Orange", disabled: true },
    { key: "grape", text: "Grape" },
    { key: "divider_1", text: "-", type: "divider" },
    { key: "vegetablesHeader", text: "Vegetables", type: "header" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
]
```
  
**特别地** 0.1.62版本后支持采用函数式字段, 其中支持的字段包括`text`, `disabled`, `type`