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

<div style="z-index: 3">
    <fv-CalendarDatePicker v-model="value" style="z-index: 3"></fv-CalendarDatePicker>
</div>

### CalendarDatePicker-Multiple
---

<div style="z-index: 2">
    <fv-CalendarDatePicker v-model="value" multiple="range" style="z-index: 2"></fv-CalendarDatePicker>
</div>

### CalendarDatePicker-Disabled
---

<div style="z-index: 2">
    <fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
</div>

### CalendarDatePicker-Dark Theme
---

<div style="z-index: 1">
    <fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 1"></fv-CalendarDatePicker>
</div>

</ClientOnly>

### Propoties
---
|       属性(attr)       |             类型(type)             | 必填(required) |   默认值(default)   |         说明(statement)          |
|:----------------------:|:----------------------------------:|:--------------:|:-------------------:|:--------------------------------:|
|     value/v-model      |               [date]               |       No       |     CurrentDate     |                                  |
|         start          |              [number]              |       No       |        1900         |           Minium Year.           |
|          end           |              [number]              |       No       |        3000         |           Maxium Year.           |
|      borderWidth       |              [number]              |       No       |          2          | CalendarDatePicker border width  |
|      borderRadius      |              [number]              |       No       |          3          | CalendarDatePicker border radius |
|      placeholder       |              [string]              |       No       |     Pick a day      |  CalendarDatePicker placeholder  |
|    inputForeground     |          [string(color)]           |       No       |         N/A         |                                  |
| dropDownListForeground |          [string(color)]           |       No       | rgba(0,120,215,0.9) |                                  |
|    inputBackground     |          [string(color)]           |       No       |         N/A         |                                  |
| dropDownListBackground |          [string(color)]           |       No       |         N/A         |                                  |
|      dropDownIcon      |              [string]              |       No       |     CalendarDay     |      Icon with Fabric-Icon       |
| dropDownIconForeground |          [string(color)]           |       No       |         N/A         |                                  |
|        disabled        |             [boolean]              |       No       |        false        |                                  |
|        multiple        |   ['single','multiple','range']    |       No       |       single        |                                  |
|          lan           |            ['en','zh']             |       No       |         en          |   CalendarDatePicker language.   |
|         theme          | ['light','dark','custom','system'] |       No       |       system        |                                  |

### Events
---
| 事件名(Name)  | 参数类型(args) |         说明(statement)         |
|:-------------:|:--------------:|:-------------------------------:|
| choosen-dates |     array      | 返回[{year,month,no}]类型的数组 |
  
