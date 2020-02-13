---
title: TreeView TreeView
sidebarDepth: 2
---

<script>
  export default {
    data(){
      return {
        theme:0,
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
      }
    },
    methods:{
      alert(text){
        alert(text);
      },
      go(url){
        window.location.href=url
      },
      click(item){
        console.log(item)
      }
    }
  }
</script>

[[toc]]

<div :style="divStyle">
THEME:<fv-toggle-switch v-model="theme" :on="$theme" :off="$theme" :theme="$theme"/>
</div>

### TreeView

<ClientOnly>
<div :style="divStyle">
<fv-TreeView :theme="$theme" :data="files">
</fv-TreeView>
</div>
</ClientOnly>

### TreeView Chcekable

<ClientOnly>
<div :style="divStyle">
<fv-TreeView :theme="$theme" :data="files" :checkable="true" @click="click">
</fv-TreeView>
</div>
</ClientOnly>

<br/>
<br/>
<br/>

### TreeView CustomStyle

<ClientOnly>
<div :style="divStyle">
<fv-TreeView :theme="$theme" :data="files" :checkable="true" @click="click" :viewStyle="{backgroundColor:'#2ed573',color:'#fff'}">
</fv-TreeView>
</div>
</ClientOnly>

<br/>
<br/>
<br/>

### Propoties

---

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) | 说明(statement) |
| :--------: | :--------: | :------------: | :-------------: | :-------------: |


### Events

---

| 事件名(Name) | 参数类型(args) | 说明(statement) |
| :----------: | :------------: | :-------------: |

