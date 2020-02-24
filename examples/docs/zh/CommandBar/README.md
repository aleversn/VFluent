---
  title: CommandBar CommandBar
  sidebarDepth: 2
---
  
[[toc]]

### CommandBar-DEMO

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { name: "Add", icon: "Add", iconColor: "rgba(0, 120, 212, 1)", func: this.customFunc, secondary: [
                    { name: "Email Message", func: this.customFunc, icon: "Mail", iconColor: "rgba(0, 153, 204, 1)" },
                    { type: "divider" },
                    { name: "Calendar event", func: this.customFunc, icon: "WebAppBuilderModule" }
                ]},
                { name: "Edit", func: this.customFunc, icon: "SingleColumnEdit" },
                { type: "divider" },
                { name: "Share", func: this.customFunc, icon: "Share" },
                { type: "more", secondary: [
                    { name: "Move to", func: this.customFunc, icon: "MoveToFolder"},
                    { name: "Copy to", func: this.customFunc, icon: "Copy"},
                    { name: "Rename", func: this.customFunc, icon: "Rename"}
                ]}
            ]
        }
    },
    methods: {
        customFunc () {
            console.log(1);
        }
    }
}
</script>

<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options" style="z-index: 2;"></fv-CommandBar>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options"></fv-CommandBar>
</div>
```

### CommandBar-Toward Up
---
<div style="width: 100%;">
    <fv-CommandBar :options="options" toward="up" style="z-index: 2;"></fv-CommandBar>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" toward="up"></fv-CommandBar>
</div>
```

### CommandBar-Right Space
---
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options" style="z-index: 2;">
        <template v-slot:right-space>
            <span style="width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
                <i class="ms-Icon ms-Icon--Error icon"></i>
            </span>
        </template>
    </fv-CommandBar>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options">
        <template v-slot:right-space>
            <span style="width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
                <i class="ms-Icon ms-Icon--Error icon"></i>
            </span>
        </template>
    </fv-CommandBar>
</div>
```

### CommandBar-Dark Theme
---
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark" style="z-index: 2;"></fv-CommandBar>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark"></fv-CommandBar>
</div>
```

### CommandBar-Custom Background
---
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark" background="rgba(0, 153, 204, 1)" style="z-index: 2;"></fv-CommandBar>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark" background="rgba(0, 153, 204, 1)"></fv-CommandBar>
</div>
```

### Propoties
---
| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:----------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|   value    |              [object]              |       No       |       N/A       |   绑定当前选中的对象   |
|  options   |              [array]               |      Yes       |       N/A       |    CommandBar数据源    |
|   toward   |           ['down','up']            |       No       |      down       |     下拉菜单的朝向     |
| background |          [string(color)]           |       No       |       N/A       |     CommandBar背景     |
|   theme    | ['light','dark','custom','system'] |       No       |     system      | 主题样式, 默认跟随系统 |

### Events
---
| 事件名(Name) | 参数类型(args) |     说明(statement)      |
|:------------:|:--------------:|:------------------------:|
|  item-click  |     object     | 选中项目时返回当前数据项 |
  
### Slot
---
1. Right Space

用户可自定义CommandBar右侧内容

```vue
<template v-slot:right-space>
    <i></i>
</template>
```

### Data
---
1. options

`options`中包含像`ListView`中的`items`一样的数据引用方式, 此外用户还可以指定:
- 图标`icon`
- 图标颜色`iconColor`
- 触发函数`func`
- 是否包含二级菜单`secondary`, `secondary`中的数据格式同`options`中一致

```javascript
options = [{name: "", icon: "", iconColor: "", type: "", func: {}, secondary: []}]

//e.g.//

options: [
            { name: "Add", icon: "Add", iconColor: "rgba(0, 120, 212, 1)", func: this.customFunc, secondary: [
                { name: "Email Message", func: this.customFunc, icon: "Mail", iconColor: "rgba(0, 153, 204, 1)" },
                { type: "divider" },
                { name: "Calendar event", func: this.customFunc, icon: "WebAppBuilderModule" }
            ]},
            { name: "Edit", func: this.customFunc, icon: "SingleColumnEdit" },
            { type: "divider" },
            { name: "Share", func: this.customFunc, icon: "Share" },
            { type: "more", secondary: [
                { name: "Move to", func: this.customFunc, icon: "MoveToFolder"},
                { name: "Copy to", func: this.customFunc, icon: "Copy"},
                { name: "Rename", func: this.customFunc, icon: "Rename"}
            ]}
        ]
```

