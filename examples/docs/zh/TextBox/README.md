---
  title: TextBox TextBox
  sidebarDepth: 2
---
  
[[toc]]

### TextBox-DEMO

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
<fv-TextBox></fv-TextBox>

Read-only
<fv-TextBox v-model="readOnlyText" readonly></fv-TextBox>

With placeholder
<fv-TextBox placeholder="Please enter the text here."></fv-TextBox>

With an icon
<fv-TextBox icon="Search"></fv-TextBox>

### TextBox-With Input Mask
---
Standard
<fv-TextBox mode="mask"></fv-TextBox>

Customize
<fv-TextBox v-model="maskValue" mode="mask" mask="Tel: +__ ___ - ____ - ____" flag="_"></fv-TextBox>
<p>{{maskValue}}</p>

Customize Flag
<fv-TextBox v-model="maskValue" mode="mask" mask="mask: xx-xxx-xxxx-xxxx" flag="x"></fv-TextBox>

### TextBox-Disabled
---
1. Standard
<fv-TextBox disabled></fv-TextBox>

2. With Input Mask
<fv-TextBox mode="mask" disabled></fv-TextBox>

3. With placeholder
<fv-TextBox placeholder="Please enter the text here." disabled></fv-TextBox>

4. With underline
<fv-TextBox underline disabled prefix="Disabled:"></fv-TextBox>

### TextBox-With Limit
---
<fv-TextBox maxlength="5" style="width: 120px;"></fv-TextBox>

### TextBox-With Underline And Borderless
---
<fv-TextBox underline prefix="Standard:"></fv-TextBox>

### TextBox-With Prefix/Suffix
---
Prefix
<fv-TextBox prefix="https://"></fv-TextBox>

Suffix
<fv-TextBox suffix=".com"></fv-TextBox>

Prefix and Suffix
<fv-TextBox prefix="https://" suffix=".com"></fv-TextBox>

### TextBox-With Status
---
Warn
<fv-TextBox placeholder="Warn text." status="warn"></fv-TextBox>

Correct
<fv-TextBox placeholder="Correct text." status="correct"></fv-TextBox>

### TextBox-Customize
---
Customize border color
<fv-TextBox placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextBox>

Customize background
<fv-TextBox placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextBox>

### TextBox-Dark Theme
---
<div style="padding: 15px; background: black;">
    <fv-TextBox placeholder="Please enter the text here." theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" disabled theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" disabled theme="dark"></fv-TextBox>
</div>

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |           说明(statement)           |
|:----------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------:|
|      value       |              [string]              |       No       |                 |  Using v-model binding input value  |
|       mode       |         ['default','mask']         |       No       |     default     |         Choose TextBox mode         |
|   placeholder    |              [string]              |       No       |       N/A       |                                     |
|       type       |              [string]              |       No       |      text       |                                     |
|       mask       |              [string]              |       No       |    mask:___     |    The mask mode input template     |
|       flag       |              [string]              |       No       |        _        |      The mask mode input flag       |
|     pattern      |              [string]              |       No       |     [\S\s]*     | The pattern for limiting input char |
|     readonly     |             [boolean]              |       No       |      false      |                                     |
|    maxlength     |              [number]              |       No       |       N/A       |                                     |
|      prefix      |              [string]              |       No       |       N/A       |                                     |
|      suffix      |              [string]              |       No       |       N/A       |                                     |
|     leftIcon     |              [string]              |       No       |       N/A       |                                     |
|       icon       |              [string]              |       No       |       N/A       |                                     |
|    underline     |             [boolean]              |       No       |      false      |                                     |
|    background    |          [string(color)]           |       No       |       N/A       |                                     |
|   borderWidth    |             [boolean]              |       No       |       N/A       |                                     |
|   borderColor    |          [string(color)]           |       No       |       N/A       |                                     |
| focusBorderColor |          [string(color)]           |       No       |       N/A       |                                     |
|      status      |              [string]              |       No       |       N/A       |                                     |
|     disabled     |             [boolean]              |       No       |      false      |                                     |
|      theme       | ['light','dark','custom','system'] |       No       |     system      |                                     |

### Events
---
|  事件名(Name)   | 参数类型(args) | 说明(statement) |
|:---------------:|:--------------:|:---------------:|
|     keydown     |     event      |                 |
|      keyup      |     event      |                 |
| left-icon-click |     event      |                 |
|   icon-click    |     event      |                 |