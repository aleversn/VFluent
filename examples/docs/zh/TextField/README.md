---
  title: TextField
  sidebarDepth: 2
---
  
[[toc]]

### TextField-DEMO
--- 

<script>
export default {
    data () {
        return {
            readOnlyText: "I am read-only."
        }
    }
}
</script>



<ClientOnly>
<fv-TextField>
</fv-TextField>
</ClientOnly>

```vue
<fv-TextField>
</fv-TextField>
```

Read-only


<ClientOnly>
<fv-TextField v-model="readOnlyText" readonly></fv-TextField>
</ClientOnly>

```vue
<fv-TextField v-model="readOnlyText" readonly></fv-TextField>
```

With placeholder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here."></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here."></fv-TextField>
```

### TextField-Disabled
---
1. Standard


<ClientOnly>
<fv-TextField disabled></fv-TextField>
</ClientOnly>

```vue
<fv-TextField disabled></fv-TextField>
```

2. With placeholder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." disabled></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." disabled></fv-TextField>
```

3. With underline


<ClientOnly>
<fv-TextField underline disabled prefix="Disabled:"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField underline disabled prefix="Disabled:"></fv-TextField>
```

### TextField-With Limit
---

<ClientOnly>
<fv-TextField maxlength="5" style="width: 120px;"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField maxlength="5" style="width: 120px;"></fv-TextField>
```

### TextField-With Underline And Borderless
---

<ClientOnly>
<fv-TextField underline focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField underline focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextField>
```

### TextField-With Status
---
Warn


<ClientOnly>
<fv-TextField placeholder="Warn text." status="warn"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Warn text." status="warn"></fv-TextField>
```

Correct


<ClientOnly>
<fv-TextField placeholder="Correct text." status="correct"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Correct text." status="correct"></fv-TextField>
```

### TextField-RevealBorder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextField>
```

### TextField-Customize
---
Customize border color


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextField>
```

Customize background


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextField>
```

### TextField-Dark Theme
---
<div style="padding: 15px; background: black;">
<ClientOnly>
    <fv-TextField placeholder="Please enter the text here." theme="dark"></fv-TextField>
    <fv-TextField placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextField>
    <fv-TextField underline theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextField>
    <fv-TextField underline disabled theme="dark"></fv-TextField>
</ClientOnly>
</div>

```vue
<fv-TextField placeholder="Please enter the text here." theme="dark"></fv-TextField>
<fv-TextField placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextField>
<fv-TextField underline theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextField>
<fv-TextField underline disabled theme="dark"></fv-TextField>
```



### Propoties
---
|        属性(attr)        |             类型(type)             | 必填(required) | 默认值(default) |               说明(statement)               |
|:------------------------:|:----------------------------------:|:--------------:|:---------------:|:-------------------------------------------:|
|          value           |              String              |       No       |                 |      Using v-model binding input value      |
|       placeholder        |              String              |       No       |       N/A       |               等同HTML[input]               |
|         readonly         |             Boolean              |       No       |      false      |               等同HTML[input]               |
|        maxlength         |              Number              |       No       |       N/A       |               等同HTML[input]               |
|        underline         |             Boolean              |       No       |      false      |      是否开启Underline风格的TextField       |
|        background        |          [string(color)]           |       No       |       N/A       |                                             |
|       borderWidth        |             Boolean              |       No       |       N/A       |                                             |
|       borderColor        |          [string(color)]           |       No       |       N/A       |                                             |
|     focusBorderColor     |          [string(color)]           |       No       |       N/A       |                                             |
|         fontSize         |              Number              |       No       |      13.3       |                                             |
|        fontWeight        |              [string               |    number]     |       No        |                   normal                    |
|        foreground        |          [string(color)]           |       No       |       N/A       |                                             |
|        textAlign         |              String              |       No       |      left       |                                             |
|       borderRadius       |              Number              |       No       |        3        | TextField圆角大小, 启用revealBorder时将失效 |
|       isBoxShadow        |             Boolean              |       No       |      false      |             开启`TextField`阴影             |
|       revealBorder       |             Boolean              |       No       |      false      |                                             |
|          status          |         ['warn','correct']         |       No       |       N/A       |     状态边框预设, 默认有警告和正确两种      |
|         disabled         |             Boolean              |       No       |      false      |                                             |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|   keydown    |     event      |                 |
|    keyup     |     event      |                 |
|    change    |     event      |                 |
|    paste     |     event      |                 |