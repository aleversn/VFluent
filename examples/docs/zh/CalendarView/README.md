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

### CalendarView Multiple Choose

---

<fv-CalendarView multiple="multiple" lan="zh"></fv-CalendarView>

### CalendarView Range Choose

---

<fv-CalendarView multiple="range"></fv-CalendarView>

### CalendarView Dark Theme

---

<fv-CalendarView theme="dark"></fv-CalendarView>
</ClientOnly>

### Propoties

---

| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
| :--------: | :--------------------------------: | :------------: | :-------------: | :--------------------: |
|   value    |               [date]               |       No       |   CurrentDate   |                        |
|   start    |              [number]              |       No       |      1900       |      Minium Year.      |
|    end     |              [number]              |       No       |      3000       |      Maxium Year.      |
|  multiple  |   ['single','multiple','range']    |       No       |     single      |                        |
|    lan     |            ['en','zh']             |       No       |       en        | CalendarView language. |
|   theme    | ['light','dark','custom','system'] |       No       |     system      |                        |

### Events

---

| 事件名(Name)  | 参数类型(args) | 说明(statement) |
| :-----------: | :------------: | :-------------: |
|    choose     |      date      |                 |
|  choose-year  |      date      |                 |
| choose-month  |      date      |                 |
|  choose-date  |      date      |                 |
| choosen-dates |      date      |                 |
