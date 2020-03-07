---
  title: CheckBox CheckBox
  sidebarDepth: 2
---
  
[[toc]]

### CheckBox-DEMO 

<fv-checkBox>Indeterminate checkbox</fv-checkBox>

```vue
<fv-checkBox>Indeterminate checkbox</fv-checkBox>
```

### CheckBox-Disabled
---
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>

```vue
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>
```

### CheckBox-Disabled
---
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>

```vue
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>
```

### CheckBox-Custom
---
1. Set border width.
<fv-checkBox borderWidth="1">Checkbox rendered with borderWidth "1"</fv-checkBox>

```vue
<fv-checkBox borderWidth="1">Checkbox rendered with borderWidth "1"</fv-checkBox>
```
2. Set background and border color.
<fv-checkBox borderColor="rgba(0,204,153,1)" foreground="rgba(0,204,153,1)" background="rgba(0,204,153,1)">Checkbox</fv-checkBox>

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
| background  |              [string]              |       No       |       N/A       |    Button background    |
|   boxSide   |          ['start','end']           |       No       |      start      | Button text font weight |
|  disabled   |             [boolean]              |       No       |      false      |     Disabled button     |
| borderWidth |              [number]              |       No       |        2        |   Button border width   |
|    theme    | ['light','dark','custom','system'] |       No       |     system      |      Custom theme       |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement)  |
|:------------:|:--------------:|:----------------:|
|    click     |     value      | Checkbox onclick |