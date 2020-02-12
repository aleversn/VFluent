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

### ListView-Multiple
---
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items" :multiple="true">
    </fv-ListView>
</div>

### ListView-Dark Theme
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark">
    </fv-ListView>
</div>

### ListView-Custom Choosen Background
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark" choosenBackground="rgba(0, 204, 153, 0.6)">
    </fv-ListView>
</div>

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
  
