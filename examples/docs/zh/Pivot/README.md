---
  title: Pivot Pivot
  sidebarDepth: 2
---
  
[[toc]]

### Pivot-DEMO

<script>
export default {
    data () {
        return {
            items: [
                { name: "All"},
                { name: "Unread", width: 80},
                { name: "Flagged", width: 80},
                { name: "Urgent", width: 80}
            ]
        }
    }
}
</script>

<fv-Pivot :items="items"></fv-Pivot>

### Pivot-Tab Style
---
<fv-Pivot :items="items" :tab="true"></fv-Pivot>

### Pivot-Dark Theme
---
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark"></fv-Pivot>
</div>

### Pivot-Custom Style
---
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark" foreground="rgba(0, 204, 153, 1)" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
</div>

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) |        默认值(default)         | 说明(statement) |
|:----------------:|:----------------------------------:|:--------------:|:------------------------------:|:---------------:|
|      value       |              [object]              |       No       |              N/A               |  当前选中项值   |
|      items       |              [array]               |       No       | [{ name: "Pivot", width: 80 }] |   选项卡数据    |
|       tab        |             [boolean]              |       No       |             false              | 是否开启tab样式 |
|    foreground    |          [string(color)]           |       No       |              N/A               |     前景色      |
| sliderBackground |          [string(color)]           |       No       |              N/A               |   滑块背景色    |
|      theme       | ['light','dark','custom','system'] |       No       |             system             |      主题       |

### Events
---
| 事件名(Name) | 参数类型(args) |        说明(statement)        |
|:------------:|:--------------:|:-----------------------------:|
|    input     |     value      | 当选中项发生改变时, 返回value |

### Data
---
1. items

```javascript
items = [{ name: "Pivot", width: 80 }]

//e.g.//

items: [{ name: "Pivot", width: 80 }]
```
