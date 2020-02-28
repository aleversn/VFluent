---
  title: WebWindow WebWindow
  sidebarDepth: 2
---
  
[[toc]]

### WebWindow-DEMO

<script>
export default {
    data () {
        return {
            theme: false
        }
    }
}
</script>

<ClientOnly>
<fv-WebWindow :theme="theme ? 'dark' : 'light'">
<div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
    <fv-toggle-switch v-model="theme" on="Dark" off="Light"></fv-toggle-switch>
</div>
</fv-WebWindow>

```vue
<fv-WebWindow :theme="theme ? 'dark' : 'light'">
    <div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
        <fv-toggle-switch v-model="theme" on="Dark" off="Light"></fv-toggle-switch>
    </div>
</fv-WebWindow>
```
</ClientOnly>

### Propoties
---
|  属性(attr)   |             类型(type)             | 必填(required) | 默认值(default) |   说明(statement)   |
|:-------------:|:----------------------------------:|:--------------:|:---------------:|:-------------------:|
| value/v-model |             [boolean]              |       No       |      true       | 开启或关闭WebWindow |
|     title     |              [string]              |       No       |       N/A       |    WebWindow标题    |
|     theme     | ['light','dark','custom','system'] |       No       |     system      |                     |

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
  
