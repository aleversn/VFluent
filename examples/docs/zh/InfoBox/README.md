---
  title: InfoBox InfoBox
  sidebarDepth: 2
---
  
[[toc]]

### InfoBox-DEMO

<script>
export default {
    data () {
        return {}
    },
    methods: {
        show1 () {
            this.$infoBox('This is a toast info.', {
                status: 'correct',
                title: 'Toast Info',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        },
        show2 () {
            const h = this.$createElement;
            this.$infoBox(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast info.',
                h('a', 'Visit our website.')
            ]), {
                status: 'correct',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        }
    }
}
</script>

Default

<fv-InfoBox>
</fv-InfoBox>

Error

<fv-InfoBox status="error">
</fv-InfoBox>

Blocked

<fv-InfoBox status="blocked">
</fv-InfoBox>

Correct

<fv-InfoBox status="correct">
</fv-InfoBox>

Warning

<fv-InfoBox status="warning">
</fv-InfoBox>

### InfoBox-Dark Theme
---
Default

<fv-InfoBox theme="dark">
</fv-InfoBox>

Error

<fv-InfoBox status="error" theme="dark">
</fv-InfoBox>

Blocked

<fv-InfoBox status="blocked" theme="dark">
</fv-InfoBox>

Correct

<fv-InfoBox status="correct" theme="dark">
</fv-InfoBox>

Warning

<fv-InfoBox status="warning" theme="dark">
</fv-InfoBox>

### InfoBox-Toast
---
1. Standard

<fv-button style="width: 200px;" @click="show1">Show InfoBox</fv-button>

```vue
<fv-button style="width: 200px;" @click="show1">Show InfoBox</fv-button>
```

```javascript
this.$infoBox('This is a toast info.', {
    status: 'correct',
    title: 'Toast Info',
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```

2. Customize Message Template

<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>

```vue
<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>
```

```javascript
const h = this.$createElement;
this.$infoBox(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast info.',
    h('a', 'Visit our website.')
]), {
    status: 'correct',
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```

### Propoties
---
|  属性(attr)  |                    类型(type)                     | 必填(required) | 默认值(default) |        说明(statement)        |
|:------------:|:-------------------------------------------------:|:--------------:|:---------------:|:-----------------------------:|
|    title     |                     [string]                      |       No       |       Tip       |       `InfoBox`窗口标题       |
|    status    | ['default','warning','correct','blocked','error'] |       No       |     default     |      显示状态, 一共有5种      |
|     mode     |          ['relative','absolute','fixed']          |       No       |    relative     |         显示定位模式          |
|    toast     |                     [boolean]                     |       No       |      false      | 点击按钮后是否采用`toast`模式 |
| confirmTitle |                     [string]                      |       No       |      确定       |         确定按钮标题          |
| cancelTitle  |                     [string]                      |       No       |      取消       |         取消按钮标题          |
|   acrylic    |                     [boolean]                     |       No       |      false      |      是否开启背景毛玻璃       |
|    theme     |        ['light','dark','custom','system']         |       No       |     system      |                               |

### Events
---
| 事件名(Name) | 参数类型(args) |     说明(statement)     |
|:------------:|:--------------:|:-----------------------:|
|   confirm    |                | 确认`InfoBox`时触发事件 |
|    close     |                | 取消`InfoBox`时触发事件 |

### Slot
---

1. Msg

- 默认为正常标题
- `class="header"` 加粗标题
- `<a></a>` 链接

```vue
<template v-slot:msg>
    <span>Normal content <span class="header">Header content</span><a>Link</a></span>
</template>
```

### Toast
---

```javascript
this.$infoBox(msg, options = {
    title: 'Tip',
    status: 'default',
    mode: 'fixed',
    toast: true,
    confirmTitle: '确定',
    cancelTitle: '取消',
    acrylic: false,
    confirm: async () => {},
    cancel: async () => {},
    theme: 'system'
});
```
  
