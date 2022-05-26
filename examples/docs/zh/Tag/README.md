---
  title: Tag Tag
  sidebarDepth: 2
---
  
[[toc]]

### Tag-DEMO 

<fv-Tag :value="[{text: 'default', type: 'default' }]">
</fv-Tag>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }]">
</fv-Tag>
```

### Tag Different Types
---

<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Customize Color
---

<fv-Tag :value="[{text: 'blue', type: 'default', background: 'rgba(0, 153, 204, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>

```vue
<fv-Tag :value="[{text: 'blue', type: 'default', background: 'rgba(0, 153, 204, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>
```

### Tag-Disabled 

<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Dark Theme
---

<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>
```

### Propoties
---
|    属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) |              说明(statement)              |
|:-----------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------------:|
|       value       |              [string]              |       No       |       []        |                 标签数组                  |
| newTagPlaceholder |              [string]              |       No       |     New Tag     |            NewTag Placeholder             |
|       size        |              [string]              |       No       |       N/A       | 尺寸`normal`, `medium`, `small`, `xsmall` |
| newTagBackground  |          [string(color)]           |       No       |      null       |             NewTag按钮背景色              |
|     isNewTag      |               [bool]               |       No       |      false      |              是否启用NewTag               |
|       isDel       |               [bool]               |       No       |      false      |             是否启用删除按钮              |
|       theme       | ['light','dark','custom','system'] |       No       |     system      |               Custom theme                |

### Events
---
| 事件名(Name) | 参数类型(args) |      说明(statement)       |
|:------------:|:--------------:|:--------------------------:|
|  tag-click   |     object     | 标签点击时触发并返回点击项 |
|   add-item   |     object     | 添加标签时触发并返回添加项 |
|   del-item   |     object     | 删除标签时触发并返回删除项 |

### Slot
---
1. Default

```javascript
<fv-tag>
    Content
</fv-tag>
```