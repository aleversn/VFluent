---
  title: DropDown DropDown
  sidebarDepth: 2
---
  
[[toc]]

### DropDown-DEMO

<script>
export default {
    data () {
        return {
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

<fv-DropDown :options="options" placeholder="Select an option"></fv-DropDown>

### DropDown-Disabled
---
1. Set Disabled
<fv-DropDown :options="options" placeholder="Select an option" disabled></fv-DropDown>

2. DropDown without options
<fv-DropDown placeholder="Select an option"></fv-DropDown>

### DropDown-Multiple Select
---
<fv-DropDown :options="options" placeholder="Select options" :multiple="true"></fv-DropDown>

### DropDown-Customize
---
1. Custom List Item
<fv-DropDown :options="options" placeholder="Select an option"><template v-slot:options="item"><p>{{item.index}}</p></template></fv-DropDown>

2. Custom Style
<fv-DropDown :options="options" placeholder="Select options" :multiple="true" borderWidth="1" borderRadius="5" inputBackground="rgba(0,204,153,0.9)" inputForeground="whitesmoke" dropDownIcon="AddTo" dropDownIconForeground="whitesmoke" dropDownListForeground="rgba(0,204,153,1)" dropDownListBackground="rgba(239,239,239,0.6)"></fv-DropDown>

3. Custom Drop Down Input
<fv-DropDown :options="options" placeholder="Select options" :multiple="true"><template v-slot:input="x"><i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i><input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px;"/><i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i></template></fv-DropDown>

### DropDown-Show Error
---
<fv-DropDown :options="options" placeholder="Select an option" :showError="true"></fv-DropDown>

### DropDown-Dark Theme
---
1. Single Selection
<fv-DropDown :options="options" placeholder="Select an option" theme="dark"></fv-DropDown>

2. Multiple Selections
<fv-DropDown :options="options" placeholder="Select an option" theme="dark" :multiple="true"></fv-DropDown>

### Propoties
---
|       属性(attr)       |             类型(type)             | 必填(required) |      默认值(default)       |      说明(statement)       |
|:----------------------:|:----------------------------------:|:--------------:|:--------------------------:|:--------------------------:|
|         value          |              [array]               |       No       |            N/A             |       Choosed Value        |
|        options         |              [array]               |       No       |            N/A             |   Dropdown options array   |
|        multiple        |             [boolean]              |       No       |            N/A             | Is enable multiple select  |
|      borderWidth       |              [number]              |       No       |             2              |   Dropdown border width    |
|      borderRadius      |              [number]              |       No       |             3              |   Dropdown border radius   |
|      placeholder       |              [string]              |       No       |          Dropdown          |    Dropdown placeholder    |
|       maxHeight        |              [number]              |       No       |            N/A             |  Dropdown list max height  |
|    inputForeground     |          [string(color)]           |       No       |            N/A             |                            |
| dropDownListForeground |          [string(color)]           |       No       |    rgba(0,120,215,0.9)     |                            |
|    inputBackground     |          [string(color)]           |       No       |            N/A             |                            |
| dropDownListBackground |          [string(color)]           |       No       |            N/A             |                            |
|      dropDownIcon      |              [string]              |       No       |        ChevronDown         |   Icon with Fabric-Icon    |
| dropDownIconForeground |          [string(color)]           |       No       |            N/A             |                            |
|       showError        |             [boolean]              |       No       |           false            |                            |
|      errorMessage      |              [string]              |       No       | This dropdown has an error |                            |
|        disabled        |             [boolean]              |       No       |           false            |                            |
|        setFocus        |             [boolean]              |       No       |           false            | Whether Dropdown list show |
|         theme          | ['light','dark','custom','system'] |       No       |           system           |       Dropdown theme       |

### Events
---
|  事件名(Name)  | 参数类型(args) |       说明(statement)        |
|:--------------:|:--------------:|:----------------------------:|
|     change     |     value      |     Dropdown choose item     |
| visible-change |    visible     | Dropdown list show or hidden |

### Slot
---
1. Input

```javascript
<template v-slot:input="x">
    <i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i>
    <input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px;"/>
    <i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i>
</template>
```

2. Options

```javascript
<template v-slot:options="item">
    <p>{{item.index}}</p>
</template>
```

### Data
---
1. options

```javascript
options = [{key: '', text: '', type: '', disabled: '', choosed: ''}]

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