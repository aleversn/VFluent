---
  title: ResizeWatcher
  sidebarDepth: 2
---
  
[[toc]]

### ResizeWatcher-DEMO
---

<script>
export default {

    data () {
        return {
            isPos: false,
            isMove: false,
            pos: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }
    },
    methods: {
        setPos (event) {
            const {left, top, right, bottom} = event;
            this.pos = {left, top, right, bottom};
        },
        setSize (event) {
            const {width, height} = event;
            this.size = {width, height};
        }
    }
}
</script>

<ClientOnly>

<fv-button ref="a" :style="{width: isPos ? '200px' : '120px'}" style="transition: all 0.3s;" @click="isPos ^= true">Resize Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.a ? $refs.a.$el : null" @watch="setSize">
</fv-ResizeWatcher>

<p>width: {{size.width}} height: {{size.height}}</p>

```vue
<fv-button ref="a" :style="{width: isPos ? '200px' : '120px'}" style="transition: all 0.3s;" @click="isPos ^= true">Resize Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.a ? $refs.a.$el : null" @watch="setSize">
</fv-ResizeWatcher>
```

<fv-button ref="b" :style="{left: isMove ? '50px' : ''}" style="transition: all 0.3s;" @click="isMove ^= true">Move Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.b ? $refs.b.$el : null" @watch="setPos">
</fv-ResizeWatcher>

<p>left: {{pos.left}} top: {{pos.top}} right: {{pos.right}} bottom: {{pos.bottom}}</p>

```vue
<fv-button ref="b" :style="{left: isMove ? '50px' : ''}" style="transition: all 0.3s;" @click="isMove ^= true">Move Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.b ? $refs.b.$el : null" @watch="setPos">
</fv-ResizeWatcher>
```

</ClientOnly>

### Propoties
---
| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:----------:|:----------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|   target   |  Function  |       No       |      null       |               定义一个函数返回要监听的元素                |
|   theme    |   String   |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement)  |
|:------------:|:--------------:|:----------------:|
|    watch     |     object     | 监听元素状态变化 |
| watch-resize |     object     | 监听元素大小变化 |
|  watch-pos   |     object     | 监听元素位置变化 |
  
