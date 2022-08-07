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

### TimePicker-Default


<ClientOnly>


<ClientOnly>
  <fv-TimePicker style="width:50px" v-model="date"  />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date"  />
```

### TimePicker-24-hours
<ClientOnly>
  <fv-TimePicker v-model="date" :timeType="24" />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date"  :timeType="24" />
```

### TimePicker-Disabled
<ClientOnly>
  <fv-TimePicker v-model="date":timeType="24" :disabled="true" />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date" :timeType="24" :disabled="true" />
```

### TimePicker-Custom-Style

<ClientOnly>
<fv-TimePicker 
v-model="date" 
class="custom_style" 
innerBorderColor="rgb(0, 204, 153)"
hoverColor="rgba(0, 204, 153,0.7)"
:optionsStyle="{backgroundColor:'rgba(0, 204, 153,0.3)',color:'white',borderColor:'rgba(0, 204, 153,0.3)'}"
:selectStyle="{backgroundColor:'rgb(0, 204, 153)'}"
>
</fv-TimePicker>
</ClientOnly>

``` vue
<fv-TimePicker 
v-model="date" 
class="custom_style" 
innerBorderColor="rgb(0, 204, 153)"
hoverColor="rgba(0, 204, 153,0.7)"
:optionsStyle="{backgroundColor:'rgba(0, 204, 153,0.3)',color:'white',borderColor:'rgba(0, 204, 153,0.3)'}"
:selectStyle="{backgroundColor:'rgb(0, 204, 153)'}"
>
</fv-TimePicker>
```


</ClientOnly>


### Propoties
---
|  属性(attr)  |              类型(type)               | 必填(required) | 默认值(default) |     说明(statement)      |
|:------------:|:-------------------------------------:|:--------------:|:---------------:|:------------------------:|
|   v-model    |                                       |       No       |     Date()      |        绑定的时间        |
|   timeType   |                Number                 |       No       |       12        |   时间制（可选12，24）   |
|    period    |                 Array                 |       No       | ['A.M.','P.M.'] |       上午下午显示       |
| optionsStyle |                Object                 |       No       |       {}        |       选项菜单样式       |
| selectStyle  |                Object                 |       No       |       {}        | 选项菜单中间选项蒙版样式 |
|   disabled   |                Boolean                |       No       |      false      |      是否禁用选项框      |
|  hoverColor  |                String                 |       No       |    undefined    |      选项的Hover值       |
|    theme     | ['light', 'dark', 'custom', 'system'] |       No       |     system      |       Custom theme       |


### Events
---
| 事件名(Name) | 参数类型(args) |    说明(statement)     |
|:------------:|:--------------:|:----------------------:|
|    focus     |                |     触发焦点时触发     |
|    change    |                | 当选中的时间发生变化时 |

