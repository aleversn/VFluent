---
  title: TextBox
  sidebarDepth: 2
---
  
[[toc]]

### TextBox-DEMO
---

<script>
export default {
    data () {
        return {
            readOnlyText: "I am read-only.",
            maskValue: ""
        }
    }
}
</script>

Standard

<ClientOnly>
<fv-TextBox></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox></fv-TextBox>
```

Read-only

<ClientOnly>
<fv-TextBox v-model="readOnlyText" readonly></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox v-model="readOnlyText" readonly></fv-TextBox>
```

With placeholder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here."></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here."></fv-TextBox>
```

With an icon

<ClientOnly>
<fv-TextBox icon="Search"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox icon="Search"></fv-TextBox>
```

With type

<ClientOnly>
<fv-TextBox icon="RevealPasswordMedium" type="password"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox icon="RevealPasswordMedium" type="password"></fv-TextBox>
```

With pattern

<ClientOnly>
<fv-TextBox pattern="[a-zA-Z]"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox pattern="[a-zA-Z]"></fv-TextBox>
```

### TextBox-With Input Mask
---
Standard

<ClientOnly>
<fv-TextBox mode="mask"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox mode="mask"></fv-TextBox>
```

Customize

<ClientOnly>
<fv-TextBox v-model="maskValue" mode="mask" mask="Tel: +__ ___ - ____ - ____" flag="_"></fv-TextBox>
</ClientOnly>
<p>{{maskValue}}</p>

```vue
<fv-TextBox v-model="maskValue" mode="mask" mask="Tel: +__ ___ - ____ - ____" flag="_"></fv-TextBox>
<p>{{maskValue}}</p>
```

Customize Flag

<ClientOnly>
<fv-TextBox v-model="maskValue" mode="mask" mask="mask: xx-xxx-xxxx-xxxx" flag="x"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox v-model="maskValue" mode="mask" mask="mask: xx-xxx-xxxx-xxxx" flag="x"></fv-TextBox>
```

### TextBox-Disabled
---
1. Standard

<ClientOnly>
<fv-TextBox disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox disabled></fv-TextBox>
```

2. With Input Mask

<ClientOnly>
<fv-TextBox mode="mask" disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox mode="mask" disabled></fv-TextBox>
```

3. With placeholder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." disabled></fv-TextBox>
```

4. With underline

<ClientOnly>
<fv-TextBox underline disabled prefix="Disabled:"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox underline disabled prefix="Disabled:"></fv-TextBox>
```

### TextBox-With Limit
---

<ClientOnly>
<fv-TextBox maxlength="5" style="width: 120px;"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox maxlength="5" style="width: 120px;"></fv-TextBox>
```

### TextBox-With Underline And Borderless
---

<ClientOnly>
<fv-TextBox underline prefix="Standard:" focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox underline prefix="Standard:" focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextBox>
```

### TextBox-With Prefix/Suffix
---
Prefix

<ClientOnly>
<fv-TextBox prefix="https://"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox prefix="https://"></fv-TextBox>
```

Suffix

<ClientOnly>
<fv-TextBox suffix=".com"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox suffix=".com"></fv-TextBox>
```

Prefix and Suffix

<ClientOnly>
<fv-TextBox prefix="https://" suffix=".com"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox prefix="https://" suffix=".com"></fv-TextBox>
```

### TextBox-With Status
---
Warn

<ClientOnly>
<fv-TextBox placeholder="Warn text." status="warn"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Warn text." status="warn"></fv-TextBox>
```

Correct

<ClientOnly>
<fv-TextBox placeholder="Correct text." status="correct"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Correct text." status="correct"></fv-TextBox>
```

### TextBox-RevealBorder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextBox>
```

### TextBox-Customize
---
Customize border color

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextBox>
```

Customize background

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextBox>
```

### TextBox-Dark Theme
---
<div style="padding: 15px; background: black;">
</ClientOnly>
<fv-TextBox placeholder="Please enter the text here." theme="dark"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" theme="dark"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" disabled theme="dark"></fv-TextBox>
<fv-TextBox underline prefix="Standard:" theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextBox>
<fv-TextBox underline prefix="Standard:" disabled theme="dark"></fv-TextBox>
</ClientOnly>
</div>

```vue
<div style="padding: 15px; background: black;">
    <fv-TextBox placeholder="Please enter the text here." theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" disabled theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" disabled theme="dark"></fv-TextBox>
</div>
```


### Propoties
---
|      属性(attr)       |     类型(type)     | 必填(required) | 默认值(default) |                            说明(statement)                            |
|:---------------------:|:------------------:|:--------------:|:---------------:|:---------------------------------------------------------------------:|
|         value         |       String       |       No       |                 |                   Using v-model binding input value                   |
|         mode          | ['default','mask'] |       No       |     default     |                          Choose TextBox mode                          |
|       inputmode       |       String       |       No       |       N/A       | 输入模式, 可选值为`numeric`, `tel`, `text`, `decimal`, `email`, `url` |
|      placeholder      |       String       |       No       |       N/A       |                            等同HTML[input]                            |
|         type          |       String       |       No       |      text       |                            等同HTML[input]                            |
|         mask          |       String       |       No       |    mask:___     |                     The mask mode input template                      |
|         flag          |       String       |       No       |        _        |                       The mask mode input flag                        |
|        pattern        |       String       |       No       |     [\S\s]*     |                  The pattern for limiting input char                  |
|       readonly        |      Boolean       |       No       |      false      |                            等同HTML[input]                            |
|       maxlength       |       Number       |       No       |       N/A       |                            等同HTML[input]                            |
|        prefix         |       String       |       No       |       N/A       |                                 前缀                                  |
|        suffix         |       String       |       No       |       N/A       |                                 后缀                                  |
|       leftIcon        |       String       |       No       |       N/A       |                                左图标                                 |
|         icon          |       String       |       No       |       N/A       |                                右图标                                 |
|       underline       |      Boolean       |       No       |      false      |                    是否开启Underline风格的TextBox                     |
|      background       |  [string(color)]   |       No       |       N/A       |                                                                       |
|      borderWidth      |      Boolean       |       No       |       N/A       |                                                                       |
|      borderColor      |  [string(color)]   |       No       |       N/A       |                                                                       |
|   focusBorderColor    |  [string(color)]   |       No       |       N/A       |                                                                       |
|   revealBorderColor   |  [string(color)]   |       No       |       N/A       |                                                                       |
| revealBackgroundColor |  [string(color)]   |       No       |       N/A       |                                                                       |
|       fontSize        |       Number       |       No       |      13.3       |                                                                       |
|      fontWeight       |  [string,number]   |       No       |     normal      |                                                                       |
|      foreground       |  [string(color)]   |       No       |       N/A       |                                                                       |
|       textAlign       |       String       |       No       |      left       |                                                                       |
|     borderRadius      |       Number       |       No       |        3        |               Textbox圆角大小, 启用revealBorder时将失效               |
|      isBoxShadow      |      Boolean       |       No       |      false      |                           开启`TextBox`阴影                           |
|     revealBorder      |      Boolean       |       No       |      false      |                                                                       |
|        status         | ['warn','correct'] |       No       |       N/A       |                  状态边框预设, 默认有警告和正确两种                   |
|     debounceDelay     |       Number       |       No       |       300       |                           搜索节流延迟时间                            |
|       disabled        |      Boolean       |       No       |      false      |                                                                       |
|         theme         |       String       |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式       |

### Events
---
|  事件名(Name)   | 参数类型(args) | 说明(statement)  |
|:---------------:|:--------------:|:----------------:|
|     keydown     |     event      |                  |
|      keyup      |     event      |                  |
|     change      |     event      |                  |
|      paste      |     event      |                  |
| left-icon-click |     event      |                  |
|   icon-click    |     event      |                  |
| debounce-input  |     string     | 搜索节流内容反馈 |