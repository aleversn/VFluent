---
  title: CheckBox
  sidebarDepth: 2
---
  
[[toc]]

### CheckBox-DEMO
--- 


<ClientOnly>
<fv-checkBox>Indeterminate checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox>Indeterminate checkbox</fv-checkBox>
```

### CheckBox-Disabled

---

<ClientOnly>
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>
```

### CheckBox-Disabled

---

<ClientOnly>
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>
```

### CheckBox-Custom

---
1. Set border width.

<ClientOnly>
<fv-checkBox borderWidth="2">Checkbox rendered with borderWidth "2"</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox borderWidth="2">Checkbox rendered with borderWidth "2"</fv-checkBox>
```

2. Set background and border color.

<ClientOnly>
<fv-checkBox borderColor="rgba(0, 204, 153, 1)" foreground="rgba(0, 204, 153, 1)" background="rgba(0, 204, 153, 1)">Checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox borderColor="rgba(0,204,153,1)" foreground="rgba(0,204,153,1)" background="rgba(0,204,153,1)">Checkbox</fv-checkBox>
```

### Propoties

---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
|    value    |             Boolean              |       No       |     [empty]     |     Checkbox value      |
| foreground  |              String              |       No       |       N/A       |   Checkbox foreground   |
| borderColor |              String              |       No       |       N/A       |  Checkbox borderColor   |
| background  |              String              |       No       |       N/A       |    Checkbox background    |
|   boxSide   |          ['start', 'end']           |       No       |      start      | CheckBox text font weight |
|  disabled   |             Boolean              |       No       |      false      |     Disabled checkbox     |
| borderWidth |              Number              |       No       |        1        |   Checkbox border width   |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---
| 事件名(Name) | 参数类型(args) | 说明(statement)  |
|:------------:|:--------------:|:----------------:|
|    click     |     value      | Checkbox onclick |
