---
  title: RadioGroup
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
--- 


<ClientOnly>
<fv-radioGroup v-model="value" label="Options:">
<div class="row-block">
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option3">Option3</fv-radio>
</div>
</fv-radioGroup>
</ClientOnly>

```vue
<fv-radioGroup v-model="value" label="Options:">
<div class="row-block">
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option3">Option3</fv-radio>
</div>
</fv-radioGroup>
```

### RadioGroup inline 

---

<ClientOnly>
<fv-radioGroup v-model="value" label="Options:" inline>
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</fv-radioGroup>
</ClientOnly>

```vue
<fv-radioGroup v-model="value" label="Options:" inline>
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</fv-radioGroup>
```


### Radio Icon

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:">
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:">
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
</fv-radio-group>
```


### Radio Icon Dark inline

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:" theme="dark" inline @change="change">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:" theme="dark" inline @change="change">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</fv-radio-group>
```

{{label}}

### Radio Icon Dark Disabled

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:"  disabled>
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option4" icon="QuickNote">Option4</fv-radio>
  <fv-radio label="option5" icon="QuickNote">Option5</fv-radio>
  <fv-radio label="option6" icon="QuickNote">Option6</fv-radio>
</div>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:"  disabled>
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option4" icon="QuickNote">Option4</fv-radio>
  <fv-radio label="option5" icon="QuickNote">Option5</fv-radio>
  <fv-radio label="option6" icon="QuickNote">Option6</fv-radio>
</div>
</fv-radio-group>
```

### Propoties
---

| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) | 说明(statement) |
|:----------:|:----------------------------------:|:--------------:|:---------------:|:---------------:|
|  v-model   |               Object               |       No       |    undefined    |     选中值      |
|   theme    | ['system','dark','light','custom'] |       No       |    'system'     |     主题色      |
|   label    |               String               |       No       |    undefined    |      标签       |
|  disabled  |              Boolean               |       No       |      false      |    是否禁用     |
|   inline   |              Boolean               |       No       |      false      |                 |

### Events
---
| 事件名(Name) |  参数类型(args)  | 说明(statement)  |
|:------------:|:----------------:|:----------------:|
|    change    | event(value,...) | 选项值改变时触发 |

  
