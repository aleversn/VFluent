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

### TimePicker-24-hours
<div :style="divStyle">
<ClientOnly>
  <fv-TimePicker v-model="date" :theme="$theme" :timeType="24" />
</ClientOnly>
</div>

``` vue
<fv-TimePicker v-model="date" :theme="$theme" :timeType="24" />
```

### TimePicker-Disabled
<div :style="divStyle">
<ClientOnly>
  <fv-TimePicker v-model="date" :theme="$theme" :timeType="24" :disabled="true" />
</ClientOnly>
</div>

``` vue
<fv-TimePicker v-model="date" :theme="$theme" :timeType="24" :disabled="true" />
```

### TimePicker-Custom-Style

<div :style="divStyle">
<ClientOnly>
<fv-TimePicker 
v-model="date" 
:theme="$theme" 
class="custom_style" 
innerBorderColor="rgb(0, 204, 153)"
:optionsStyle="{backgroundColor:'rgba(0, 204, 153,0.6)',color:'white',borderColor:'rgba(0, 204, 153,0.6)'}"
:selectStyle="{backgroundColor:'rgb(0, 204, 153)'}"
>
</fv-TimePicker>
</ClientOnly>
</div>

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
|  v-model           |                                    |            No | Date()                 |       绑定的时间                  |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| timeType | [Number] | No | 12 | 时间制（可选12，24） |
| period | [Array] | No | ['A.M.','P.M.'] | 上午下午显示 |
| optionsStyle | [object] | No | {} | 选项菜单样式 |
| selectStyle | [object] | No | {} | 选项菜单中间选项蒙版样式 |
| disabled | [boolean] | No | false | 是否禁用选项框 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
| focus        |                |  触发焦点时触发 |
