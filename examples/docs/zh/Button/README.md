---
  title: Button Button
  sidebarDepth: 2
---
  
[[toc]]

### Button-DEMO

<fv-button borderRadius="3"></fv-button>

```vue
<fv-button borderRadius="3"></fv-button>
```


### Button With Icon
---
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>

```vue
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
```

### Button Disabled
---
<fv-button disabled icon="CalculatorAddition">Add</fv-button>

```vue
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
```

### Propoties
---
|  属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)    |
|:------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|     icon     |              [string]              |       No       |       N/A       | Icon with Fabric-Icon |
|  foreground  |          [string(color)]           |       No       |       N/A       |     Button 前景色     |
|  background  |          [string(color)]           |       No       |       N/A       |     Button 背景色     |
| borderRadius |              [number]              |       No       |       N/A       |    Button 圆角大小    |
|   fontSize   |              [number]              |       No       |       N/A       |    Button 字体大小    |
|  fontWeight  |              [string]              |       No       |     normal      |   Button 字体粗细度   |
| isBoxShadow  |             [boolean]              |       No       |      false      |   开启`Button`阴影    |
|   disabled   |             [boolean]              |       No       |      false      |    Disabled button    |
| borderWidth  |              [number]              |       No       |        2        |    Button 边框大小    |
|    theme     | ['light','dark','custom','system'] |       No       |     system      |     Custom theme      |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    click     |     event      | Button onclick  |

### Slot
---
1. Default

```javascript
<fv-button>
    <div></div>
</fv-button>
```