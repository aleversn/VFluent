---
  title: ScrollStory ScrollStory
  sidebarDepth: 2
---
  
[[toc]]

### ScrollStory-DEMO

<ClientOnly>


<div style="height: 500px;"></div>
<fv-ScrollStory name="scale-up-to-up"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>

```vue
<fv-ScrollStory name="scale-up-to-up">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Infinite Show
---
<fv-ScrollStory name="scale-down-to-down" :infinite="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>

```vue
<fv-ScrollStory name="scale-down-to-down" :infinite="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Over Collapse
---
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
<div style="height: 500px;"></div>

```vue
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```


</ClientOnly>


### Propoties
---
|  属性(attr)  | 类型(type) | 必填(required) | 默认值(default) |     说明(statement)     |
|:------------:|:----------:|:--------------:|:---------------:|:-----------------------:|
|     name     | [boolean]  |       No       |       N/A       | Vue transition css name |
|   infinite   | [boolean]  |       No       |      false      |      Infinite show      |
| overCollapse | [boolean]  |       No       |      false      |  Scroll over collapse   |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
| show-changed |      show      |                 |