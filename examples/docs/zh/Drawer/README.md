---
  title: Drawer Drawer
  sidebarDepth: 2
---
  
[[toc]]

<script>
  export default {
    data(){
      return {
        visible:true,
        theme:0
      }
    },
    methods:{
      toggle(){
        this.visible^=true;
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

### Drawer

<div :style="divStyle">
THEME:<fv-toggle-switch v-model="theme" :on="$theme" :off="$theme" :theme="$theme"/>
</div>

<fv-button @click="toggle" :theme="$theme">Show/Hide</fv-button>

<fv-drawer :visible.sync="visible" :theme="$theme">
</fv-drawer>

``` vue
<fv-drawer :visible.sync="visible" :theme="$theme">
</fv-drawer>
```

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| visible | [boolean] | No | false | 是否可视 |
| length | [number|string] | No | 300 | 抽屉长度 |
| focusTrap | [boolen] | No | false | 是否聚焦 |
| disabled | [boolean] | No | false | 是否禁用选项框 |
| position | ['bottom','left','top','right'] | No | 'bottom' | 位置 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|              |                |                 |
  
