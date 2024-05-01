---
title: Callout
sidebarDepth: 2
---

[[toc]]

<script>
  export default {
    data(){
      return {
        text:"1233",
        show:true,
        color:'rgba(36, 36, 36, 1)',
        beak:10,
        space:0,
        position:{key:'topLeft',text:'topLeft'},
        options:[
          {key:'topLeft',text:'topLeft'},
          {key:'topRight',text:'topRight'},
          {key:'topCenter',text:'topCenter'},
          {key:'bottomLeft',text:'bottomLeft'},
          {key:'bottomRight',text:'bottomRight'},
          {key:'bottomCenter',text:'bottomCenter'},
          {key:'leftTop',text:'leftTop'},
          {key:'leftCenter',text:'leftCenter'},
          {key:'leftBottom',text:'leftBottom'},
          {key:'rightTop',text:'rightTop'},
          {key:'rightBottom',text:'rightBottom'},
          {key:'rightCenter',text:'rightCenter'}
        ]
      }
    },
    methods:{
      changeText(text){
        this.text = text;
      }
    }
  }

</script>

### Callout 

<ClientOnly>
<fv-callout :visible.sync="show" effect="hover" position="bottomLeft" :keepalive="false">
  <fv-button icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Color</fv-button>
  <main>
    <fv-color-picker v-model="color" style="width:500px"></fv-color-picker>
  </main>
</fv-callout>
</ClientOnly>

```vue
<fv-callout :visible.sync="show" effect="hover" position="bottomLeft">
  <fv-button icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <main>
    <fv-color-picker v-model="color" style="width:500px"></fv-color-picker>
  </main>
</fv-callout>
```

### Callout Custom

beak:

<fv-slider v-model="beak" :color="color" :mininum="9" :maxinum="30"  :showLabel="true">
<template slot-scope="prop" >
  <span>{{prop.value}}px</span>
</template>
</fv-slider>

space:

<fv-slider v-model="space" :color="color" :scale="10" :maxinum="30" :showLabel="true">
<template slot-scope="prop" >
  <span>{{prop.value}}px</span>
</template>
</fv-slider>

position:
<ClientOnly>
<fv-combobox v-model="position" :options="options">
</fv-combobox>
</ClientOnly>

{{position.key}}

<ClientOnly>
<fv-callout :lockScroll="true" :position="position.key" :beak="beak" :space="space" :popperStyle="{backgroundColor:color}" theme="dark" >
  <fv-button :background="color" theme="dark" icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <header>
    Fluent UI
  </header>
  <main>
    Hello Vue! Nice to meet you!
  </main>
  <footer>
    @Copyright Creator SN
  </footer>
</fv-callout>
</ClientOnly>

```vue
<fv-callout :lockScroll="true" :position="position.key" :beak="beak" :space="space" :popperStyle="{ backgroundColor: color }" theme="dark">
  <fv-button :background="color" theme="dark" icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <header>
    Fluent UI
  </header>
  <main>
    Hello Vue! Nice to meet you!
  </main>
  <footer>
    @Copyright Creator SN
  </footer>
</fv-callout>
```

### Propoties

---

|     属性(attr)     |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:------------------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|    visible.sync    |              Boolean               |       No       |      false      |        是否显示        |
|       theme        | ['system','light','dark','custom'] |       No       |    'system'     |         主题色         |
|      disabled      |              Boolean               |       No       |      false      |        是否禁用        |
|       space        |               Number               |       No       |        0        |        间距(px)        |
|        beak        |               Number               |       No       |       10        |      角标大小(px)      |
|      position      |    ['topLeft','topCenter',...]     |       No       | 'bottomCenter'  |          位置          |
|     lockScroll     |              Boolean               |       No       |      false      |      是否锁定滚动      |
|     focusTrap      |              Boolean               |       No       |      false      |        是否聚焦        |
|     delayClose     |               Number               |       No       |        0        | 显示时是否延时关闭(ms) |
|       effect       |     [’click','hover','always']     |       No       |     'click'     |      显示触发方式      |
|    popperStyle     |               Object               |       No       |       {}        |      悬浮窗的样式      |
|    popperClass     |               Array                |       No       |       []        |      悬浮窗的 css      |
| popperContentClass |               Array                |       No       |       []        |    悬浮窗内容的 css    |

### Appendix

---

1. position

`position`属性包括: `topLeft`, `topRight`, `topCenter`, `bottomLeft`, `bottomRight`, `bottomCenter`, `leftTop`, `leftCenter`, `leftBottom`, `rightTop`, `rightBottom`, `rightCenter`
