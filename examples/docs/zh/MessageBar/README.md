---
  title: MessageBar
  sidebarDepth: 2
---
  
[[toc]]

### MessageBar-DEMO
---

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
                control: x => {
                    return h('div', {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        }
                    }, [
                        h('fv-button', { 
                            on: {
                                click: () => {
                                    alert('Yes');
                                    x.cancel();
                                }
                            }
                        }, 'Yes'),
                        h('fv-button', {
                            on: {
                                click: () => {
                                    alert('No');
                                    x.cancel();
                                }
                            },
                            style: 'margin-left: 5px;' }, 'No')
                    ]);
                }
            });
        },
        showSwiftWarning () {
            this.$swiftWarning(document.getElementById('example'), {
                color: "rgba(173, 38, 45, 1)",
                replaceTitle: "You clicked Swift Warning."
            });
        }
    }
}
</script>



Default


<ClientOnly>
<fv-MessageBar>
</fv-MessageBar>
</ClientOnly>

Error


<ClientOnly>
<fv-MessageBar status="error">
</fv-MessageBar>
</ClientOnly>

Blocked


<ClientOnly>
<fv-MessageBar status="blocked">
</fv-MessageBar>
</ClientOnly>

Correct


<ClientOnly>
<fv-MessageBar status="correct">
</fv-MessageBar>
</ClientOnly>

Warning


<ClientOnly>
<fv-MessageBar status="warning">
</fv-MessageBar>
</ClientOnly>

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


<ClientOnly>
<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>
```

```javascript
this.$barWarning('This is a toast message.', {
    status: 'correct'
});
```

2. Customize Message Template


<ClientOnly>
<fv-button style="width: 200px;" @click="show2">Show MessageBar</fv-button>
</ClientOnly>

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


<ClientOnly>
<fv-button style="width: 200px;" @click="show3">Show MessageBar</fv-button>
</ClientOnly>

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
    control: x => {
        return h('div', {
            style: {
                display: "flex",
                alignItems: "center"
            }
        }, [
            h('fv-button', { 
                on: {
                    click: () => {
                        alert('Yes');
                        x.cancel();
                    }
                }
            }, 'Yes'),
            h('fv-button', {
                on: {
                    click: () => {
                        alert('No');
                        x.cancel();
                    }
                },
                style: 'margin-left: 5px;' }, 'No')
        ]);
    }
});
```

### SwiftWarning

<p id="example">Swift Warning</p>


<ClientOnly>
<fv-button style="width: 200px;" @click="showSwiftWarning">Click to Show SwiftWarning</fv-button>
</ClientOnly>

```vue
<p id="example">Swift Warning</p>

<fv-button style="width: 200px;" @click="showSwiftWarning">Click to Show SwiftWarning</fv-button>
```

```javascript
this.$swiftWarning(document.getElementById('example'), {
    color: "rgba(173, 38, 45, 1)",
    replaceTitle: "You clicked Swift Warning."
});
```



### Propoties
---
| 属性(attr)  |                    类型(type)                     | 必填(required) | 默认值(default) |                       说明(statement)                        |
|:-----------:|:-------------------------------------------------:|:--------------:|:---------------:|:------------------------------------------------------------:|
|   status    | ['default','warning','correct','blocked','error'] |       No       |     default     |                     显示状态, 一共有5种                      |
| showControl |                     Boolean                     |       No       |      false      |                       是否显示控制按钮                       |
|  showClose  |                     Boolean                     |       No       |      true       |                       是否显示关闭按钮                       |
|    mode     |               ['relative','fixed']                |       No       |    relative     |   显示模式`relative`下位相对定位, `fixed`下为悬浮固定定位    |
|  autoClose  |                     Number                      |       No       |      3000       | MessageBar自动关闭时间, 单位为`ms`, 设为`-1`时永远不自动消失 |

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

- cancel: 取消函数
- theme: 当前主题

```vue
<template v-slot:control="x">
    <fv-button @click="x.cancel()">Yes</fv-button>
</template>
```

### Toast
---

```javascript
this.$barWarning(msg, options = {
    status: 'default',
    showControl: false,
    showClose: true,
    control: null,
    mode: 'fixed',
    autoClose: 3000
});

control_panel: x => h() // 传入具名插槽属性参数的函数, 函数返回值为$createElement函数
```

```javascript
this.$swiftWarning(element, options = {
    color: "rgba(173, 38, 45, 1)",
    replaceTitle: "Swift Warning"
});
```
  
