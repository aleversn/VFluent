---
title: TreeView TreeView
sidebarDepth: 2
---

<script>
  export default {

    data(){
      return {
        theme:0,
        backgroundColor:'rgba(41, 181, 255,0.9)',
        backgroundColorHover:'rgba(41, 181, 255,1)',
        foregroundColor:'#fff',
          files:[
          {
          label:"Folder",
          icon: "https://img.icons8.com/bubbles/2x/folder-invoices.png",
          children:[
            {
              label:"Folder",
              icon: "Folder",
              children:[
                {
                  label:"File",
                  icon: "FileCode"

                },
                
            {
              label:"File",
                  icon: "FileCode"
            }
              ]
            },
            {
              label:"File",
                  icon: "FileCode"
            },
          ]
        },
        {
          label:"File",
        icon: "FileCode"

        }]
      }
    },
    computed:{
      $theme(){
        return !this.theme?'light':'dark';
      },
    },
    methods:{
      alert(text){
        alert(text);
      },
      go(url){
        window.location.href=url
      },
      click(item){
        // console.log(item)
      },
      json(val){
        return JSON.stringify(val,null,4).replace(/\n/g,'<br/>').replace(/\s/g,'&nbsp;')
      }
    }

  }
</script>

[[toc]]

### TreeView

<ClientOnly>
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">

</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">

</fv-TreeView>
```

### Slot

<ClientOnly>
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
```

### TreeView Expand Position

  

<ClientOnly>
<fv-TreeView  v-model="files" expandedIconPosition="right" style="width:200px">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView 
  v-model="files"
  expandedIconPosition="right">
</fv-TreeView>
```

### TreeView Chcekable

  

<ClientOnly>
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView 
  v-model="files" 
  :checkable="true"
  expandedIconPosition="right"
  @click="click">
</fv-TreeView>
```

### TreeView CustomStyle Draggable

backgroundColor:
<ClientOnly>
<fv-callout>
<div :style="{width:'20px', height:'20px', backgroundColor:backgroundColor}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="backgroundColor" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>
foregroundColor:
<ClientOnly>
<fv-callout>
<div :style="{width:'20px', height:'20px', backgroundColor:foregroundColor}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="foregroundColor" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>
backgroundColorHover:
<ClientOnly>
<fv-callout>
<div :style="{width:'20px', height:'20px', backgroundColor:backgroundColorHover}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="backgroundColorHover" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>

<ClientOnly>
<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle="{backgroundColor, height:50}" 
  :backgroundColorHover="backgroundColorHover"
  :backgroundColorActive="backgroundColorHover"
  :foreground="foregroundColor"
  :draggable="true" 
  :background="backgroundColor"
  expandClickMode="icon"
  :space="10">
</fv-TreeView>
</ClientOnly>

``` vue 
<fv-TreeView 
   :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle="{backgroundColor, height:50}" 
  :backgroundColorHover="backgroundColorHover"
  :foreground="foregroundColor"
  :background="backgroundColor"
  expandClickMode="icon"
  :draggable="true" 
  :space="10">
</fv-TreeView>
</div>

```

### Propoties

---

|      属性(attr)      |             类型(type)             | 必填(required) | 默认值(default) |             说明(statement)              |
|:--------------------:|:----------------------------------:|:--------------:|:---------------:|:----------------------------------------:|
|        theme         | ['system','dark','light','custom'] |       No       |    'system'     |                  主题色                  |
|     data/v-model     |              Array               |      Yes       |       N/A       |              数据，详见data              |
|       dragable       |             Boolean              |       No       |      false      |                是否可拖动                |
|      viewStyle       |              Object              |       No       |       N/A       |   视图样式，同:style，但该样式为响应式   |
|     revealEffect     |             Boolean              |       No       |      true       | fluentRevealEffect是否开启(仅为初始状态) |
|      checkable       |             Boolean              |       No       |      false      |                 是否可选                 |
|        space         |              Number              |       No       |       20        |          树形父与子间的间距(px)          |
|     borderWidth      |              Number              |       No       |        2        |                 边框大小                 |
|      foreground      |              String              |       No       |       N/A       |                  前景色                  |
|      background      |              String              |       No       |       N/A       |                  背景色                  |
|     expandedIcon     |              String              |       No       |       N/A       |               扩展后的箭头               |
| expandedIconPosition |          ['right','left']          |       No       |     'left'      |                箭头的位置                |
|    unexpandedIcon    |              String              |       No       |       N/A       |               未扩展的箭头               |
|    expandClickMode    |              ['normal','icon']             |       No       |       'normal'       |               文件夹展开模式              |
|    backgroundColorHover    |              String              |       No       |       N/A       |               子项Hover的颜色               |
|    backgroundColorActive   |              String              |       No       |       N/A       |               子项激活的颜色               |
|    itemHeight   |              String              |       No       |       N/A       |               子项高度             |        

### Events

---

| 事件名(Name) | 参数类型(args) |            说明(statement)             |
|:------------:|:--------------:|:--------------------------------------:|
|    change    |      data      | 当data发生改变时触发，第一个参数为data |
|    click     |      item      |  当点击时触发，第一个参数为点击的item  |

### Data

``` json
[
  {
    "label": "Folder",
    "icon": "https://img.icons8.com/bubbles/2x/folder-invoices.png",
    "expanded": true,
    "selected": false,
    "checkboxStatus": null,
    "children": [
      {
        "label": "Folder",
        "icon": "Folder",
        "children": [
          {
            "label": "File",
            "icon": "FileCode"
          },
          {
            "label": "File",
            "icon": "FileCode"
          }
        ]
      },
      {
        "label": "File",
        "icon": "FileCode"
      }
    ]
  },
  {
    "label": "File",
    "icon": "FileCode"
  }
]

```

#### Slots

```vue
<template v-slot:default="prop">
  {{prop.item.label}}
</template>
```
