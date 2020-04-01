---
  title: MessageBar MessageBar
  sidebarDepth: 2
---
  
[[toc]]

### MessageBar-DEMO

<script>
export default {
    data () {
        return {}
    },
    methods: {
        show1 () {
            this.$barWarning('This is a toast message.', {
                status: 'correct'
            });
        },
        show2 () {
            const h = this.$createElement;
            this.$barWarning(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast message.',
                h('a', 'Visit our website.')
            ]), {
                status: 'correct'
            });
        },
        show3 () {
            const h = this.$createElement;
            this.$barWarning(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast message.',
                h('a', 'Visit our website.')
            ]), {
                status: 'correct',
                showControl: true,
                autoClose: -1,
                control: [
                    h('fv-button', { 
                        on: {
                            click: () => {
                                alert('Yes');
                            }
                        }
                    }, 'Yes'),
                    h('fv-button', {
                        on: {
                            click: () => {
                                alert('No');
                            }
                        },
                        style: 'margin-left: 5px;' }, 'No')
                ]
            });
        }
    }
}
</script>

Default

<fv-MessageBar>
</fv-MessageBar>

Error

<fv-MessageBar status="error">
</fv-MessageBar>

Blocked

<fv-MessageBar status="blocked">
</fv-MessageBar>

Correct

<fv-MessageBar status="correct">
</fv-MessageBar>

Warning

<fv-MessageBar status="warning">
</fv-MessageBar>

```vue
Default

<fv-MessageBar>
</fv-MessageBar>

Error

<fv-MessageBar status="error">
</fv-MessageBar>

Blocked

<fv-MessageBar status="blocked">
</fv-MessageBar>

Correct

<fv-MessageBar status="correct">
</fv-MessageBar>

Warning

<fv-MessageBar status="warning">
</fv-MessageBar>
```

### MessageBar-Toast
---
1. Standard

<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>

```vue
<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>
```

```javascript
this.$barWarning('This is a toast message.', {
    status: 'correct'
});
```

2. Customize Message Template

<fv-button style="width: 200px;" @click="show2">Show MessageBar</fv-button>

```vue
<fv-button style="width: 200px;" @click="show2">Show MessageBar</fv-button>
```

```javascript
const h = this.$createElement;
this.$barWarning(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast message.',
    h('a', 'Visit our website.')
]), {
    status: 'correct'
});
```

3. Customize Control Template

<fv-button style="width: 200px;" @click="show3">Show MessageBar</fv-button>

```vue
<fv-button style="width: 200px;" @click="show3">Show MessageBar</fv-button>
```

```javascript
const h = this.$createElement;
this.$barWarning(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast message.',
    h('a', 'Visit our website.')
]), {
    status: 'correct',
    showControl: true,
    autoClose: -1,
    control: [
        h('fv-button', { 
            on: {
                click: () => {
                    alert('Yes');
                }
            }
        }, 'Yes'),
        h('fv-button', {
            on: {
                click: () => {
                    alert('No');
                }
            },
            style: 'margin-left: 5px;' }, 'No')
    ]
});
```

### Propoties
---
| 属性(attr)  |                    类型(type)                     | 必填(required) | 默认值(default) |                       说明(statement)                        |
|:-----------:|:-------------------------------------------------:|:--------------:|:---------------:|:------------------------------------------------------------:|
|   status    | ['default','warning','correct','blocked','error'] |       No       |     default     |                     显示状态, 一共有5种                      |
| showControl |                     [boolean]                     |       No       |      false      |                       是否显示控制按钮                       |
|  showClose  |                     [boolean]                     |       No       |      true       |                       是否显示关闭按钮                       |
|    mode     |               ['relative','fixed']                |       No       |    relative     |   显示模式`relative`下位相对定位, `fixed`下为悬浮固定定位    |
|  autoClose  |                     [number]                      |       No       |      3000       | MessageBar自动关闭时间, 单位为`ms`, 设为`-1`时永远不自动消失 |

### Events
---
| 事件名(Name) | 参数类型(args) |      说明(statement)       |
|:------------:|:--------------:|:--------------------------:|
|    close     |                | 关闭`MessageBar`时触发事件 |

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

2. Control

```vue
<template v-slot:control>
    <fv-button>Yes</fv-button>
</template>
```

### Toast
---

```javascript
this.$barWarning(msg, options = {
    status: 'default',
    showControl: false,
    showClose: true,
    control: '',
    mode: 'fixed',
    autoClose: 3000
});
```

```javascript
this.$swiftWarning(element, options = {
    color: "rgba(173, 38, 45, 1)",
    replaceTitle: "Swift Warning"
});
```
  
