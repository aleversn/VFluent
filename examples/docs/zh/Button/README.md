---
  title: Button Button
  sidebarDepth: 2
---
  
[[toc]]

### Button-DEMO


<ClientOnly>
<fv-button borderRadius="3"></fv-button>
</ClientOnly>

```vue
<fv-button borderRadius="3"></fv-button>
```

### Button With Icon
---
<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
```

### Button Customize
---
<ClientOnly>
<fv-button icon="CalculatorAddition" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" :isBoxShadow="true">Add</fv-button>
``` 

</ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark" background="linear-gradient(to right, #000046, #1cb5e0)" borderRadius="3" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark" background="linear-gradient(to right, #000046, #1cb5e0)" borderRadius="3" :isBoxShadow="true">Add</fv-button>
```

Customize Reveal Border
<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
```

### Button Disabled
---
<ClientOnly>
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
</ClientOnly>

```vue
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
```



### Propoties
---
|      属性(attr)       |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:---------------------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|         icon          |              String              |       No       |       N/A       | Icon with Fabric-Icon  |
|      foreground       |          [string(color)]           |       No       |       N/A       |     Button 前景色      |
|      background       |          [string(color)]           |       No       |       N/A       |     Button 背景色      |
|     borderRadius      |              Number              |       No       |        3        |    Button 圆角大小     |
|      borderColor      |          [string(color)]           |       No       |       N/A       |    Button 边框颜色     |
|       fontSize        |              Number              |       No       |       N/A       |    Button 字体大小     |
|      fontWeight       |              String              |       No       |     normal      |   Button 字体粗细度    |
|   revealBorderColor   |          [string(color)]           |       No       |      false      | Button Reveal 边框颜色 |
| revealBackgroundColor |          [string(color)]           |       No       |      false      | Button Reveal 背景颜色 |
|      isBoxShadow      |             Boolean              |       No       |      false      |    开启`Button`阴影    |
|       disabled        |             Boolean              |       No       |      false      |    Disabled button     |
|      borderWidth      |              Number              |       No       |        1        |    Button 边框大小     |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

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