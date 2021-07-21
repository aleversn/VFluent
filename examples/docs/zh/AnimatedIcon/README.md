---
  title: AnimatedIcon AnimatedIcon
  sidebarDepth: 2
---
  
[[toc]]

### AnimatedIcon-DEMO

<script>
export default {
    data () {
        return {
            animation: {
                enter: {
                    transform: 'rotate(-180deg)',
                    transition: `transform 0.1s`
                },
                leave: [
                    {
                        transform: 'rotate(365deg)',
                        transition: `transform 0.3s`
                    },
                    {
                        transform: 'rotate(360deg)',
                        transition: `transform 0.1s`
                    },
                    {
                        transform: 'rotate(0deg)'
                    }
                ]
            }
        }
    }
}
</script>

<fv-AnimatedIcon fontSize="36">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon fontSize="36">
</fv-AnimatedIcon>
```

### Present Animation
---

1. Scale Down
<fv-AnimatedIcon fontSize="20">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon fontSize="20">
</fv-AnimatedIcon>
```

2. Scale X Down
<fv-AnimatedIcon value="scaleXDown" fontSize="20" icon="GlobalNavButton">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon value="scaleXDown" fontSize="20" icon="GlobalNavButton">
</fv-AnimatedIcon>
```

3. Scale Y Down
<fv-AnimatedIcon value="scaleYDown" fontSize="20" icon="Pause">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon value="scaleYDown" fontSize="20" icon="Pause">
</fv-AnimatedIcon>
```

4. Scale Y Down
<fv-AnimatedIcon value="backScale" fontSize="20" icon="Back">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon value="backScale" fontSize="20" icon="Back">
</fv-AnimatedIcon>
```

5. Bounce Rotate
<fv-AnimatedIcon value="bounceRotate" fontSize="20" icon="Settings">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon value="bounceRotate" fontSize="20" icon="Settings">
</fv-AnimatedIcon>
```

### AnimatedIcon-With Content
---

<div>
    <fv-AnimatedIcon value="bounceRotate" fontSize="20" icon="Settings">
        <template v-slot:content>
            <div style="margin-left: 15px;">Settings</div>
        </template>
    </fv-AnimatedIcon>
</div>

```vue
<fv-AnimatedIcon value="bounceRotate" fontSize="20" icon="Settings">
    <template v-slot:content>
        <div style="margin-left: 5px;">Settings</div>
    </template>
</fv-AnimatedIcon>
```

### AnimatedIcon-Customize Animation
---

<div>
    <fv-AnimatedIcon :customizeAnimation="animation" fontSize="20" icon="Settings">
    </fv-AnimatedIcon>
</div>

```vue
<fv-AnimatedIcon :customizeAnimation="animation" fontSize="20" icon="Settings">
</fv-AnimatedIcon>

<script>
data () {
    return {
        animation: {
            enter: {
                transform: 'rotate(-180deg)',
                transition: `transform 0.1s`
            },
            leave: [
                {
                    transform: 'rotate(365deg)',
                    transition: `transform 0.3s`
                },
                {
                    transform: 'rotate(360deg)',
                    transition: `transform 0.1s`
                },
                {
                    transform: 'rotate(0deg)'
                }
            ]
        }
    }
}
</script>
```

- Event types include `enter`, `move`, `down`, `up`, `leave` and corresponding to the `MouseEvent` and `TouchEvent` automatically.

- Each event can be declared as an `object` contain styles or an `array` contain multiple styles object. The transitions of an `array` will execute in order.

### AnimatedIcon-Customize Background
---

<fv-AnimatedIcon value="scaleYDown" fontSize="20" icon="Pause" background="whitesmoke">
</fv-AnimatedIcon>

```vue
<fv-AnimatedIcon value="scaleYDown" fontSize="20" icon="Pause" background="whitesmoke">
</fv-AnimatedIcon>
```

### AnimatedIcon-Dark Theme
---

<div style="padding: 5px;background: black;">
    <fv-AnimatedIcon theme="dark" fontSize="20">
    </fv-AnimatedIcon>
</div>

```vue
<fv-AnimatedIcon theme="dark" fontSize="20">
</fv-AnimatedIcon>
```

### Propoties
---
|     属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)    |
|:------------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|       value        |              [string]              |       No       |    scaleDown    |     动画预设名称      |
|        icon        |              [string]              |       No       |       N/A       | Icon with Fabric-Icon |
| customizeAnimation |              [object]              |       No       |       N/A       |      自定义动画       |
|     background     |          [string(color)]           |       No       |       N/A       |        背景色         |
|      fontSize      |              [number]              |       No       |       16        | AnimatedIcon 字体大小 |
|    hideContent     |               [bool]               |       No       |      false      |     隐藏文本内容      |
|       theme        | ['light','dark','custom','system'] |       No       |     system      |     Custom theme      |

### Events
---
| 事件名(Name) | 参数类型(args) |   说明(statement)    |
|:------------:|:--------------:|:--------------------:|
|    click     |     event      | AnimatedIcon onclick |

### Slot
---
1. Default

默认模板是图标自定义模板

```javascript
<fv-animated-icon>
    <div></div>
</fv-animated-icon>
```

2. Content

客制化修改文字内容

```javascript
<fv-animated-icon>
    <template v-slot:content>
        <div>Content</div>
    </template>
</fv-animated-icon>
```