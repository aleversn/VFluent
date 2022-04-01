---
  title: Collapse Collapse
  sidebarDepth: 2
---
  
[[toc]]

### Collapse-DEMO 


<div>
    <fv-Collapse>
        <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
    </fv-Collapse>
</div>

```vue
<fv-Collapse>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

Disabled Collapse

<div>
    <fv-Collapse :disabledCollapse="true">
        <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
    </fv-Collapse>
</div>

```vue
<div>
    <fv-Collapse :disabledCollapse="true">
        <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
    </fv-Collapse>
</div>
```

### Collapse-Customize Background
---

<div>
    <fv-Collapse background="rgba(0, 153, 204, 1)">
        <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
    </fv-Collapse>
</div>

```vue
<fv-Collapse background="rgba(0, 153, 204, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```


### Collapse-Dark Theme
---

<div>
    <fv-Collapse theme="dark">
        <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
    </fv-Collapse>
</div>

```vue
<fv-Collapse theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Collapse>
```

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) |         默认值(default)          |    说明(statement)     |
|:----------------:|:----------------------------------:|:--------------:|:--------------------------------:|:----------------------:|
|      value       |             [boolean]              |       No       |              false               |   是否展开`Collapse`   |
|       icon       |              [string]              |       No       |           CollapseMenu           | Icon with Fabric-Icon  |
|      title       |              [string]              |       No       |        Title of Collapse.        |          标题          |
|     content      |              [string]              |       No       | Content information of Collapse. |       副标题信息       |
|    background    |          [string(color)]           |       No       |               N/A                |  客制化`Collapse`背景  |
|  defaultHeight   |              [number]              |       No       |                70                |        默认高度        |
|    maxHeight     |              [number]              |       No       |               300                |      展开最大高度      |
| disabledCollapse |             [boolean]              |       No       |              false               |   禁用展开`Collapse`   |
|      theme       | ['light','dark','custom','system'] |       No       |              system              | 主题样式, 默认跟随系统 |

### Events
---
| 事件名(Name) | 参数类型(args) |        说明(statement)        |
|:------------:|:--------------:|:-----------------------------:|
|  item-click  |    boolean     | 返回`Collapse`属性`value`的值 |
  
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

自定义`Collapse`显示图标

```vue
<template v-slot:icon="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

3. container

自定义内容, 如果只需要单独修改标题`title`或副标题`content`, 可使用下面的`template`进行自定义

- title: 标题
- contnet: 副标题

```vue
<template v-slot:container="x">
    <div class="collapse-title">{{ x.title }}</div>
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

4. title

自定义标题

- title: 标题

```vue
<template v-slot:title="x">
    <div class="collapse-title">{{ x.title }}</div>
</template>
```

5. content

自定义副标题

- content: 副标题

```vue
<template v-slot:content="x">
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

5. expand-icon

自定义展开状态图标

- value: 当前是否展开
- disabledCollaspe: 是否禁用展开

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