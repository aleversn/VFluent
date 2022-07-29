---
  title: InfiniteScrollView InfiniteScrollView
  sidebarDepth: 2
---
  
[[toc]]

### InfiniteScrollView-DEMO

<script>
export default {
    data () {
        return {
            value: [

            ]
        }
    },
    mounted () {
        for (let i = 0; i < new Date().getFullYear(); i++)
            this.value.push(i + 1);
    }
}
</script>


<ClientOnly>


<fv-InfiniteScrollView v-model="value">
</fv-InfiniteScrollView>

```vue
<fv-InfiniteScrollView v-model="value">
</fv-InfiniteScrollView>
```


</ClientOnly>


### Propoties
---
| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:----------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|   value    |              [array]               |       No       |       []        |      要装载的数组      |
| batchSize  |              [number]              |       No       |       30        | 动态加载的每一批次大小 |
|   offset   |              [number]              |       No       |       100       |     滚动加载偏移量     |
|   static   |             [boolean]              |       No       |      false      |    是否取消动态加载    |
|   theme    | ['light','dark','custom','system'] |       No       |     system      |         主题色         |


### Events
---
| 事件名(Name) | 参数类型(args) |                  说明(statement)                   |
|:------------:|:--------------:|:--------------------------------------------------:|
|   lazyload   |    boolean     | 动态加载时触发此事件, 返回当前加载批次数据是否为空 |
|  init-start  |      N/A       |                   初始化加载开始                   |
|   init-end   |      N/A       |                   初始化加载结束                   |

### Slot

---

1. Default

默认模板, 可将`InfiniteScrollView`当作`Div`来使用

```vue
<slot :thisValue="thisValue" :dynamicValue="dynamicValue">
    <p v-for="(item, index) in dynamicValue" :key="index">{{item}}</p>
</slot>
```

- thisValue: 传入数组
- dynamicValue: 已动态加载的数组

<template v-slot:default="x">
    <p v-for="(item, index) in x.dynamicValue" :key="index">{{item}}</p>
</template>