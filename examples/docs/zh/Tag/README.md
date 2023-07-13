---
  title: Tag
  sidebarDepth: 2
---
  
[[toc]]

### Tag-DEMO
--- 



<ClientOnly>
<fv-Tag :value="[{text: 'default', type: 'default' }]">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }]">
</fv-Tag>
```

### Tag Different Types
---


<ClientOnly>
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Customize Color
---


<ClientOnly>
<fv-Tag :value="[{text: 'blue', type: 'default', background: 'rgba(0, 98, 158, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :value="[{text: 'blue', type: 'default', background: 'rgba(0, 98, 158, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>
```

### Tag-Disabled 


<ClientOnly>
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Dark Theme
---


<ClientOnly>
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :value="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>
```



### Propoties
---
|    属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) |              说明(statement)              |
|:-----------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------------:|
|       value       |              String              |       No       |       []        |                 标签数组                  |
| newTagPlaceholder |              String              |       No       |     New Tag     |            NewTag Placeholder             |
|       size        |              String              |       No       |       N/A       | 尺寸`normal`, `medium`, `small`, `xsmall` |
| newTagBackground  |          [string(color)]           |       No       |      null       |             NewTag按钮背景色              |
|     isNewTag      |               [bool]               |       No       |      false      |              是否启用NewTag               |
|       isDel       |               [bool]               |       No       |      false      |             是否启用删除按钮              |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

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