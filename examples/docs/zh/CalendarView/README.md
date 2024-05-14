---
title: CalendarView
sidebarDepth: 2
---

[[toc]]

### CalendarView-DEMO
---

<script>
export default {
    data () {
        return {
            value: new Date(),
            currentChoosen: []
        }
    },
    mounted () {
        this.value.setFullYear(2019);
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        for (let i = 0; i < 10; i++) {
            this.currentChoosen.push({
                year: year,
                month: month,
                no: day + i
            });
        }
    }
}
</script>

---

<ClientOnly>
<fv-CalendarView>
</fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView></fv-CalendarView>
```

### CalendarView Multiple Choose

---

<ClientOnly>
<fv-CalendarView multiple="multiple" lan="zh"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="multiple" lan="zh"></fv-CalendarView>
```

### CalendarView Init Day

---

<ClientOnly>
<fv-CalendarView :value="value" multiple="multiple" lan="zh"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView :value="value" multiple="multiple" lan="zh"></fv-CalendarView>
```

### CalendarView Range Choose

---

<ClientOnly>
<fv-CalendarView multiple="range" :choosenDates="currentChoosen"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="range" :choosenDates="currentChoosen"></fv-CalendarView>
```

```javascript
export default {
    data () {
        return {
            currentChoosen: []
        }
    },
    mounted () {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        for (let i = 0; i < 10; i++) {
            this.currentChoosen.push({
                year: year,
                month: month,
                no: day + i
            });
        }
    }
}
```

### CalendarView Dark Theme

---

<ClientOnly>
<fv-CalendarView theme="dark"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark"></fv-CalendarView>
```

### CalendarView Custom Theme

---

Custom Selected Color

<ClientOnly>
<fv-CalendarView theme="dark" foreground="rgba(0, 204, 153, 1)"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark" foreground="rgba(0, 204, 153, 1)"></fv-CalendarView>
```

### Propoties

---

|  属性(attr)  |          类型(type)           | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:------------:|:-----------------------------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|    value     |            [date]             |       No       |   CurrentDate   |                                                           |
|    start     |            Number             |       No       |      1900       |                       Minium Year.                        |
|     end      |            Number             |       No       |      3000       |                       Maxium Year.                        |
|   multiple   | ['single','multiple','range'] |       No       |     single      |                                                           |
|     lan      |          ['en','zh']          |       No       |       en        |                  CalendarView language.                   |
| choosenDates |             Array             |       No       |       []        |                 CalendarView初始选中日期                  |
|  foreground  |        [string(color)]        |       No       |       N/A       |                  CalendarView主题前景色                   |
|    theme     |            String             |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events

---

|   事件名(Name)    | 参数类型(args) |                   说明(statement)                   |
|:-----------------:|:--------------:|:---------------------------------------------------:|
|    choose-year    |     string     |                 选择年份后返回年份                  |
|   choose-month    |     string     |                 选择月份后返回月份                  |
|    choose-date    |      date      |                 选择日期后返回日期                  |
|   choosen-dates   |     array      | 选择多个日期后返回日期数组, 类型为[{year,month,no}] |
| choosen-dates-obj |     array      |                返回[Date]类型的数组                 |

### Slot
---
1. Statement

`CalendarView`的显式栏描述内容
- value: 原文描述内容
- dayRange: 当前日期数据对象

```vue
<template v-slot:statement="x">
    <p></p>
</template>
```

2. Weekday Content

日期上方星期栏描述内容
- value: 默认星期描述内容

```vue
<template v-slot:weekday_content>
    <p></p>
</template>
```

### Appendix

---

1. 重置日期视图

```javascript
this.$refs.calendarView.resetDate();
```