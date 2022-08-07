---
  title: Collapse Collapse
  sidebarDepth: 2
---
  
[[toc]]

### Collapse-DEMO
--- 

<div>    
<ClientOnly>
<fv-Collapse>

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Collapse>
</ClientOnly>
</div>

```vue

<fv-Collapse>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

Disabled Collapse

<div>
<ClientOnly>
<fv-Collapse :disabledCollapse="true">

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse :disabledCollapse="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

Extension

<div>
<ClientOnly>
<fv-Collapse :disabledCollapse="true">

    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>

</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse :disabledCollapse="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Collapse>
```

### Collapse-Customize Background

---

<div>
<ClientOnly>
<fv-Collapse background="rgba(0, 153, 204, 1)">

    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>

</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse background="rgba(0, 153, 204, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

### Collapse-Dark Theme

---

<div>
<ClientOnly>
<fv-Collapse theme="dark">

    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>

</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Collapse>
```

### Propoties

---
|    属性(attr)    |             类型(type)             | 必填(required) |         默认值(default)          |              说明(statement)               |
|:----------------:|:----------------------------------:|:--------------:|:--------------------------------:|:------------------------------------------:|
|      value       |             Boolean              |       No       |              false               |             是否展开 `Collapse` |
|       icon       |              String              |       No       |           CollapseMenu           |           Icon with Fabric-Icon            |
|      title       |              String              |       No       |        Title of Collapse.        |                    标题                    |
|     content      |              String              |       No       | Content information of Collapse. |                 副标题信息                 |
|    background    |          [string(color)]           |       No       |               N/A                |            客制化 `Collapse` 背景            |
|  defaultHeight   |              Number              |       No       |                70                |                  默认高度                  |
|    maxHeight     |              Number              |       No       |               300                |                展开最大高度                |
| disabledCollapse |             Boolean              |       No       |              false               |             禁用展开 `Collapse` |
| visibleOverflow  |             Boolean              |       No       |               true               | 在禁用展开 `Collapse` , 允许overflow内容显示 |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---
|   事件名(Name)   | 参数类型(args) |        说明(statement)        |
|:----------------:|:--------------:|:-----------------------------:|
|    item-click    |    boolean     | 返回 `Collapse` 属性 `value` 的值 |
| descrption-click |      N/A       |          描述框点击           |
|    icon-click    |      N/A       |         右侧图标点击          |
| left-icon-click  |      N/A       |         左侧图标点击          |
  

### Slot

---

1. Default

定义下拉内容

```vue
<fv-Collapse background="rgba(0, 153, 204, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

2. icon

自定义 `Collapse` 显示图标

```vue
<template v-slot:icon="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

3. container

自定义内容, 如果只需要单独修改标题 `title` 或副标题 `content` , 可使用下面的 `template` 进行自定义

* title: 标题
* contnet: 副标题

```vue
<template v-slot:container="x">
    <div class="collapse-title">{{ x.title }}</div>
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

4. Extension

扩展操作内容

```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```

5. title

自定义标题

* title: 标题

```vue
<template v-slot:title="x">
    <div class="collapse-title">{{ x.title }}</div>
</template>
```

6. content

自定义副标题

* content: 副标题

```vue
<template v-slot:content="x">
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

7. expand-icon

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
        v-show="!x.value && !x.disabledCollapse"
        class="ms-Icon ms-Icon--ChevronDownMed"
    ></i>
    <i
        v-show="!x.value && x.disabledCollapse"
        class="ms-Icon ms-Icon--ChevronRightMed"
    ></i>
</template>
```
