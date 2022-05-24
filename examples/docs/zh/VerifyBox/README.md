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

Standard

<fv-VerifyBox v-model="value">
</fv-VerifyBox>

```vue
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
```

<p>{{value}}</p>


With Highlight

<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>

```vue
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
```

Reveal Border

<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>

```vue
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
```


### VerifyBox-Disabled
---
1. Standard

<fv-VerifyBox disabled></fv-VerifyBox>

```vue
<fv-VerifyBox disabled></fv-VerifyBox>
```

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |               说明(statement)               |
|:----------------:|:----------------------------------:|:--------------:|:---------------:|:-------------------------------------------:|
|      value       |              [string]              |       No       |                 |      Using v-model binding input value      |
|      length      |              [number]              |       No       |       N/A       |                 验证码长度                  |
|    underline     |             [boolean]              |       No       |      false      |      是否开启Underline风格的VerifyBox       |
|    background    |          [string(color)]           |       No       |       N/A       |                                             |
|   borderWidth    |             [boolean]              |       No       |       N/A       |                                             |
|   borderColor    |          [string(color)]           |       No       |       N/A       |                                             |
| focusBorderColor |          [string(color)]           |       No       |       N/A       |                                             |
|     fontSize     |              [number]              |       No       |       18        |                                             |
|    fontWeight    |          [string,number]           |       No       |      bold       |                                             |
|    foreground    |          [string(color)]           |       No       |       N/A       |                                             |
|   borderRadius   |              [number]              |       No       |        3        | VerifyBox圆角大小, 启用revealBorder时将失效 |
|   isBoxShadow    |             [boolean]              |       No       |      false      |             开启`VerifyBox`阴影             |
|   revealBorder   |             [boolean]              |       No       |      false      |                                             |
|     disabled     |             [boolean]              |       No       |      false      |                                             |
|      theme       | ['light','dark','custom','system'] |       No       |     system      |                                             |

### Events
---
| 事件名(Name) | 参数类型(args) |  说明(statement)   |
|:------------:|:--------------:|:------------------:|
|   confirm    |     string     | 完成输入并返回结果 |
  
