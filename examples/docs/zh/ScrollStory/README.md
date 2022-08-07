---
  title: ScrollStory ScrollStory
  sidebarDepth: 2
---
  
[[toc]]

### ScrollStory-DEMO
---

<div style="height: 500px; "></div>

<ClientOnly>
<fv-ScrollStory name="scale-up-to-up"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>

```vue
<fv-ScrollStory name="scale-up-to-up">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Infinite Show

---

<ClientOnly>
<fv-ScrollStory name="scale-down-to-down" :infinite="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>

```vue
<fv-ScrollStory name="scale-down-to-down" :infinite="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Over Collapse

---

<ClientOnly>
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>
<div style="height: 500px; "></div>

```vue
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### Propoties

---
|  属性(attr)  | 类型(type) | 必填(required) | 默认值(default) |     说明(statement)     |
|:------------:|:----------:|:--------------:|:---------------:|:-----------------------:|
|     name     | Boolean  |       No       |       N/A       | Vue transition css name |
|   infinite   | Boolean  |       No       |      false      |      Infinite show      |
| overCollapse | Boolean  |       No       |      false      |  Scroll over collapse   |

### Events

---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
| show-changed |      show      |                 |
