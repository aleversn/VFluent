---
  title: InfoBox
  sidebarDepth: 2
---
  
[[toc]]

### InfoBox-DEMO
---

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
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        },
        show2 () {
            const h = this.$createElement;
            this.$infoBox(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast info.',
                h('a', {
                    style: {
                        fontWeight: 'bold'
                    }
                }, 'Visit our website.')
            ]), {
                status: 'correct',
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        },
        show3 () {
            const h = this.$createElement;
            this.$infoBox(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast info.',
                h('a', {
                    style: {
                        fontWeight: 'bold'
                    }
                }, 'Visit our website.')
            ]), {
                status: 'correct',
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                showTitleBar: false,
                control_panel: x => {
                return h('fv-button', {
                        style: {
                            width: '200px'
                        },
                        props: {
                            background: x.iconList['correct'].backgroundColor,
                            theme: "dark"
                        },
                        on: {
                            click: () => {
                                x.confirm();
                            }
                        }
                    }, 'Custom Control Button');
                },
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        }
    }
}
</script>

Default


<ClientOnly>
<fv-InfoBox>
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox>
</fv-InfoBox>
```

Error


<ClientOnly>
<fv-InfoBox status="error">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="error">
</fv-InfoBox>
```

Blocked


<ClientOnly>
<fv-InfoBox status="blocked">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="blocked">
</fv-InfoBox>
```

Correct


<ClientOnly>
<fv-InfoBox status="correct">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="correct">
</fv-InfoBox>
```

Warning


<ClientOnly>
<fv-InfoBox status="warning">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="warning">
</fv-InfoBox>
```

Without TitleBar


<ClientOnly>
<fv-InfoBox :showTitleBar="false">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox :showTitleBar="false">
</fv-InfoBox>
```

### InfoBox-Dark Theme
---
Default


<ClientOnly>
<fv-InfoBox theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox theme="dark">
</fv-InfoBox>
```

Error


<ClientOnly>
<fv-InfoBox status="error" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="error" theme="dark">
</fv-InfoBox>
```

Blocked


<ClientOnly>
<fv-InfoBox status="blocked" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="blocked" theme="dark">
</fv-InfoBox>
```

Correct


<ClientOnly>
<fv-InfoBox status="correct" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="correct" theme="dark">
</fv-InfoBox>
```

Warning


<ClientOnly>
<fv-InfoBox status="warning" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="warning" theme="dark">
</fv-InfoBox>
```

Without TitleBar


<ClientOnly>
<fv-InfoBox theme="dark" :showTitleBar="false">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox theme="dark" :showTitleBar="false">
</fv-InfoBox>
```

### InfoBox-Toast
---
1. Standard


<ClientOnly>
<fv-button style="width: 200px;" @click="show1">Show InfoBox</fv-button>
</ClientOnly>

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


<ClientOnly>
<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>
```

```javascript
const h = this.$createElement;
this.$infoBox(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast info.',
    h('a', {
        style: {
            fontWeight: 'bold'
        }
    }, 'Visit our website.')
]), {
    status: 'correct',
    confirmTitle: 'Confirm',
    cancelTitle: 'Cancel',
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```

3. Customize Control Panel


<ClientOnly>
<fv-button style="width: 200px;" @click="show3">Show InfoBox</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show3">Show InfoBox</fv-button>
```

```javascript
const h = this.$createElement;
this.$infoBox(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast info.',
    h('a', {
        style: {
            fontWeight: 'bold'
        }
    }, 'Visit our website.')
]), {
    status: 'correct',
    showTitleBar: false,
    control_panel: x => {
    return h('fv-button', {
            style: {
                width: '200px'
            },
            props: {
                background: x.iconList['correct'].backgroundColor,
                theme: "dark"
            },
            on: {
                click: () => {
                    x.confirm();
                }
            }
        }, 'Custom Control Button');
    },
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```


### Propoties
---
|  属性(attr)  |                    类型(type)                     | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:------------:|:-------------------------------------------------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|    title     |                      String                       |       No       |       Tip       |                     `InfoBox`窗口标题                     |
|    status    | ['default','warning','correct','blocked','error'] |       No       |     default     |                    显示状态, 一共有5种                    |
|     mode     |          ['relative','absolute','fixed']          |       No       |    relative     |                       显示定位模式                        |
|    toast     |                      Boolean                      |       No       |      false      |               点击按钮后是否采用`toast`模式               |
| confirmTitle |                      String                       |       No       |      确定       |                       确定按钮标题                        |
| cancelTitle  |                      String                       |       No       |      取消       |                       取消按钮标题                        |
|   acrylic    |                      Boolean                      |       No       |      false      |                    是否开启背景毛玻璃                     |
| showTitleBar |                      Boolean                      |       No       |      true       |                      是否显示标题栏                       |
|    theme     |                      String                       |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

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

2. Control Panel

- confirm: 确认函数
- cancel: 取消函数
- theme: 当前主题
- iconList: 图标列表及颜色数组

```vue
<template v-slot:control-panel="x">
    <fv-button :theme="'dark'" :background="x.iconList[status].backgroundColor" :isBoxShadow="true" :borderRadius="6" style="width: 50%; height: 35px; margin-right: 2.5px;" @click="x.confirm">Confirm</fv-button>
    <fv-button :theme="x.theme" :isBoxShadow="true" :borderRadius="6" style="width: 50%; height: 35px; margin-left: 2.5px;" @click="x.cancel">Cancel</fv-button>
</template>

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
    control_panel: null,
    theme: 'system'
});

msg: h() // 传入$createElement函数
control_panel: x => h() // 传入具名插槽属性参数的函数, 函数返回值为$createElement函数
```
  
