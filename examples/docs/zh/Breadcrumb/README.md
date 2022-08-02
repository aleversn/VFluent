---
  title: Breadcrumb Breadcrumb
  sidebarDepth: 2
---
  
[[toc]]

### Breadcrumb-DEMO 

Basic


<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb">
</fv-Breadcrumb>
```

### Breadcrumb-Editable
---

<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false">
</fv-Breadcrumb>
```

### Breadcrumb-Custom Icon
---

1. Char

<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator=">">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator=">">
</fv-Breadcrumb>
```

2. Icon

<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator="ChevronRightMed">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator="ChevronRightMed">
</fv-Breadcrumb>
```

### Breadcrumb-Hide Root
---

<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" :showRoot="false">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" :showRoot="false">
</fv-Breadcrumb>
```

### Breadcrumb-Dark Theme
---

<div style="padding: 8px; background: black;">
<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false">
</fv-Breadcrumb>
</ClientOnly>
</div>

```vue
<div style="padding: 8px; background: black;">
    <fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false">
    </fv-Breadcrumb>
</div>
```

### Breadcrumb-Dark Disabled
---
1. Light

<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" disabled>
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" :readOnly="false" disabled>
</fv-Breadcrumb>
```

2. Dark

<div style="padding: 8px; background: black;">
<ClientOnly>
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false" disabled>
</fv-Breadcrumb>
</ClientOnly>
</div>

```vue
<div style="padding: 8px; background: black;">
<fv-Breadcrumb value="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false" disabled>
</fv-Breadcrumb>
</div>
```


### Propoties
---
|  属性(attr)   |             类型(type)             | 必填(required) | 默认值(default)  |       说明(statement)        |
|:-------------:|:----------------------------------:|:--------------:|:----------------:|:----------------------------:|
|     value     |              [string]              |       No       |       N/A        |          字符串路径          |
|   separator   |              [string]              |       No       |        /         | 分隔符显示, 可以是字符或图标 |
| separatorChar |              [string]              |       No       |        /         |      以什么字符分割路径      |
|   showRoot    |             [boolean]              |       No       |       true       |          显示根图标          |
|   rootIcon    |              [string]              |       No       | FolderHorizontal |            根图标            |
|   readOnly    |             [boolean]              |       No       |       true       |           是否只读           |
|  borderColor  |          [string(color)]           |       No       |       N/A        |                              |
|   disabled    |             [boolean]              |       No       |      false       |                              |
| borderRadius  |              [number]              |       No       |        2         |                              |
|     theme     | ['light','dark','custom','system'] |       No       |      system      |                              |


### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|  root-click  |     object     | 单击根图标触发  |
|  item-click  |     object     | 单击路由项触发  |
  

### Slot

---

1. root

定义下拉内容

- rootIcon: 根图标
- separatorIcon: 分割图标
- separator: 分隔符

```vue
<template v-slot:root="x">
    <i class="fv-bc-separator-content ms-Icon" :class="[`ms-Icon--${x.rootIcon}`]"></i>
    <i class="fv-bc-separator-icon ms-Icon" :class="[x.separatorIcon ? `ms-Icon--${x.separator}` : '']">{{x.separatorIcon ? '' : x.separator}}</i>
</template>
```

2. route-item

自定义`Collapse`显示图标

- item: 当前项
- index: 当前索引

```vue
<template v-slot:route-item="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```