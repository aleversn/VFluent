/** 
 * @param ComponentName
 * @param chineseName
 * @param prefix
 */

module.exports=`---
  title: {{chineseName}} {{ComponentName}}
  sidebarDepth: 2
---
  
[[toc]]

### {{chineseName}}-DEMO 

<{{prefix}}-{{componentname}}>
</{{prefix}}-{{componentname}}>

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
  `