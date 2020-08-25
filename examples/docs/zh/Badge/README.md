---
  title: Badge Badge
  sidebarDepth: 2
---
  
[[toc]]

### Badge-DEMO

<fv-Badge :value="3">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge :value="3">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Different Type

Success

<fv-Badge :value="12" type="success">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge :value="12" type="success">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

Warning

<fv-Badge :value="2" type="warning">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge :value="2" type="warning">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

Primary

<fv-Badge :value="9" type="primary">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge :value="9" type="primary">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Customize Content

<fv-Badge value="You">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge value="You">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Max Value

<fv-Badge value="100" max="99">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge value="100" max="99">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Dot

<fv-Badge :isDot="true">
<fv-button>Badge</fv-button>
</fv-Badge>

```vue
<fv-Badge :isDot="true">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Propoties
---
| 属性(attr) |                   类型(type)                    | 必填(required) | 默认值(default) | 说明(statement) |
|:----------:|:-----------------------------------------------:|:--------------:|:---------------:|:---------------:|
|   value    |                 [string,number]                 |      Yes       |       N/A       |                 |
|    max     |                    [number]                     |       No       |    Infinity     |                 |
|   isDot    |                    [boolean]                    |       No       |      false      |                 |
|   hidden   |                    [boolean]                    |       No       |      false      |                 |
|    type    | ['primary','success','warning','danger','info'] |       No       |     default     |                 |

### Slot
---
1. Default

```javascript
<fv-badge>
    <div></div>
</fv-badge>
```