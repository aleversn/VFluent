---
  title: VerifyBox VerifyBox
  sidebarDepth: 2
---
  
[[toc]]

### VerifyBox-DEMO 

<script>
export default {
    data () {
        return {
            value: ""
        }
    }
}
</script>


<ClientOnly>


Standard


<ClientOnly>
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
```

<p>{{value}}</p>


With Highlight


<ClientOnly>
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
```

Reveal Border


<ClientOnly>
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
```


### VerifyBox-Disabled
---
1. Standard


<ClientOnly>
<fv-VerifyBox disabled></fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox disabled></fv-VerifyBox>
```


</ClientOnly>


### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |               说明(statement)               |
|:----------------:|:----------------------------------:|:--------------:|:---------------:|:-------------------------------------------:|
|      value       |              String              |       No       |                 |      Using v-model binding input value      |
|      length      |              Number              |       No       |       N/A       |                 验证码长度                  |
|    underline     |             Boolean              |       No       |      false      |      是否开启Underline风格的VerifyBox       |
|    background    |          [string(color)]           |       No       |       N/A       |                                             |
|   borderWidth    |             Boolean              |       No       |       N/A       |                                             |
|   borderColor    |          [string(color)]           |       No       |       N/A       |                                             |
| focusBorderColor |          [string(color)]           |       No       |       N/A       |                                             |
|     fontSize     |              Number              |       No       |       18        |                                             |
|    fontWeight    |          [string,number]           |       No       |      bold       |                                             |
|    foreground    |          [string(color)]           |       No       |       N/A       |                                             |
|   borderRadius   |              Number              |       No       |        3        | VerifyBox圆角大小, 启用revealBorder时将失效 |
|   isBoxShadow    |             Boolean              |       No       |      false      |             开启`VerifyBox`阴影             |
|   revealBorder   |             Boolean              |       No       |      false      |                                             |
|     disabled     |             Boolean              |       No       |      false      |                                             |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events
---
| 事件名(Name) | 参数类型(args) |  说明(statement)   |
|:------------:|:--------------:|:------------------:|
|   confirm    |     string     | 完成输入并返回结果 |
  
