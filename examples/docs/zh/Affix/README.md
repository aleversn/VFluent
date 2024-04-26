---
  title: Affix
  sidebarDepth: 2
---
  
[[toc]]

### Affix-DEMO
---

<script>
export default {

    data () {
        return {
            test: [
                false,
                false
            ]
        }
    }

}
</script>

<ClientOnly>

### Affix-Always Fixed

<div ref="d1" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d1" left="0" :top="0">
<fv-button>Fixed</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>

```vue
<div ref="d1" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d1" left="0" :top="0">
<fv-button>Fixed</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```

### Affix-Affix Top

<div ref="d2" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix v-for="(item, index) in 10" :key="index" :target="() => $refs.d2" mode="auto" :left="0" :top="0">
<fv-button>Affix Top {{index + 1}}</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>

```vue
<div ref="d2" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix v-for="(item, index) in 10" :key="index" :target="() => $refs.d2" mode="auto" :left="0" :top="0">
<fv-button>Affix Top {{index + 1}}</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```

### Affix-Affix Top and Bottom

<div ref="d3" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 600px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d3" mode="auto" :bottom="0" :affixPos="['top', 'bottom']">
<fv-button style="width: 150px;">Affix Top and Bottom</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>

```vue
<div ref="d3" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 600px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d3" mode="auto" :bottom="0" :affixPos="['top', 'bottom']">
<fv-button style="width: 150px;">Affix Top and Bottom</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```
</ClientOnly>

### Propoties
---
| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) |                             说明(statement)                             |
|:----------:|:----------:|:--------------:|:---------------:|:-----------------------------------------------------------------------:|
|    left    |   String   |       No       |       N/A       |                      `left`属性值, 参照`HTML`属性                       |
|    top     |   String   |       No       |       N/A       |                       `top`属性值, 参照`HTML`属性                       |
|   right    |   String   |       No       |       N/A       |                      `right`属性值, 参照`HTML`属性                      |
|   bottom   |   String   |       No       |       N/A       |                     `bottom`属性值, 参照`HTML`属性                      |
|   target   |  Function  |      Yes       |       N/A       |                      `Affix`的目标元素, 为一个函数                      |
|    mode    |   String   |       No       |     `fixed`     |               `Affix`的模式, `fixed`, `relative`或`auto`                |
|  affixPos  |   Array    |       No       |     ['top']     | `Affix`的在父元素滚动吸附位置, 可以为`left`, `top`, `right` 和 `bottom` |
|   zIndex   |   Number   |       No       |       N/A       |                        `Affix`容器的`z-index`值                         |
|   theme    |   String   |       No       |     system      |        主题样式, 包含`light`, `dark`, `system`, `custom`几种样式        |


### Events
---
| 事件名(Name) | 参数类型(args) |            说明(statement)             |
|:------------:|:--------------:|:--------------------------------------:|
|    change    |    Boolean     | 当固定状态发生改变时触发, 返回是否固定 |

### Slot
---

1. Default

```vue
<fv-affix>
    <div></div>
</fv-affix>
```
  

  
