---
title: TreeView TreeView
sidebarDepth: 2
---

<script>
  export default {
    data(){
      return {
        theme:0,
        backgroundColor:'rgba(5, 76, 94, 1)',
        backgroundColorHover:'rgba(5,76,94,1)',
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
   
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">

</fv-TreeView>

``` vue
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">

</fv-TreeView>
```

### Slot
    
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>

``` vue
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
```

### TreeView Expand Position
  
<fv-TreeView  v-model="files" expandedIconPosition="right" style="width:200px">
</fv-TreeView>

``` vue
<fv-TreeView 
  v-model="files"
  expandedIconPosition="right">
</fv-TreeView>
```

### TreeView Chcekable
  
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>


``` vue
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
<div :style="{width:'20px',height:'20px',backgroundColor:backgroundColor}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="backgroundColor" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>
foregroundColor:
<ClientOnly>
<fv-callout>
<div :style="{width:'20px',height:'20px',backgroundColor:foregroundColor}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="foregroundColor" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>
backgroundColorHover:
<ClientOnly>
<fv-callout>
<div :style="{width:'20px',height:'20px',backgroundColor:backgroundColorHover}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="backgroundColorHover" style="width:500px"/>
</main>
</fv-callout>
</ClientOnly>


<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle="{backgroundColor,backgroundColorHover}" 
  :foreground="foregroundColor"
  :draggable="true" 
  :background="backgroundColor"
  :space="10">
</fv-TreeView>

``` vue 
<fv-TreeView 
   :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle="{backgroundColor,backgroundColorHover}" 
  :foreground="foregroundColor"
  :background="backgroundColor"
  :draggable="true" 
  :space="10">
</fv-TreeView>
</div>
```


<br/>
<br/>
<br/>

### Propoties

---

|      属性(attr)      |             类型(type)             | 必填(required) | 默认值(default) |             说明(statement)              |
|:--------------------:|:----------------------------------:|:--------------:|:---------------:|:----------------------------------------:|
|        theme         | ['system','dark','light','custom'] |       No       |    'system'     |                  主题色                  |
|     data/v-model     |              [array]               |      Yes       |       N/A       |              数据，详见data              |
|       dragable       |             [boolean]              |       No       |      false      |                是否可拖动                |
|      viewStyle       |              [object]              |       No       |       N/A       |   视图样式，同:style，但该样式为响应式   |
|     revealEffect     |             [boolean]              |       No       |      true       | fluentRevealEffect是否开启(仅为初始状态) |
|      checkable       |             [boolean]              |       No       |      false      |                 是否可选                 |
|        space         |              [number]              |       No       |       20        |          树形父与子间的间距(px)          |
|     borderWidth      |              [number]              |       No       |        2        |                 边框大小                 |
|      foreground      |              [string]              |       No       |       N/A       |                  前景色                  |
|      background      |              [string]              |       No       |       N/A       |                  背景色                  |
|     expandedIcon     |              [string]              |       No       |       N/A       |               扩展后的箭头               |
| expandedIconPosition |          ['right','left']          |       No       |     'left'      |                箭头的位置                |
|    unexpandedIcon    |              [string]              |       No       |       N/A       |               未扩展的箭头               |
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

``` vue
<template v-slot:default="prop">
  {{prop.item.label}}
</template>
```

