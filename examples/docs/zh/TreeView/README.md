---
title: TreeView TreeView
sidebarDepth: 2
---

<script>
  export default {
    data(){
      return {
        theme:0,
        backgroundColor:'#00cc99',
          files:[
          {
          label:"Folder",
          icon: "ms-Icon--Folder",
          children:[
            {
              label:"Folder",
              icon: "ms-Icon--Folder",
              children:[
                {
                  label:"File",
                  icon: "ms-Icon--FileCode"

                },
                
            {
              label:"File",
                  icon: "ms-Icon--FileCode"

            }
              ]
            },
            {
              label:"File",
                  icon: "ms-Icon--FileCode"
            },
          ]
        },
        {
          label:"File",
                  icon: "ms-Icon--FileCode"

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

<ClientOnly>
<div :style="divStyle">
<fv-TreeView :theme="$theme" v-model="files">
</fv-TreeView>
</div>
</ClientOnly>

``` vue
<fv-TreeView 
  :theme="$theme" 
  v-model="files">
</fv-TreeView>
```

### TreeView Chcekable

<ClientOnly>
<div :style="divStyle">
<fv-TreeView :theme="$theme" v-model="files" :checkable="true" @click="click">
</fv-TreeView>
</div>
</ClientOnly>

``` vue
<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true"
  @click="click">
</fv-TreeView>
```

### TreeView CustomStyle Draggable

<ClientOnly>

backgroundColor:
<fv-callout>
<div :style="{width:'20px',height:'20px',backgroundColor:backgroundColor}" style="border:1px solid #000" />
<main>
  <fv-colorPicker v-model="backgroundColor" style="width:500px"/>
</main>
</fv-callout>

<div :style="divStyle">
<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle=" {backgroundColor:backgroundColor,color:'#000'}" 
  :draggable="true" 
  :space="10">
</fv-TreeView>
</div>
</ClientOnly>

``` vue 
<fv-TreeView 
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :viewStyle=" {backgroundColor:backgroundColor,color:'#000'}" 
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

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) | 说明(statement) |
| :--------: | :--------: | :------------: | :-------------: | :-------------: |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| data/v-model| [array] | Yes | undefined | 数据，详见data |
| dragable | [boolean] | No | false | 是否可拖动 |
| viewStyle | [object] | No | undefined | 视图样式，同:style，但该样式为响应式 |
| revealEffect | [boolean] | No | true | fluentRevealEffect是否开启(仅为初始状态) |
| checkable | [boolean] | No | false | 是否可选 |
| space | [number] | No | 20 | 树形父与子间的间距(px) |

### Events

---

| 事件名(Name) | 参数类型(args) | 说明(statement) |
| :----------: | :------------: | :-------------: |
| change | data | 当data发生改变时触发，第一个参数为data |
| click | item | 当点击时触发，第一个参数为点击的item |

### Data

``` json
[
  {
    "label": "Folder",
    "icon": "ms-Icon--Folder",
    "expanded": true,
    "selected": false,
    "checkboxStatus": null,
    "children": [
      {
        "label": "Folder",
        "icon": "ms-Icon--Folder",
        "children": [
          {
            "label": "File",
            "icon": "ms-Icon--FileCode"
          },
          {
            "label": "File",
            "icon": "ms-Icon--FileCode"
          }
        ]
      },
      {
        "label": "File",
        "icon": "ms-Icon--FileCode"
      }
    ]
  },
  {
    "label": "File",
    "icon": "ms-Icon--FileCode"
  }
]

```

