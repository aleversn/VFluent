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

<div style="z-index: 5">

<ClientOnly>
<fv-CalendarDatePicker v-model="value" style="z-index: 5"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" style="z-index: 5"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Multiple

---

<div style="z-index: 3">
<ClientOnly>
<fv-CalendarDatePicker v-model="value" multiple="range" style="z-index: 3"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" style="z-index: 3"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Disabled

---

<div style="z-index: 2">
<ClientOnly>
<fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Dark Theme

---

<div style="z-index: 1">
<ClientOnly>
<fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
</ClientOnly>

</div>

```vue
<fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
```

### Propoties

---
|   属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |            说明(statement)             |
|:---------------:|:----------------------------------:|:--------------:|:---------------:|:--------------------------------------:|
|  value/v-model  |               [date]               |       No       |   CurrentDate   |                                        |
|      start      |              Number              |       No       |      1900       | 最小年份, 尽量不要设置过小防止性能消耗 |
|       end       |              Number              |       No       |      3000       | 最大年份, 尽量不要设置过大防止性能消耗 |
|   borderWidth   |              Number              |       No       |        2        |    CalendarDatePicker border width     |
|  borderRadius   |              Number              |       No       |        3        |    CalendarDatePicker border radius    |
|   placeholder   |              String              |       No       |   Pick a day    |     CalendarDatePicker placeholder     |
| inputForeground |          [string(color)]           |       No       |       N/A       |            输入框文字前景色            |
| inputBackground |          [string(color)]           |       No       |       N/A       |              输入框背景色              |
|  dropDownIcon   |              String              |       No       |   CalendarDay   |         Icon with Fabric-Icon          |
|    disabled     |             Boolean              |       No       |      false      |                                        |
|    multiple     |   ['single', 'multiple', 'range']    |       No       |     single      |  多选模式, 有单选、多选和范围日期选择  |
|       lan       |            ['en', 'zh']             |       No       |       en        |      CalendarDatePicker language.      |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---
| 事件名(Name)  | 参数类型(args) |         说明(statement)         |
|:-------------:|:--------------:|:-------------------------------:|
| choosen-dates |     array      | 返回[{year, month, no}]类型的数组 |
  
