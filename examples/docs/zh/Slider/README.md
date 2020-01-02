---
  title: Slider 滑杆
  sidebarDepth: 2
---
  
[[toc]]

<script>
  export default {
    data(){
      return {
        value:50,
        changeTime:0,
        clickTime:0
      }
    },
    methods:{
      change(){
        this.changeTime++;
      },
      click(){
        this.clickTime++;
      }
    }
  }
</script>

### Slider-Light
   
<fv-slider theme="light">
</fv-slider>

### Slider-Dark

<fv-slider theme="dark">
</fv-slider>

### Slider-With-Tick-Mark

<fv-slider :scale="20" :unit="2">
</fv-slider>

### Slider-With-Label

<fv-slider :scale="20" :showLabel="true" :unit="20">
<template slot-scope="prop" >
  <span>{{prop.value}}</span>
</template>
</fv-slider>

### Slider-With-Vertical

<fv-slider v-model="value" :unit="20" :vertical="true" @change="change" @click="click">
</fv-slider>
Slider: {{value}}%  Change: {{changeTime}} Click: {{clickTime}}


### Silder-Disabled
<fv-slider disabled>
</fv-slider>   

### Silder-Custom-Style
<fv-slider v-model="value" style="width:150px;" showLabel color="#2ed573">
<template slot-scope="prop">
{{prop.value}}
</template>
</fv-slider>   

### Propoties
---
|    属性(attr)    |             类型(type)             | 必填(required) | 默认值(default) |                 说明(statement)                 |
|:----------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------------------:|
|      v-model/value       |              Number               |      No       |       0        |  绑定的值   |
|      theme       |       String(dark \| light \| custom)   |      No       |       system        |  主题颜色   |
|      disabled       |       Boolean   |      No       |       false        |   是否禁用  |
|      unit       |       Number   |      No       |       1        |   一格的间隔  |
|      mininum       |       Number   |      No       |       0        |   最小值  |
|      maxinum    |   Number | No | 100 | 最大值 |
| icon | String | No | SliderThumb | MS-icon |
| vertical | Boolean | No | false | 是否垂直 |
| showLabel | Boolean | No | false | 是否显示标签 | 
| scale | Boolean \| Number | No | false | 是否显示刻度，刻度长度，如果为真则跟随unit大小 |
| color | String | No | undefined | 按钮的颜色 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|    click     |     event      | 按动按钮触发函数 |
| change | event | 当value值改变时触发函数，默认第一个参数为value |

### Slot
``` vue
<template slot-scope="prop">
  <span>{{prop.value}}</span>
<\template>
```






  
