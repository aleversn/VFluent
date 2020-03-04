---
  title: TimePicker TimePicker
  sidebarDepth: 2
---
  
[[toc]]

<style>
  .custom_style{
    background-color: rgb(0, 204, 153);
    border:1px solid rgb(0, 204, 153);
    color:white;
  }
  .custom_style:hover{
    border:1px solid rgb(0, 204, 153);
    background-color: rgb(0, 204, 153,0.8);
  }
</style>

<script>
  export default {
    data(){
      return {
        theme:0,
        date:new Date()
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
    }
  }
</script>

<div :style="divStyle">
THEME:<fv-toggle-switch v-model="theme" :on="$theme" :off="$theme" :theme="$theme"/>
</div>

### TimePicker-Default

<div :style="divStyle">
<ClientOnly>
  <fv-TimePicker v-model="date" :theme="$theme" />
</ClientOnly>
</div>

``` vue
<fv-TimePicker v-model="date" :theme="$theme" />
```

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
|             |                                    |                |                 |                         |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|              |                |                 |
  
