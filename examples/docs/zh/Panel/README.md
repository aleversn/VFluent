---
  title: Panel
  sidebarDepth: 2
---
  
[[toc]]

### Panel-DEMO
---

<script>
export default {
    data () {
        return {
            basic: false,
            nearSide: false,
            centralSide: false,
            topSide: false,
            bottomSide: false,
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

### Panel Central Side
---

Global Append

<ClientOnly>
<fv-button style="width: 200px;" @click="centralSide = true">Open Panel</fv-button>
<fv-Panel v-model="centralSide" :isCentralSide="true" :teleport="true" width="calc(90% - 50px)" height="calc(90% - 50px)">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="centralSide" :isCentralSide="true" :teleport="true" width="calc(90% - 50px)" height="calc(90% - 50px)">
</fv-Panel>
```

### Panel Top Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="topSide = true">Open Panel</fv-button>
<fv-Panel v-model="topSide" :isTopSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="topSide" :isTopSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
```

### Panel Bottom Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="bottomSide = true">Open Panel</fv-button>
<fv-Panel v-model="bottomSide" :isBottomSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="bottomSide" :isBottomSide="true" :isLightDismiss="true" width="100%" height="500px">
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
|   属性(attr)   |   类型(type)    | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:--------------:|:---------------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|     value      |     Boolean     |       No       |      false      |                     显示/隐藏`Panel`                      |
|     title      |     String      |       No       |  Sample Panel   |                           标题                            |
|   titleSize    | [number,string] |       No       |       20        |                       标题字体大小                        |
|  titleWeight   | [number,string] |       No       |       600       |                       标题字体粗细                        |
|   titleColor   | [string(color)] |       No       |       N/A       |                       标题字体颜色                        |
|     width      | [number,string] |       No       |       340       |                           宽度                            |
|     height     | [number,string] |       No       |      100%       |                           宽度                            |
|   background   | [string(color)] |       No       |       N/A       |                       `Panel`背景色                       |
|   isNearSide   |     Boolean     |       No       |      false      |                      是否从左侧显示                       |
| isCentralSide  |     Boolean     |       No       |      false      |                      是否从中央显示                       |
| isLightDismiss |     Boolean     |       No       |      false      |                    是否单击空白处关闭                     |
|  showTitleBar  |     Boolean     |       No       |      false      |                      是否显示标题栏                       |
|    isFooter    |     Boolean     |       No       |      false      |                     是否显示底部控制                      |
|   isAcrylic    |     Boolean     |       No       |      false      |                   是否开启`Acrylic`效果                   |
| controlPadding |     String      |       No       |      10px       |                    标题和控制栏内边距                     |
| contentPadding |     String      |       No       |       0px       |                        内容内边距                         |
|  isBottomSide  |     Boolean     |       No       |      false      |                        从底部显式                         |
|   isTopSide    |     Boolean     |       No       |      false      |                        从顶部显示                         |
|    teleport    |     Boolean     |       No       |      false      |                  穿越当前父容器全局放置                   |
|     theme      |     String      |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Slot
---
1. Container

自定义容器内容

```javascript
<template v-slot:container>
</template>
```

2. Header

自定义标题栏内容

```javascript
<template v-slot:header>
</template>
```

3. Footer

自定义`Footer`内容

```javascript
<template v-slot:footer>
</template>
```