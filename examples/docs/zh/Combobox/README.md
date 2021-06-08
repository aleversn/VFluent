---
  title: Combobox Combobox
  sidebarDepth: 2
---
  
[[toc]]

### Combobox-DEMO

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

</ClientOnly>

### Propoties
---
|       属性(attr)       |             类型(type)             | 必填(required) | 默认值(default) |  说明(statement)   |
|:----------------------:|:----------------------------------:|:--------------:|:---------------:|:------------------:|
|     value/v-model      |              [object]              |       No       |       N/A       | Combobox当前项绑定 |
|        options         |              [array]               |      Yes       |       N/A       |    Combobox数据    |
|      borderWidth       |              [number]              |       No       |        2        |                    |
|      placeholder       |              [string]              |       No       |    Combobox     |                    |
|      borderRadius      |              [number]              |       No       |        3        |                    |
|       background       |          [string(color)]           |       No       |       N/A       |                    |
|   choosenBackground    |          [string(color)]           |       No       |       N/A       |                    |
|    inputForeground     |          [string(color)]           |       No       |       N/A       |                    |
|    inputBackground     |          [string(color)]           |       No       |       N/A       |                    |
|    titleForeground     |          [string(color)]           |       No       |   ChevronDown   |                    |
|      dropDownIcon      |              [string]              |       No       |       N/A       |                    |
| dropDownIconForeground |          [string(color)]           |       No       |       N/A       |                    |
|        disabled        |             [boolean]              |       No       |       N/A       |                    |
|         theme          | ['light','dark','custom','system'] |       No       |     system      |   Dropdown theme   |

### Events
---
| 事件名(Name) | 参数类型(args) |   说明(statement)    |
|:------------:|:--------------:|:--------------------:|
| choose-item  |  value/object  | Combobox choose item |

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
  
