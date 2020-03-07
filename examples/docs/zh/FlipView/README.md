---
title: FlipView FlipView
sidebarDepth: 2
---

[[toc]]

### FlipView-DEMO

<script>
export default {
    data () {
        return {
            value: [1,2,3,4,5],
            images: ['https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true']
        }
    }
}
</script>

<ClientOnly>
<fv-FlipView v-model="value">
</fv-FlipView>

```vue
<fv-FlipView v-model="value">
</fv-FlipView>
```

### FlipView Custom Template

---

<fv-FlipView v-model="images"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>

```vue
<fv-FlipView v-model="images">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Vertical Direction

---

<fv-FlipView v-model="images" direction="vertical"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>

```vue
<fv-FlipView v-model="images" direction="vertical">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Mask

---

<fv-FlipView v-model="images" mask="rgba(36,36,36,0.6)"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>

```vue
<fv-FlipView v-model="images" mask="rgba(36,36,36,0.6)">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Different Animation

---

<fv-FlipView v-model="images" animation="fold"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>

```vue
<fv-FlipView v-model="images" animation="fold">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Dark Theme

---

<fv-FlipView v-model="images" theme="dark"><template v-slot:item="x"><div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;"><p style="font-size: 36px; color: whitesmoke;">Dark Theme</p></div></template></fv-FlipView>

```vue
<fv-FlipView v-model="images" theme="dark">
    <template v-slot:item="x">
        <div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 36px; color: whitesmoke;">Dark Theme</p>
        </div>
    </template>
</fv-FlipView>
```

### FlipView Show Control Panel

---

<fv-FlipView v-model="images" theme="dark" showControlPanel="hover"><template v-slot:item="x"><div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;"><p style="font-size: 36px; color: whitesmoke;">Dark Theme</p></div></template></fv-FlipView>

```vue
<fv-FlipView v-model="images" theme="dark" showControlPanel="hover">
    <template v-slot:item="x">
        <div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 36px; color: whitesmoke;">Dark Theme</p>
        </div>
    </template>
</fv-FlipView>
```
</ClientOnly>

### Propoties

---

|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |                 说明(statement)                 |
| :--------------: | :--------------------------------: | :------------: | :-------------: | :---------------------------------------------: |
|      value       |              [array]               |      Yes       |       []        |             Flipview template data              |
|    direction     |     ['horizontal','vertical']      |       No       |   horizontal    |                                                 |
|    animation     |              [string]              |       No       |      move       | move, moveFade, moveDifferent, glue, push, fold |
|     duration     |              [number]              |       No       |       800       |                                                 |
|     autoPlay     |             [boolean]              |       No       |      true       |                                                 |
| autoPlayDuration |              [number]              |       No       |      5000       |                                                 |
| showControlPanel |       ['','hidden','hover']        |       No       |       N/A       |                                                 |
|       mask       |          [string(color)]           |       No       |       N/A       |         The mask color of control panel         |
|      theme       | ['light','dark','custom','system'] |       No       |     system      |                                                 |

### Slot

---

1. Input

```javascript
<template v-slot:item="x">
    <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
</template>
```
