---
  title: CalendarDatePicker CalendarDatePicker
  sidebarDepth: 2
---
  
[[toc]]

### CalendarDatePicker-DEMO

<script>
export default {
    data () {
        return {
            value: new Date()
        }
    }
}
</script>

<ClientOnly>

<div style="z-index: 5">
    <fv-CalendarDatePicker v-model="value" style="z-index: 5"></fv-CalendarDatePicker>
</div>

```vue
<fv-CalendarDatePicker v-model="value" style="z-index: 5"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Multiple
---

<div style="z-index: 3">
    <fv-CalendarDatePicker v-model="value" multiple="range" style="z-index: 3"></fv-CalendarDatePicker>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" style="z-index: 3"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Disabled
---

<div style="z-index: 2">
    <fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Dark Theme
---

<div style="z-index: 1">
    <fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
</div>

```vue
<fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
```

</ClientOnly>

### Propoties
---
|   属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |            说明(statement)             |
|:---------------:|:----------------------------------:|:--------------:|:---------------:|:--------------------------------------:|
|  value/v-model  |               [date]               |       No       |   CurrentDate   |                                        |
|      start      |              [number]              |       No       |      1900       | 最小年份, 尽量不要设置过小防止性能消耗 |
|       end       |              [number]              |       No       |      3000       | 最大年份, 尽量不要设置过大防止性能消耗 |
|   borderWidth   |              [number]              |       No       |        2        |    CalendarDatePicker border width     |
|  borderRadius   |              [number]              |       No       |        3        |    CalendarDatePicker border radius    |
|   placeholder   |              [string]              |       No       |   Pick a day    |     CalendarDatePicker placeholder     |
| inputForeground |          [string(color)]           |       No       |       N/A       |            输入框文字前景色            |
| inputBackground |          [string(color)]           |       No       |       N/A       |              输入框背景色              |
|  dropDownIcon   |              [string]              |       No       |   CalendarDay   |         Icon with Fabric-Icon          |
|    disabled     |             [boolean]              |       No       |      false      |                                        |
|    multiple     |   ['single','multiple','range']    |       No       |     single      |  多选模式, 有单选、多选和范围日期选择  |
|       lan       |            ['en','zh']             |       No       |       en        |      CalendarDatePicker language.      |
|      theme      | ['light','dark','custom','system'] |       No       |     system      |                                        |

### Events
---
| 事件名(Name)  | 参数类型(args) |         说明(statement)         |
|:-------------:|:--------------:|:-------------------------------:|
| choosen-dates |     array      | 返回[{year,month,no}]类型的数组 |
  
