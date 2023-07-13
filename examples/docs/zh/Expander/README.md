---
  title: Expander
  sidebarDepth: 2
---
  
[[toc]]

### Expander-DEMO
--- 

<div>    
<ClientOnly>
<fv-Expander>

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Expander>
</ClientOnly>
</div>

```vue

<fv-Expander>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

Disabled Expander

<div>
<ClientOnly>
<fv-Expander :disabledExpander="true">

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander :disabledExpander="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

Extension

<div>
<ClientOnly>
<fv-Expander :disabledExpander="true">

    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>

</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander :disabledExpander="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Expander>
```

### Expander-Customize Background

---

<div>
<ClientOnly>
<fv-Expander background="rgba(0, 98, 158, 1)">

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

### Expander-Dark Theme

---

<div>
<ClientOnly>
<fv-Expander theme="dark">

    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>

</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Expander>
```

### Propoties

---
|    属性(attr)    |   类型(type)    | 必填(required) |         默认值(default)          |                      说明(statement)                      |
|:----------------:|:---------------:|:--------------:|:--------------------------------:|:---------------------------------------------------------:|
|      value       |     Boolean     |       No       |              false               |                    是否展开 `Expander`                    |
|       icon       |     String      |       No       |           ExpanderMenu           |                   Icon with Fabric-Icon                   |
|      title       |     String      |       No       |        Title of Expander.        |                           标题                            |
|     content      |     String      |       No       | Content information of Expander. |                        副标题信息                         |
| titleBackground  | [string(color)] |       No       |               N/A                |                  客制化 `Expander` 背景                   |
| expandBackground | [string(color)] |       No       |               N/A                |                  客制化 `Expander` 背景                   |
|  defaultHeight   |     Number      |       No       |                70                |                         默认高度                          |
|    maxHeight     |     Number      |       No       |               300                |                       展开最大高度                        |
| disabledExpander |     Boolean     |       No       |              false               |                    禁用展开 `Expander`                    |
| visibleOverflow  |     Boolean     |       No       |               true               |       在禁用展开 `Expander` , 允许overflow内容显示        |
|      theme       |     String      |       No       |              system              | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events

---
|   事件名(Name)   | 参数类型(args) |          说明(statement)          |
|:----------------:|:--------------:|:---------------------------------:|
|    item-click    |    boolean     | 返回 `Expander` 属性 `value` 的值 |
| descrption-click |      N/A       |            描述框点击             |
|    icon-click    |      N/A       |           右侧图标点击            |
  

### Slot

---

1. Default

定义下拉内容

```vue
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

2. content

自定义内容

* title: 标题
* contnet: 副标题

```vue
<template v-slot:content="x">
    <div class="expander-title">{{ x.title }}</div>
    <div class="expander-info">{{ x.content }}</div>
</template>
```

3. Extension

扩展操作内容

```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```


4. expand-icon

自定义展开状态图标

* value: 当前是否展开
* disabledCollaspe: 是否禁用展开

```vue
<template v-slot:expand-icon="x">
    <i
        v-show="x.value"
        class="ms-Icon ms-Icon--ChevronUpMed"
    ></i>
    <i
        v-show="!x.value && !x.disabledExpander"
        class="ms-Icon ms-Icon--ChevronDownMed"
    ></i>
    <i
        v-show="!x.value && x.disabledExpander"
        class="ms-Icon ms-Icon--ChevronRightMed"
    ></i>
</template>
```
