---
  title: ToggleSwitch ToggleSwitch
  sidebarDepth: 2
---
  
[[toc]]

### ToggleSwitch-DEMO 


<ClientOnly>
<fv-ToggleSwitch>
</fv-ToggleSwitch>
</ClientOnly>

```vue
<fv-ToggleSwitch>
</fv-ToggleSwitch>
```

### ToggleSwitch Disabled
---

<ClientOnly>
<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>
</ClientOnly>

```vue
<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>
```

### ToggleSwitch Dark Theme
---
<div style="background: black;">

<ClientOnly>
<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>
</ClientOnly>
</div>

```vue
<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Content
---

<ClientOnly>
<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>
</ClientOnly>

```vue
<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Style
---

<ClientOnly>
<fv-ToggleSwitch borderColor="rgba(0,204,153,1)" ringBackground="rgba(0,204,153,1)" onForeground="rgba(0,204,153,1)" offForeground="rgba(0,204,153,1)" switchOnBackground="rgba(0,204,153,1)">
</fv-ToggleSwitch>
</ClientOnly>

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