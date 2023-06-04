---
  title: Pivot
  sidebarDepth: 2
---
  
[[toc]]

### Pivot-DEMO
---

<script>
export default {
    data () {
        return {
            value: null,
            c: 0,
            items: [
                { name: "All", show: () => this.c % 2 === 0},
                { name: "Unread", width: 80},
                { name: "Flagged", width: 80, disabled: true },
                { name: "Urgent", width: 80}
            ]
        }
    },
    methods: {
        del () {
            this.c++;
        }
    }
}
</script>

<ClientOnly>

<fv-button @click="del">Delete</fv-button>
<fv-Pivot v-model="value" :items="items"></fv-Pivot>

```vue
<fv-Pivot :items="items"></fv-Pivot>
```

### Pivot-Tab Style
---

<fv-Pivot v-model="value" :items="items" :tab="true"></fv-Pivot>

```vue
<fv-Pivot :items="items" :tab="true"></fv-Pivot>
```

### Pivot-Tab Customize
---

<fv-Pivot v-model="value" :items="items" :tab="true" :sliderBoxshadow="true" :background="'rgba(238, 238, 239, 1)'"></fv-Pivot>

```vue
<fv-Pivot v-model="value" :items="items" :tab="true" :sliderBoxshadow="true" :background="'rgba(238, 238, 239, 1)'"></fv-Pivot>
```

### Pivot-Dark Theme
---
<div style="width: 100%; background: black;">
    
<fv-Pivot v-model="value" :items="items" theme="dark"></fv-Pivot>
<fv-Pivot v-model="value" :items="items" :tab="true" theme="dark"></fv-Pivot>
</div>

```vue
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark"></fv-Pivot>
</div>
```

### Pivot-Custom Style
---
<div style="width: 100%; background: black;">
    <fv-Pivot v-model="value" :items="items" theme="dark" foreground="rgba(0, 204, 153, 1)" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
    <fv-Pivot v-model="value" :items="items" :tab="true" theme="dark" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
</div>

```vue
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark" foreground="rgba(0, 204, 153, 1)" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
</div>
```

</ClientOnly>

### Propoties
---
|    属性(attr)    |   类型(type)    | 必填(required) |        默认值(default)         |                      说明(statement)                      |
|:----------------:|:---------------:|:--------------:|:------------------------------:|:---------------------------------------------------------:|
|      value       |     Object      |       No       |              N/A               |                       当前选中项值                        |
|      items       |      Array      |       No       | [{ name: "Pivot", width: 80 }] |                        选项卡数据                         |
|       tab        |     Boolean     |       No       |             false              |                      是否开启tab样式                      |
|     fontSize     |     Number      |       No       |              N/A               |                       默认字体大小                        |
|    foreground    | [string(color)] |       No       |              N/A               |                          前景色                           |
| sliderBackground | [string(color)] |       No       |              N/A               |                        滑块背景色                         |
| sliderBoxshadow  |     Boolean     |       No       |             false              |                     是否开启滑块阴影                      |
|    background    | [string(color)] |       No       |              N/A               |                          背景色                           |
|      theme       |     String      |       No       |             system             | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name) | 参数类型(args) |        说明(statement)        |
|:------------:|:--------------:|:-----------------------------:|
|    input     |     value      | 当选中项发生改变时, 返回value |
|    change    |     object     | 当选中项发生改变时, 返回value |

### Slot
---
1. Container

自定义项目内的内容, 包含以下属性:
- item: 当前项目数据
- index: 当前项目索引

```javascript
<template v-slot:container="x">
</template>
```

### Data
---
1. items

Pivot只针对对象的`key`和`name`进行匹配, 当`value`传入的这两个属性能够在`options`中匹配时, 选中项即为被匹配项.

```javascript
items = [{ key: 0, name: "Pivot", width: 80, show: true, disabled: false }]

//e.g.//

items: [{ key: 0, name: "Pivot", width: 80 }]
```
**特别地** 1.0.3版本后支持采用函数式字段, 其中支持的字段包括`name`, `disabled`, `show`, `width`
1.1.0版本后`width`支持数值和CSS字符串赋值