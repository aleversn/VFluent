---
  title: Radio Radio
  sidebarDepth: 2
---

<script>
  export default {
    data(){
      return {
        value:"Option"
      }
    },
    methods:{
      active(){
        ++this.status;
      }
    }
  }
</script>
  
[[toc]]

### Radio

<div>
<fv-radio v-model="value" label="Option">
Option
</fv-radio> 
<fv-radio v-model="value" label="Option2">
Option2
</fv-radio>
<fv-radio label="Option3" disabled>
Disabled
</fv-radio>
</div>

```vue
<div>
<fv-radio v-model="value" label="Option">
Option
</fv-radio> 
<fv-radio v-model="value" label="Option2">
Option2
</fv-radio>
<fv-radio label="Option3" disabled>
Disabled
</fv-radio>
</div>
```

### Radio-Dark

<div style="background:#000;height:30px;padding:20px;">
<fv-radio v-model="value" label="Option" theme="dark">Option</fv-radio>
<fv-radio v-model="value" label="Option2" theme="dark" disabled>Disabled</fv-radio>
</div>

```vue
<div style="background:#000;height:30px;padding:20px;">
<fv-radio v-model="value" label="Option" theme="dark">Option</fv-radio>
<fv-radio v-model="value" label="Option2" theme="dark" disabled>Disabled</fv-radio>
</div>
```

### Radio With Icon

<div >
<fv-radio v-model="value" label="Sort" icon="GroupedList">Sort</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" >MSN</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" disabled >Disabled</fv-radio>

</div>

```vue
<div >
<fv-radio v-model="value" label="Sort" icon="GroupedList">Sort</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" >MSN</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" disabled >Disabled</fv-radio>

</div>
```

### Radio With Image

<div>
<fv-radio image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png" activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png" v-model="value" label="chart" >Chart</fv-radio>
</div>

```vue
<div>
<fv-radio image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png" activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png" v-model="value" label="chart" >Chart</fv-radio>
</div>
```

### Radio-Dark With Icon

<div style="background:#000;padding:20px;">
<fv-radio v-model="value" label="Sort" icon="GroupedList" theme="dark">Sort</fv-radio>
<fv-radio v-model="value" label="Sort" icon="GroupedList" theme="dark" disabled>disabled</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" theme="dark">MSN</fv-radio>
</div>

```vue
<div style="background:#000;padding:20px;">
<fv-radio v-model="value" label="Sort" icon="GroupedList" theme="dark">Sort</fv-radio>
<fv-radio v-model="value" label="Sort" icon="GroupedList" theme="dark" disabled>disabled</fv-radio>
<fv-radio v-model="value" label="MSN" icon="MSNLogo" theme="dark">MSN</fv-radio>
</div>
```

### Radio Custom Color
<fv-radio  icon="GroupedList" v-model="value" label="Sort" style="background:#00cc99;" theme="dark" >Sort</fv-radio>
<fv-radio icon="GroupedList" v-model="value" label="Sort" style="background:#00cc99;" theme="dark" disabled>Disabled</fv-radio>

```vue
<fv-radio  icon="GroupedList" v-model="value" label="Sort" style="background:#00cc99;" theme="dark" >Sort</fv-radio>
<fv-radio icon="GroupedList" v-model="value" label="Sort" style="background:#00cc99;" theme="dark" disabled>Disabled</fv-radio>
```


### Propoties
---
|      属性(attr)       |             类型(type)             | 必填(required) |     默认值(default)      |    说明(statement)     |
|:---------------------:|:----------------------------------:|:--------------:|:------------------------:|:----------------------:|
|     v-model/value     |              [object]              |      Yes       |        undefined         |         选项值         |
|         label         |              [object]              |      Yes       |        undefined         |         选项值         |
|         theme         | ['system','dark','light','custom'] |       No       |         'system'         |         主题色         |
|         icon          |              [string]              |       No       |           null           |        MS-ICON         |
|         color         |          [string(color)]           |       No       |           null           |    文字和图标前景色    |
|      foreground       |          [string(color)]           |       No       | rgba(0, 120, 212, 0.829) |      Radio前景色       |
| iconBlockBorderRadius |          [string(color)]           |       No       |            3             |   带图标样式圆角大小   |
| iconBlockBorderWidth  |          [string(color)]           |       No       |            2             |   带图标样式边框大小   |
|         image         |              [string]              |       No       |           null           |     32*32 图像链接     |
|      activeImage      |              [string]              |       No       |           null           | 32*32 选中时的图像链接 |
|       disabled        |             [boolean]              |       No       |          false           |        是否禁用        |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    click     |     event      |      点击       |
|   actived    |     event      |   选中时触发    |

  
