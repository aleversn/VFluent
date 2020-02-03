---
  title: RadioGroup RadioGroup
  sidebarDepth: 2
---
  
[[toc]]

<script>
  export default {
    data(){
      return {
        value:"option",
        label:""
      }
    },
    methods:{
      change(value){  
        this.label=value;
      }
    }
  }
</script>

### RadioGroup-DEMO 

<fv-radioGroup v-model="value" label="options:">
<div>
  <fv-radio label="option1">option1</fv-radio>
  <fv-radio label="option2">option2</fv-radio>
</div>
<div>
  <fv-radio label="option3">option3</fv-radio>
</div>
</fv-radioGroup>

### RadioGroup inline 

<fv-radioGroup v-model="value" label="options:" inline theme="dark">
  <fv-radio label="option1">option1</fv-radio>
  <fv-radio label="option2">option2</fv-radio>
</fv-radioGroup>


### Radio Icon
<fv-radio-group v-model="value"  label="options:">
<div>
  <fv-radio label="option1" icon="MSNLogo">option1</fv-radio>
  <fv-radio label="option2" icon="MSNLogo">option2</fv-radio>
  <fv-radio label="option3" icon="MSNLogo">option3</fv-radio>
</div>
</fv-radio-group>


### Radio Icon Dark inline
<fv-radio-group v-model="value"  label="options:" theme="dark" inline @change="change">
  <fv-radio label="option1" icon="MSNLogo">option1</fv-radio>
  <fv-radio label="option2" icon="MSNLogo">option2</fv-radio>
  <fv-radio label="option3" icon="MSNLogo">option3</fv-radio>
</fv-radio-group>

{{label}}

### Radio Icon Dark Disabled
<fv-radio-group v-model="value"  label="options:"  disabled>
<div style="margin:5px 0">
  <fv-radio label="option1" icon="MSNLogo">option1</fv-radio>
  <fv-radio label="option2" icon="MSNLogo">option2</fv-radio>
  <fv-radio label="option3" icon="MSNLogo">option3</fv-radio>
</div>
<div>
  <fv-radio label="option4" icon="MSNLogo">option4</fv-radio>
  <fv-radio label="option5" icon="MSNLogo">option5</fv-radio>
  <fv-radio label="option6" icon="MSNLogo">option6</fv-radio>
</div>
</fv-radio-group>

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |                 说明(statement)                 |
|:----------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------------------:|
| v-model | [object] | No | undefined | 选中值 |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| label | [string] | No | undefined | 标签 |
| disabled | [boolean] | No | false | 是否禁用 |
| inline | [boolean] | No | false | |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement)  |
|:------------:|:--------------:|:----------------:|
| change | event(value,...) | 选项值改变时触发 |

  
