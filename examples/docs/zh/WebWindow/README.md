---
  title: WebWindow
  sidebarDepth: 2
---
  
[[toc]]

### WebWindow-DEMO
---

<script>
export default {
    data () {
        return {
            theme: false,
            show: true
        }
    }
}
</script>

<ClientOnly>
<fv-toggle-switch v-model="show" on="Show" off="Hide"></fv-toggle-switch>
<fv-WebWindow v-model="show">
<div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
</div>
</fv-WebWindow>
</ClientOnly>

```vue
<fv-WebWindow>
    <div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
    </div>
</fv-WebWindow>
```

### Propoties
---
|   属性(attr)    | 类型(type) | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:---------------:|:----------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|  value/v-model  |  Boolean   |       No       |      true       |                    开启或关闭WebWindow                    |
|      title      |   String   |       No       |       N/A       |                       WebWindow标题                       |
|      left       |   Number   |       No       |        0        |                WebWindow默认距离左边的距离                |
|       top       |   Number   |       No       |        0        |                WebWindow默认距离顶部的距离                |
| refreshPosition |  Boolean   |       No       |      false      |               是否在WebWindow打开时刷新位置               |
|      theme      |   String   |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name) | 参数类型(args) |     说明(statement)     |
|:------------:|:--------------:|:-----------------------:|
|    close     |                | WebWindow关闭时触发事件 |

### Slot
---

1. Default

```vue
<fv-web-window>
    <div></div>
</fv-web-window>
```
  
