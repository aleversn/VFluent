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
      divStyle(){
        if (this.$theme=='light'){
          return {
            height: '200px',
            backgroundColor:'#fff',
            padding:'20px',
            color:'#000',
            overflow: 'auto'
          }
        }else{
          return {
            height: '200px',
            backgroundColor:'#000',
            padding:'20px',
            color:'#fff',
            overflow: 'auto'
          }
        }
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


<div :style="divStyle">
THEME:<fv-toggle-switch v-model="theme" :on="$theme" :off="$theme" :theme="$theme"/>
</div>

<!-- <div :style="divStyle">
<div v-html="json(files)">
</div>
</div> -->

### TreeView

<!-- <ClientOnly> -->
<div :style="divStyle">
<fv-TreeView :theme="$theme" v-model="files" style="width:200px">
</fv-TreeView>
</div>
<!-- </ClientOnly> -->

``` vue
<fv-TreeView 
  :theme="$theme" 
  v-model="files">
</fv-TreeView>
```

### TreeView Expand Position

<!-- <ClientOnly> -->
<div :style="divStyle">
<fv-TreeView :theme="$theme" v-model="files" expandedIconPosition="right" style="width:200px">
</fv-TreeView>
</div>
<!-- </ClientOnly> -->

``` vue
<fv-TreeView 
  :theme="$theme" 
  v-model="files"
  expandedIconPosition="right">
</fv-TreeView>
```

### TreeView Chcekable

<!-- <ClientOnly> -->
<div :style="divStyle">
<fv-TreeView :theme="$theme" v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
</div>
<!-- </ClientOnly> -->

``` vue
<fv-TreeView 
  :theme="$theme" 
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

<div :style="divStyle">
<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle=" {backgroundColor:backgroundColor,color:'#000'}" 
  :foreground="foregroundColor"
  :draggable="true" 
  :space="10">
</fv-TreeView>
</div>

``` vue 
<fv-TreeView 
   :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle=" {backgroundColor:backgroundColor,color:'#000'}" 
  :foreground="foregroundColor"
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

