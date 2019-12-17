---
  title: Button Button
  sidebarDepth: 2
---
  
[[toc]]

### Button-DEMO 

<fv-button></fv-button>

### Button With Icon
---
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>

### Button Disabled
---
<fv-button disabled icon="CalculatorAddition">Add</fv-button>

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
|    icon     |              [string]              |       No       |       N/A       |  Icon with Fabric-Icon  |
| foreground  |              [string]              |       No       |       N/A       |    Button foreground    |
| background  |              [string]              |       No       |       N/A       |    Button background    |
| fontWeight  |              [string]              |       No       |     normal      | Button text font weight |
|  disabled   |             [boolean]              |       No       |      false      |     Disabled button     |
| borderWidth |              [number]              |       No       |        2        |   Button border width   |
|    theme    | ['light','dark','custom','system'] |       No       |     system      |      Custom theme       |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    click     |     event      | Button onclick  |