---
  title: ToggleSwitch ToggleSwitch
  sidebarDepth: 2
---
  
[[toc]]

### ToggleSwitch-DEMO 

<fv-ToggleSwitch>
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch>
</fv-ToggleSwitch>
```

### ToggleSwitch Disabled
---
<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>
```

### ToggleSwitch Dark Theme
---
<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Content
---
<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Style
---
<fv-ToggleSwitch borderColor="rgba(0,204,153,1)" ringBackground="rgba(0,204,153,1)" onForeground="rgba(0,204,153,1)" offForeground="rgba(0,204,153,1)" switchOnBackground="rgba(0,204,153,1)">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch borderColor="rgba(0,204,153,1)" ringBackground="rgba(0,204,153,1)" onForeground="rgba(0,204,153,1)" offForeground="rgba(0,204,153,1)" switchOnBackground="rgba(0,204,153,1)">
</fv-ToggleSwitch>
```

### Propoties
---
|     属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) |                   说明(statement)                   |
|:------------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------------------------------------:|
|       value        |              [number]              |       No       |      false      |                 Toggleswitch value                  |
|         on         |              [string]              |       No       |       On        |       Toggleswitch content when value is true       |
|        off         |              [string]              |       No       |       Off       |      Toggleswitch content when value is false       |
|    onForeground    |          [string(color)]           |       No       |       N/A       | Toggleswitch content foreground when value is true  |
|   offForeground    |          [string(color)]           |       No       |       N/A       | Toggleswitch content foreground when value is false |
|    borderColor     |          [string(color)]           |       No       |       N/A       |                                                     |
|   ringBackground   |          [string(color)]           |       No       |       N/A       |                                                     |
| switchOnBackground |          [string(color)]           |       No       |       N/A       |                                                     |
|      disabled      |             [boolean]              |       No       |       N/A       |                                                     |
|       theme        | ['light','dark','custom','system'] |       No       |     system      |                                                     |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    toggle    |     value      |                 |