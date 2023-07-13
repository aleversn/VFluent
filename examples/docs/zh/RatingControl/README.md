---
  title: RatingControl
  sidebarDepth: 2
---
  
[[toc]]

### RatingControl-DEMO
--- 

<fv-RatingControl value="3">
</fv-RatingControl>

```vue
<fv-RatingControl value="3">
</fv-RatingControl>
```

### RatingControl-Half Rate
--- 

<fv-RatingControl value="2.5" :halfRate="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="2.5" :halfRate="true">
</fv-RatingControl>
```

### RatingControl-Clearable
--- 

<fv-RatingControl value="2.5" :halfRate="true" :isClear="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="2.5" :halfRate="true" :isClear="true">
</fv-RatingControl>
```

### RatingControl-Readonly
--- 

<fv-RatingControl value="3.5" :halfRate="true" :isClear="true" readonly>
</fv-RatingControl>

```vue
<fv-RatingControl value="3.5" :halfRate="true" :isClear="true" readonly>
</fv-RatingControl>
```

### RatingControl-Customize
--- 

<fv-RatingControl value="1.5" defaultIcon="Heart" selectedIcon="HeartFill" borderColor="rgba(200, 200, 200, 1)" selectedColor="rgba(173, 38, 45, 1)" :halfRate="true" :isClear="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="1.5" defaultIcon="Heart" selectedIcon="HeartFill" borderColor="rgba(200, 200, 200, 1)" selectedColor="rgba(173, 38, 45, 1)" :halfRate="true" :isClear="true">
</fv-RatingControl>
```

### Propoties
---
|  属性(attr)   |             类型(type)             | 必填(required) |    默认值(default)     | 说明(statement) |
|:-------------:|:----------------------------------:|:--------------:|:----------------------:|:---------------:|
|     value     |               Number               |       No       |           0            |      分值       |
|    maxRate    |               Number               |       No       |           5            |     最大值      |
|   halfRate    |              Boolean               |       No       |         false          |  是否允许半分   |
|  defaultIcon  |               String               |       No       |      FavoriteStar      |    默认图标     |
| selectedIcon  |               String               |       No       |    FavoriteStarFill    |    选中图标     |
|  borderColor  |          [string(color)]           |       No       | rgba(200, 200, 200, 1) |    边框颜色     |
| selectedColor |          [string(color)]           |       No       |  rgba(255, 149, 0, 1)  |    选中颜色     |
|    isClear    |              Boolean               |       No       |         false          |  是否允许清除   |
|   readonly    |              Boolean               |       No       |         false          |      只读       |
|     theme     | ['system','dark','light','custom'] |       No       |        'system'        |     主题色      |



### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    change    |     Number     | 分值改变时触发  |
  
