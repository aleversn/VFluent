---
title: CalendarView CalendarView
sidebarDepth: 2
---

[[toc]]

### CalendarView-DEMO

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

### CalendarView Range Choose

---

<ClientOnly>
<fv-CalendarView multiple="range"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="range"></fv-CalendarView>
```

### CalendarView Dark Theme

---

<ClientOnly>
<fv-CalendarView theme="dark"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark"></fv-CalendarView>
```

### Propoties

---

| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:----------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|   value    |               [date]               |       No       |   CurrentDate   |                        |
|   start    |              [number]              |       No       |      1900       |      Minium Year.      |
|    end     |              [number]              |       No       |      3000       |      Maxium Year.      |
|  multiple  |   ['single','multiple','range']    |       No       |     single      |                        |
|    lan     |            ['en','zh']             |       No       |       en        | CalendarView language. |
|   theme    | ['light','dark','custom','system'] |       No       |     system      |                        |

### Events

---

| 事件名(Name)  | 参数类型(args) |                   说明(statement)                   |
|:-------------:|:--------------:|:---------------------------------------------------:|
|  choose-year  |     string     |                 选择年份后返回年份                  |
| choose-month  |     string     |                 选择月份后返回月份                  |
|  choose-date  |      date      |                 选择日期后返回日期                  |
| choosen-dates |     array      | 选择多个日期后返回日期数组, 类型为[{year,month,no}] |
