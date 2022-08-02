---
  title: Pagination Pagination
  sidebarDepth: 2
---
  
[[toc]]

### Pagination-DEMO 




<ClientOnly>
<fv-Pagination>
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination>
</fv-Pagination>
```

### Pagination With Background
---


<ClientOnly>
<fv-Pagination background="whitesmoke">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination background="whitesmoke">
</fv-Pagination>
```

### Pagination With Boxshadow
---


<ClientOnly>
<fv-Pagination :total="100" background="whitesmoke" :shadow="true">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination :total="100" background="whitesmoke" :shadow="true">
</fv-Pagination>
```

### Pagination Small Size
---


<ClientOnly>
<fv-Pagination :small="true">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination :small="true">
</fv-Pagination>
```

### Pagination Disabled
---


<ClientOnly>
<fv-Pagination disabled>
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination disabled>
</fv-Pagination>
```

### Pagination Dark Theme
---

<div style="padding: 10px 0px; background: black;">
    
<ClientOnly>
<fv-Pagination theme="dark" background="black">
  </fv-Pagination>
</ClientOnly>
</div>

```vue
<fv-Pagination theme="dark" background="black">
</fv-Pagination>
```


### Propoties
---
| 属性(attr) |             类型(type)             | 必填(required) |   默认值(default)    | 说明(statement) |
|:----------:|:----------------------------------:|:--------------:|:--------------------:|:---------------:|
|   value    |              [number]              |       No       |          1           |   当前页码数    |
| foreground |          [string(color)]           |       No       | rgba(0, 90, 158, 1) |                 |
| background |          [string(color)]           |       No       |     transparent      |                 |
|   total    |              [number]              |       No       |          10          |    总页码数     |
| maxVisual  |              [number]              |       No       |          7           |  最大可视按钮   |
|   small    |             [boolean]              |       No       |        false         |  小型分页按钮   |
|   shadow   |             [boolean]              |       No       |        false         |                 |
|  disabled  |             [boolean]              |       No       |        false         |                 |
|   theme    | ['light','dark','custom','system'] |       No       |        system        |  Custom theme   |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|  next-click  |     number     | 下一页按钮点击  |
|  prev-click  |     number     | 上一页按钮点击  |
|  page-click  |     number     |  翻页按钮点击   |
  
