---
  title: SearchBox
  sidebarDepth: 2
---
  
[[toc]]

### SearchBox-DEMO
---

<script>
export default {
    data () {
        return {
            value: "",
            items: [
                { key: "fruitsHeader", name: "Fruits", type: "header" },
                { key: "apple", name: "Apple" },
                { key: "banana", name: "Banana" },
                { key: "orange", name: "Orange", disabled: true },
                { key: "grape", name: "Grape" },
                { key: "divider_1", name: "", type: "divider" },
                { key: "vegetablesHeader", name: "Vegetables", type: "header" },
                { key: "broccoli", name: "Broccoli" },
                { key: "carrot", name: "Carrot" },
                { key: "lettuce", name: "Lettuce" }
            ],
            custom_items: {
                people: ['https://th.bing.com/th/id/OIP.kusjJHHbJMyhkHQXMwn23gHaE8?w=253&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', 'https://th.bing.com/th/id/OIP.PHUY3CWgvSSgeoZ5ZE9-0AHaFr?w=214&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', 'https://th.bing.com/th/id/OIP.XE7Fk_nOciTNMxXFhIPxhAHaGB?w=219&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7'],
                pos: ['Beijing', 'Shanghai', 'Shenzhen'],
                pro: ['IT', 'Doctor', 'Artist']
            },
            resultPlaceholder: []
        }
    },
    methods: {
        customFilterFunc (target) {
            let result = {};
            for(name in target) {
                if(name == 'people')
                    continue;
                let arr = [];
                for(let item of target[name]) {
                    if(item.toString().toLowerCase().indexOf(this.value.toLowerCase()) > -1)
                        arr.push(item);
                }
                result[name] = arr;
            }
            result["people"] = target["people"];
            return result;
        }
    }
}
</script>



Standard

<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

Disabled

<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>

```vue
Standard
<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

Disabled
<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>
```

### SearchBox-RevealBorder


<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>

```vue
<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>
```

### SearchBox-Custom Search Result
---
<div>
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <span class="list-item list-title">人物</span>
            <div style="position: relative; width: 100%; height: 60px; display: flex;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
            </div>
            <span class="list-item list-title">位置</span>
            <span>
                <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
            </span>
            <span class="list-item list-title">职业</span>
            <span>
                <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
            </span>
        </div>
    </template>
</fv-SearchBox>
</div>

```vue
<div>
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <span class="list-item list-title">人物</span>
                <div style="position: relative; width: 100%; height: 60px; display: flex;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
                </div>
                <span class="list-item list-title">位置</span>
                <span>
                    <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
                </span>
                <span class="list-item list-title">职业</span>
                <span>
                    <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
                </span>
            </div>
        </template>
    </fv-SearchBox>
</div>
```

### TextBox-With Underline And Borderless
---
1. Light


<fv-SearchBox icon="Search" placeholder="Search" :options="items" underline></fv-SearchBox>

2. Dark

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" underline></fv-SearchBox>
</div>

3. Underline with Reveal
<fv-SearchBox icon="Search" placeholder="Search" :options="items" :revealBorder="true" underline></fv-SearchBox>

```vue
1. Light

<fv-SearchBox icon="Search" placeholder="Search" :options="items" underline></fv-SearchBox>

2. Dark

<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" underline></fv-SearchBox>

3. Underline with Reveal

<fv-SearchBox icon="Search" placeholder="Search" :options="items" :revealBorder="true" underline></fv-SearchBox>
```

### SearchBox-Dark Theme
---

1. Original Template

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>


2. Custom Template

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <span class="list-item list-title">人物</span>
            <div style="position: relative; width: 100%; height: 60px; display: flex;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
            </div>
            <span class="list-item list-title">位置</span>
            <span>
                <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
            </span>
            <span class="list-item list-title">职业</span>
            <span>
                <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
            </span>
        </div>
    </template>
</fv-SearchBox>
</div>

```vue
1. Original Template

<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>


2. Custom Template

<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <span class="list-item list-title">人物</span>
                <div style="position: relative; width: 100%; height: 60px; display: flex;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
                </div>
                <span class="list-item list-title">位置</span>
                <span>
                    <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
                </span>
                <span class="list-item list-title">职业</span>
                <span>
                    <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
                </span>
            </div>
        </template>
    </fv-SearchBox>
</div>
```

### TextBox-Customize
---
Customize border color
<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

Customize background
<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>

```vue
Customize border color
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

Customize background
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>
```

</ClientOnly>

### Propoties
---
|        属性(attr)        |             类型(type)             | 必填(required) | 默认值(default) |              说明(statement)              |
|:------------------------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------------------------:|
|          value           |              String              |       No       |                 |     Using v-model binding input value     |
|         options          |         [array or object]          |      Yes       |       N/A       |           SearchBox搜索候选数据           |
|       placeholder        |              String              |       No       |       N/A       |              等同HTML[input]              |
|           type           |              String              |       No       |      text       |              等同HTML[input]              |
|         readonly         |             Boolean              |       No       |      false      |              等同HTML[input]              |
|        maxlength         |              Number              |       No       |       N/A       |              等同HTML[input]              |
|       customFilter       |         [object(function)]         |       No       |       N/A       |            客制化搜索筛选函数             |
|    resultPlaceholder     |              Array               |       No       |       N/A       |     结果占位数据, 显示在SearchBox左端     |
|        focusShow         |             Boolean              |       No       |      false      |       是否开启获取焦点时显示结果框        |
|         leftIcon         |              String              |       No       |       N/A       |                  左图标                   |
|           icon           |              String              |       No       |       N/A       |                  右图标                   |
|        underline         |             Boolean              |       No       |      false      |     是否开启Underline风格的SearchBox      |
|        background        |          [string(color)]           |       No       |       N/A       |                  背景色                   |
|       borderWidth        |             Boolean              |       No       |        1        |                                           |
|       borderColor        |          [string(color)]           |       No       |       N/A       |                                           |
|     focusBorderColor     |          [string(color)]           |       No       |       N/A       |                                           |
|         fontSize         |              Number              |       No       |      13.3       |                                           |
|        fontWeight        |          [string,number]           |       No       |     normal      |                                           |
|        foreground        |          [string(color)]           |       No       |       N/A       |                                           |
|        textAlign         |              String              |       No       |      left       |                                           |
|       borderRadius       |              Number              |       No       |       N/A       | Textbox圆角大小, 启用revealBorder时将失效 |
|       revealBorder       |             Boolean              |       No       |      false      |                                           |
|          status          |         ['warn','correct']         |       No       |       N/A       |    状态边框预设, 默认有警告和正确两种     |
|      debounceDelay       |              Number              |       No       |       300       |             搜索节流延迟时间              |
|         disabled         |             Boolean              |       No       |      false      |                                           |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events
---
|       事件名(Name)       | 参数类型(args) |                                              说明(statement)                                               |
|:------------------------:|:--------------:|:----------------------------------------------------------------------------------------------------------:|
|         keydown          |     event      |                                                                                                            |
|          keyup           |     event      |                                                                                                            |
|          change          |     event      |                                                                                                            |
|          paste           |     event      |                                                                                                            |
|     left-icon-click      |     event      |                                                                                                            |
|        icon-click        |     event      |                                                                                                            |
|         lazyload         |     array      |                      搜索结果框滚动加载事件, 滑动到最底部时触发, 返回当前搜索筛选数据                      |
| update:resultPlaceholder |     array      | 更新搜索占位数组, 在清除搜索框时触发清除搜索占位数组, 再按下退格键时若文本为空, 清除最后一个搜索占位数据项 |
|       clear-click        |     array      |                                            清除搜索框文本时触发                                            |
|      choose-result       |     object     |                                       搜索结果框选中项目后返回当前项                                       |
|      debounce-input      |     string     |                                              搜索节流内容反馈                                              |

### Slot
---
1. SearchResult

默认情况下用户可直接在`options`中定义`name`来应用默认样式, 不需要修改此模板, 可缺省
用户自定义样式时, 包含以下可选属性
- data: 传入的`filterOptions`
- chooseResult: 用于回调的选择出发函数, 需要传入一个对象, 包含`item`和`item.name`属性

```vue
 <template v-slot:searchResult="x">
    <fv-list-view v-model="x.data" :theme="theme" style="width: 100%; height: auto;" @chooseItem="x.chooseResult"></fv-list-view>
</template>
```

2. ResultPlaceholder

用户根据自己的需要在搜索框选择结果后将值显示在`SearchBox`左侧显示相应数据, 数据模板即为`ResultPlaceholder`

```vue
<template v-slot:resultPlaceholder="x">
    <div></div>
</template>
```

### Data
---

1. options

数据格式参考`ListView`中`items`的形式, 其中`key`字段建议开发者在有重复名称和类型字段时声明用来区别项目

```javascript
options = [{key: '', name: '', type: '', disabled: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", name: "Fruits", type: "header" },
    { key: "apple", name: "Apple" },
    { key: "banana", name: "Banana" },
    { key: "orange", name: "Orange", disabled: true },
    { key: "grape", name: "Grape" },
    { key: "divider_1", name: "", type: "divider" },
    { key: "vegetablesHeader", name: "Vegetables", type: "header" },
    { key: "broccoli", name: "Broccoli" },
    { key: "carrot", name: "Carrot" },
    { key: "lettuce", name: "Lettuce" }
]
```