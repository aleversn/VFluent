---
  title: CheckBox CheckBox
  sidebarDepth: 2
---
  
[[toc]]

### CheckBox-DEMO 


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
|    value    |             [boolean]              |       No       |     [empty]     |     Checkbox value      |
| foreground  |              [string]              |       No       |       N/A       |   Checkbox foreground   |
| borderColor |              [string]              |       No       |       N/A       |  Checkbox borderColor   |
| background  |              [string]              |       No       |       N/A       |    Checkbox background    |
|   boxSide   |          ['start', 'end']           |       No       |      start      | CheckBox text font weight |
|  disabled   |             [boolean]              |       No       |      false      |     Disabled checkbox     |
| borderWidth |              [number]              |       No       |        1        |   Checkbox border width   |
|    theme    | ['light', 'dark', 'custom', 'system'] |       No       |     system      |      Custom theme       |

### Events

---
| 事件名(Name) | 参数类型(args) | 说明(statement)  |
|:------------:|:--------------:|:----------------:|
|    click     |     value      | Checkbox onclick |
