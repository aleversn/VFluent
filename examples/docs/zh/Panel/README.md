---
  title: Panel Panel
  sidebarDepth: 2
---
  
[[toc]]

### Panel-DEMO

<script>
export default {
    data () {
        return {
            basic: false,
            nearSide: false,
            lightDismiss: false,
            acrylic: false,
            footer: false,
            dark: false,
            acrylicDark: false
        }
    }
}
</script>

<ClientOnly>
<fv-button style="width: 200px;" @click="basic = true">Open Panel</fv-button>
<fv-Panel v-model="basic">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="basic">
</fv-Panel>
```

### Panel Near Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="nearSide = true">Open Panel</fv-button>
<fv-Panel v-model="nearSide" :isNearSide="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="nearSide" :isNearSide="true">
</fv-Panel>
```

### Panel Light Dismiss
---

<ClientOnly>
<fv-button style="width: 200px;" @click="lightDismiss = true">Open Panel</fv-button>
<fv-Panel v-model="lightDismiss" :isLightDismiss="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="lightDismiss" :isLightDismiss="true">
</fv-Panel>
```

### Panel Acrylic
---

<ClientOnly>
<fv-button style="width: 200px;" @click="acrylic = true">Open Panel</fv-button>
<fv-Panel v-model="acrylic" :isLightDismiss="true" :isAcrylic="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="acrylic" :isLightDismiss="true" :isAcrylic="true">
</fv-Panel>
```

### Panel Footer
---

<ClientOnly>
<fv-button style="width: 200px;" @click="footer = true">Open Panel</fv-button>
<fv-Panel v-model="footer" :isFooter="true" :isAcrylic="true">
<template v-slot:footer>
    <fv-button theme="dark" background="rgba(0, 90, 158, 1)">OK</fv-button>
    <fv-button @click="footer = false">Cancel</fv-button>
</template>
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="footer" :isFooter="true" :isAcrylic="true">
    <template v-slot:footer>
        <fv-button theme="dark" background="rgba(0, 90, 158, 1)">OK</fv-button>
        <fv-button>Cancel</fv-button>
    </template>
</fv-Panel>
```

### Panel Dark Theme
---

Standard

<ClientOnly>
<fv-button style="width: 200px;" @click="dark = true">Open Panel</fv-button>
<fv-Panel v-model="dark" :isLightDismiss="true" theme="dark">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="dark" :isLightDismiss="true" theme="dark">
</fv-Panel>
```

Acrylic

<ClientOnly>
<fv-button style="width: 200px;" @click="acrylicDark = true">Open Panel</fv-button>
<fv-Panel v-model="acrylicDark" :isLightDismiss="true" :isAcrylic="true" theme="dark">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="acrylicDark" :isLightDismiss="true" :isAcrylic="true" theme="dark">
</fv-Panel>
```

### Propoties
---
|   属性(attr)   |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)    |
|:--------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|     value      |             [boolean]              |       No       |      false      |   显示/隐藏`Panel`    |
|     title      |              [string]              |       No       |  Sample Panel   |         标题          |
|     width      |              [number]              |       No       |       340       |         宽度          |
|   background   |          [string(color)]           |       No       |       N/A       |     `Panel`背景色     |
|   isNearSide   |             [boolean]              |       No       |      false      |    是否从左侧显示     |
| isLightDismiss |             [boolean]              |       No       |      false      |  是否单击空白处关闭   |
|    isFooter    |             [boolean]              |       No       |      false      |   是否显示底部控制    |
|   isAcrylic    |             [boolean]              |       No       |      false      | 是否开启`Acrylic`效果 |
|     theme      | ['light','dark','custom','system'] |       No       |     system      |         主题          |

### Slot
---
1. Container

自定义容器内容

```javascript
<template v-slot:container>
</template>
```

2. Footer

自定义`Footer`内容

```javascript
<template v-slot:footer>
</template>
```