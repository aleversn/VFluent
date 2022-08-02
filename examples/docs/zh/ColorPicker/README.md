---
  title: ColorPicker ColorPicker
  sidebarDepth: 2
---

<script>
export default {
  data(){
    return{
      value:"#ffffff"
    }
  }
}
</script>
  
[[toc]]

#### ColorPicker Default




<ClientOnly>
<fv-colorPicker v-model="value">
</fv-colorPicker>
</ClientOnly>

```vue
<fv-colorPicker v-model="value">
</fv-colorPicker>
```

{{value}}

#### ColorPicker Simplest


<ClientOnly>
<fv-color-picker v-model="value" hideAlpha hidePreview>
</fv-color-picker>
</ClientOnly>

```vue
<fv-color-picker v-model="value" hideAlpha hidePreview>
</fv-color-picker>
```



### Propoties
---
|  属性(attr)   | 类型(type) | 必填(required) | 默认值(default) |  说明(statement)   |
|:-------------:|:----------:|:--------------:|:---------------:|:------------------:|
| v-model/value |  [string]  |       No       |      #fff       |      颜色HEX       |
|     alpha     |  [number]  |       No       |        1        |       透明度       |
|   hideAlpha   | [boolean]  |       No       |      false      | 是否隐藏透明度调节 |
|  hidePreview  | [boolean]  |       No       |      false      |   是否隐藏预览框   |



  
