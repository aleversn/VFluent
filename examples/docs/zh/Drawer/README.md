---
  title: Drawer Drawer
  sidebarDepth: 2
---
  
[[toc]]

<script>
  export default {

    data(){
      return {
        visible:false,
        v2: false,
        theme:0
      }
    },
    methods:{
      toggle(){
        this.visible=!this.visible;
      }
    }, 
    computed:{
      divStyle(){
        if (this.$theme=='light'){
          return {
            backgroundColor:'#fff',
            padding:'20px',
            color:'#000',
          }
        }else{
          return {
            backgroundColor:'#000',
            padding:'20px',
            color:'#fff',
          }
        }
      },
    }

  }
</script>

### Drawer
---

<ClientOnly>

<fv-button style="width: 120px;" @click="toggle" >Show / Hide</fv-button>

<fv-drawer v-model="visible"appendBody>
</fv-drawer>

```vue
<fv-drawer v-model="visible" appendBody>
</fv-drawer>
```

- Change Side

<fv-button style="width: 120px;" @click="v2 ^= true" >Show / Hide</fv-button>

<fv-drawer v-model="v2" position="left" appendBody>
</fv-drawer>

```vue
<fv-drawer v-model="v2" position="left" appendBody>
</fv-drawer>
```

</ClientOnly>

### Propoties

---
| 属性(attr) |              类型(type)               | 必填(required) | 默认值(default) |      说明(statement)      |
|:----------:|:-------------------------------------:|:--------------:|:---------------:|:-------------------------:|
|   theme    | ['system', 'dark', 'light', 'custom'] |       No       |    'system'     |          主题色           |
|   value    |                Boolean                |       No       |      false      |         是否可视          |
|   length   |           [number, string]            |       No       |       300       |         抽屉长度          |
| focusTrap  |                Boolean                |       No       |      false      |         是否聚焦          |
|   zIndex   |                Number                 |       No       |       10        |          层叠数           |
|  position  |  ['bottom', 'left', 'top', 'right']   |       No       |    'bottom'     |           位置            |
| appendBody |                Boolean                |       No       |      false      | 是否添加到body（IOS兼容） |

### Events

---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|              |                |                 |
  
### Slot
---
1. Default

自定义容器内内容

```vue
<template>
    <p></p>
</template>
```