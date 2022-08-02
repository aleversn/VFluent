---
  title: RevealContainer RevealContainer
  sidebarDepth: 2
---
  
[[toc]]

### RevealContainer-DEMO 


<ClientOnly>
<fv-RevealContainer>
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer>
</fv-RevealContainer>
```

Disabled 


<ClientOnly>
<fv-RevealContainer disabled>
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer disabled>
</fv-RevealContainer>
```

### RevealContainer-Customize
---

Single Color


<ClientOnly>
<fv-RevealContainer backgroundColor="rgba(0, 98, 158, 0.3)" borderColor="rgba(0, 98, 158, 0.3)">
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer backgroundColor="rgba(0, 98, 158, 0.3)" borderColor="rgba(0, 98, 158, 0.3)">
</fv-RevealContainer>
```

Gradient Color


<ClientOnly>
<fv-RevealContainer :backgroundGradientList="['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)']" :borderGradientList="['#40e0d0', '#40e0d0', '#ff8c00', '#ff8c00', '#ff0080', 'rgba(255, 255, 255, 0)']" borderGradientSize="120">
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer :backgroundGradientList="['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)']" :borderGradientList="['#40e0d0', '#40e0d0', '#ff8c00', '#ff8c00', '#ff0080', 'rgba(255, 255, 255, 0)']" borderGradientSize="120">
</fv-RevealContainer>
```

### Propoties
---
|       属性(attr)       |        类型(type)         | 必填(required) |     默认值(default)      |         说明(statement)          |
|:----------------------:|:-------------------------:|:--------------:|:------------------------:|:--------------------------------:|
|    revealContainer     |         [object]          |       No       |          false           |                                  |
|         parent         |        [function]         |       No       |           null           |                                  |
|      borderWidth       |         [number]          |       No       |            1             |                                  |
|      borderRadius      |         [number]          |       No       |            6             |                                  |
|    backgroundColor     |      [string(color)]      |       No       | rgba(121, 119, 117, 0.6) |                                  |
| backgroundGradientList |          [array]          |       No       |            []            |                                  |
| backgroundGradientSize |         [number]          |       No       |           120            |                                  |
|      borderColor       |      [string(color)]      |       No       | rgba(121, 119, 117, 0.6) |                                  |
|   borderGradientList   |          [array]          |       No       |            []            |                                  |
|   borderGradientSize   |         [number]          |       No       |            60            |                                  |
|    debounceDistance    |         [number]          |       No       |           300            | 节流, 超过此距离时, 不去计算渲染 |
|        disabled        |         [boolean]         |       No       |          false           |                                  |
|         theme          | ['system','light','dark'] |       No       |          system          |                                  |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    click     |     event      |   Click Event   |
  

### Data

1. revealContainer

若要将Reveal事件监听器绑定在某个元素上以节省性能, 请使用此属性并且需要指定三个属性`init`, `el`和`revealHandlerList`.
默认值为false时, 将会在window上监听, 并在全局状态管理下的`revealHandlerList`下维护所有的RevealContainer组件.

```javascript
{
    init: false,    // 默认值为false, 定义了一个包含RevealContainer的组件后, init会自行修改, 不需要手动修改其值.
    el: () => HTMLElement, // 此为要绑定的对象, 必须采用函数式声明.
    revealHandlerList: []   // 所有被侦听的RevealContainer对象.
}
```

2. parent

当RevealContainer被定义在父元素的底层时, 无法触发到click事件, 因此可以利用parent来显式定义被监听的click对象. 需要说明的是, parent必须用函数式定义.

```javascript
parent: () => HTMLElement
```