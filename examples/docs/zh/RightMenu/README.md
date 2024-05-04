---
  title: RightMenu
  sidebarDepth: 2
---
  
[[toc]]

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        Click($event, el) {
            $event.stopPropagation();
            this.$refs.r1.rightClick($event, el);
        },
        rightClick($event, el) {
            $event.preventDefault();
            this.$refs.r1.rightClick($event, el);
        }
    }
}
</script>

### RightMenu-DEMO
--- 

<ClientOnly>
Inside the Parent Element.

<fv-button ref="b1" style="width: 120px;" @contextmenu.native="rightClick($event, $el)">Inside Parent</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200"><span>Item1</span><hr><span>Item2</span></fv-RightMenu>

```vue
<fv-button ref="b1" style="width: 120px;" @contextmenu.native="rightClick($event, $el)">Inside Parent</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

Inside the button.

<fv-button ref="b2" style="width: 120px;" @contextmenu.native="rightClick($event, $refs.b2.$el)">Inside Button</fv-button>

```vue
<fv-button ref="b2" style="width: 120px;" @contextmenu.native="rightClick($event, $refs.b2.$el)">Inside Button</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

```javascript
rightClick($event, el) {
    $event.preventDefault();
    this.$refs.r1.rightClick($event, el);
}
```

### RightMenu-Left Click
---

<fv-button ref="b1" style="width: 120px;" @click="Click($event, $el)">Left Click</fv-button>

```vue
<fv-button ref="b1" style="width: 120px;" @click="Click($event, $el)">Left Click</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

```javascript
Click($event, el) {
    $event.stopPropagation();
    this.$refs.r1.rightClick($event, el);
}
```
</ClientOnly>

### Propoties
---
|     属性(attr)      | 类型(type) | 必填(required) | 默认值(default) |                      说明(statement)                      |
|:-------------------:|:----------:|:--------------:|:---------------:|:---------------------------------------------------------:|
|        value        |  Boolean   |       No       |      false      |           显示/隐藏`RightMenu`, 一般不直接使用            |
|   rightMenuWidth    |   Number   |       No       |       200       |                      `RightMenu`宽度                      |
|     background      |   String   |       No       |       N/A       |                     `RightMenu`背景色                     |
| fullExpandAnimation |  Boolean   |       No       |      false      |                    是否使用全展开动画                     |
|        theme        |   String   |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name)  | 参数类型(args) |      说明(statement)      |
|:-------------:|:--------------:|:-------------------------:|
| update-height |     Number     | `RightMenu`高度变化时触发 |

### Slot
---

1. Default

每一项通过`<span></span>`标签包装, 使其展示默认的样式, 分割线使用`<hr>`标签.

```vue
<fv-RightMenu>
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

### Appendix

---

1. 触发`RightMenu`显示

通过`RightMenu`对象的`rightClick`函数可以触发显示菜单, 其中函数包含两个参数

- event: 一般为鼠标或触摸事件, `RightMenu`将根据`event.target`来获取显示的位置.
- target: 指定了`RightMenu`受限的区域, 为一个`HTMLElement`用于限制`RightMenu`出现边界范围.

以下是两种触发函数, 其中`Click`事件为左键触发样例, 需要在被点击对象上执行阻止冒泡事件, `rightClick`事件为右键触发样例, 需要阻止默认事件.

```javascript
Click($event, el) {
    $event.stopPropagation();
    this.$refs.r1.rightClick($event, el);
},
rightClick($event, el) {
    $event.preventDefault();
    this.$refs.r1.rightClick($event, el);
}
```
