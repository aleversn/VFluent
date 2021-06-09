---
  title: DatePicker DatePicker
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

### DatePicker-Default

<div :style="divStyle">
<ClientOnly>
<fv-DatePicker style="width:150px" v-model="date" :theme="$theme">
</fv-DatePicker>
</ClientOnly>
</div>

``` vue
<fv-DatePicker v-model="date" :theme="$theme">
</fv-DatePicker>
```

### DatePicker-Simple

<div :style="divStyle">
<ClientOnly>
<fv-DatePicker v-model="date" :theme="$theme" :hideYear="true">
</fv-DatePicker>
</ClientOnly>
</div>

``` vue
<fv-DatePicker v-model="date" :theme="$theme" :hideYear="true">
</fv-DatePicker>
```

### DatePicker-Full

<div :style="divStyle">
<ClientOnly>
<fv-DatePicker v-model="date" :theme="$theme" :showWeek="true">
</fv-DatePicker>
</ClientOnly>
</div>

``` vue
<fv-DatePicker v-model="date" :theme="$theme" :showWeek="true">
</fv-DatePicker>
```

### DatePicker-Custom

<div :style="divStyle">
<ClientOnly>
<fv-DatePicker 
v-model="date" 
:theme="$theme" 
:showWeek="true" 
class="custom_style" 
innerBorderColor="rgb(0, 204, 153)"
:optionsStyle="{backgroundColor:'rgba(0, 204, 153,0.6)',color:'white',borderColor:'rgba(0, 204, 153,0.6)'}"
:selectStyle="{backgroundColor:'rgb(0, 204, 153)'}"
>
</fv-DatePicker>
</ClientOnly>
</div>

``` vue
<fv-DatePicker 
  v-model="date" 
  :theme="$theme" 
  :showWeek="true" 
  class="custom_style" 
  innerBorderColor="rgb(0, 204, 153)"
  :optionsStyle="{backgroundColor:'rgba(0, 204, 153,0.6)',color:'white',borderColor:'rgba(0, 204, 153,0.6)'}"
  :selectStyle="{backgroundColor:'rgb(0, 204, 153)'}"
>
</fv-DatePicker>

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
```


### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
|  v-model           |     [Date]                               |            No | Date(1970,0,1)                 |       绑定的时间                  |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| months | [Array] | No | ["January","February",...] | 月份显示数组 |
| weeks | [Array] | No | ["Sun.","Mon."...] | 星期显示输出 |
| hideYear | [Boolean] | No | false | 是否隐藏年份 |
| hideMonth | [Boolean] | No | false | 是否隐藏月份 |
| hideDay | [Boolean] | No | false | 是否隐藏天数 |
| showWeek | [Boolean] | No | false | 是否显示星期 |
| optionsStyle | [object] | No | {} | 选项菜单样式 |
| selectStyle | [object] | No | {} | 选项菜单中间选项蒙版样式 |
| disabled | [boolean] | No | false | 是否禁用选项框 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
| focus        |                |  触发焦点时触发 |
  
