---
title: DetailsList DetailsList
sidebarDepth: 2
---

[[toc]]

### DetailsList-DEMO
---

<script>
export default {
    data () {
        return {
            value: [
                {
                  id: "",
                  name: "Windows 10（2019 年 11 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:37:41 PM",
                  update_time: "2019/10/10 1:37:41 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:05:21 PM",
                  update_time: "2019/10/10 7:59:50 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "macOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:23 PM",
                  update_time: "2019/10/10 7:59:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Android",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:45 PM",
                  update_time: "2019/10/10 7:12:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "iOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:29 PM",
                  update_time: "2019/10/10 7:12:29 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Windows 10（2019 年 5 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSC"
                  },
                  publish_time: "2019/10/10 6:51:07 PM",
                  update_time: "2019/10/10 6:51:07 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 10（2018 年 10 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:30:10 PM",
                  update_time: "2019/10/10 6:50:34 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Visual Studio Download Center",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:26:39 PM",
                  update_time: "2019/10/10 1:26:39 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio Code",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:23:46 PM",
                  update_time: "2019/10/10 1:23:46 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:17:24 PM",
                  update_time: "2019/10/10 1:17:24 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Microsoft Office 365",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 10:32:18 AM",
                  update_time: "2019/10/10 10:32:18 AM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 7",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 4:24:17 PM",
                  update_time: "2019/10/10 3:46:50 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 8",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:29:59 PM",
                  update_time: "2019/10/10 3:46:44 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2013",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:02 AM",
                  update_time: "2019/10/10 3:46:20 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2016",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:12 AM",
                  update_time: "2019/10/10 3:46:14 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft Office 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:16 AM",
                  update_time: "2019/10/10 3:46:05 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 8.1",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:37 PM",
                  update_time: "2019/10/10 3:40:37 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows Vista",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:30 PM",
                  update_time: "2019/10/10 3:40:30 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows XP ",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:22 PM",
                  update_time: "2019/10/10 3:40:22 PM",
                  prop: "Windows"
                }
          ],
          head: [{
                  content: "Name",
                  minWidth: 60,
                  width: 80,
                  sortName: "name",
                  visible: true
              }, {
                  content: "Publisher",
                  minWidth: 60,
                  width: 80,
                  sortName: "publisher",
                  visible: true
              }, {
                  content: "Publish Time",
                  minWidth: 60,
                  width: 190,
                  sortName: "publish_time",
                  visible: true
              }, {
                  content: "Prop",
                  minWidth: 60,
                  width: 92,
                  sortName: "prop",
                  visible: true
              }, {
                  content: "User Name",
                  minWidth: 60,
                  width: 80,
                  visible: true
          }],
          group: [
              {
                  key: "prop",
                  value: "Windows",
                  name: "A"
              },
              {
                  key: "prop",
                  value: "Edge",
                  name: "B"
              },
              {
                  key: "prop",
                  value: "Office",
                  name: "C"
              },
              {
                  key: "prop",
                  value: "Visual Studio",
                  name: "D"
              }
          ],
          multiSelection: false,
          compact: false,
          filter: {
              key: "name",
              value: ""
          }
        }
    }
}
</script>

<style lang="scss">
.fv-row-css
{
    &:nth-child(odd)
    {
        background: rgba(239, 239, 239, 1);
    }

    &:nth-child(even)
    {
        background: rgba(245, 245, 245, 1);
    }
}
</style>

<ClientOnly>
<div>
    <fv-text-box v-model="filter.value" placeholder="Filter by name"></fv-text-box>
    <fv-toggle-switch v-model="multiSelection" on="Multi-Selection" off="Single-Selection"></fv-toggle-switch>
    <fv-toggle-switch v-model="compact" on="Compact" off="Normal"></fv-toggle-switch>
    <div style="padding: 15px; 0px; display: flex; overflow-x: auto;">
        <fv-check-box v-model="item.visible" v-for="(item, index) in head" :key="index" style="margin-right: 5px;">{{item.visible ? 'Show' : 'Hide'}} {{item.content}}</fv-check-box>
    </div>
    <fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList v-model="value" :head="head">
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList-Allow Drag

---

<ClientOnly>
<div>
    <fv-DetailsList v-model="value" :head="head" :multiSelection="true" :compact="compact" :allowDrag="true">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="true"
  :compact="compact"
  :allowDrag="true"
>
      <template v-slot:column_0="x">
          <p>{{x.item.name}}</p>
      </template>
      <template v-slot:column_1="x">
          <p class="sec">{{x.item.publisher}}</p>
      </template>
      <template v-slot:column_2="x">
          <p class="sec">{{x.item.publish_time}}</p>
      </template><template v-slot:column_3="x">
          <p class="sec">{{x.item.prop}}</p>
      </template>
      <template v-slot:column_4="x">
          <p class="sec">{{x.item.userInfo.name}}</p>
      </template>
</fv-DetailsList>
```

### DetailsList-Grouped

---
<ClientOnly>
<fv-DetailsList v-model="value" :head="head" :multiSelection="multiSelection" :compact="compact" :group="group" :showGroup="true" :allowDrag="true"><template v-slot:column_0="x"><p>{{x.item.name}}</p></template><template v-slot:column_1="x"><p class="sec">{{x.item.publisher}}</p></template><template v-slot:column_2="x"><p class="sec">{{x.item.publish_time}}</p></template><template v-slot:column_3="x"><p class="sec">{{x.item.prop}}</p></template><template v-slot:column_4="x"><p class="sec">{{x.item.userInfo.name}}</p></template></fv-DetailsList>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="multiSelection"
  :compact="compact"
  :group="group"
  :showGroup="true"
>
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList-Dark Theme

---
<ClientOnly>
<div style="position: relative; width: 100%; height: 700px; background: black;">
    <fv-DetailsList v-model="value" :head="head" :multiSelection="multiSelection" :compact="compact" :group="group" :showGroup="true" theme="dark">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="multiSelection"
  :compact="compact"
>
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p>{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p>{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p>{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p>{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList Customize Row CSS

---
<ClientOnly>
<div>
    <fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact" rowCss="fv-row-css">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
    </fv-DetailsList>
</div>

</ClientOnly>

```vue
<fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact" rowCss="fv-row-css">
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
</fv-DetailsList>
```

```scss
.fv-row-css
{
    &:nth-child(odd)
    {
        background: rgba(239, 239, 239, 1);
    }

    &:nth-child(even)
    {
        background: rgba(245, 245, 245, 1);
    }
}
```

### Propoties

---

|   属性(attr)   |             类型(type)             | 必填(required) | 默认值(default) |                                       说明(statement)                                       |
|:--------------:|:----------------------------------:|:--------------:|:---------------:|:-------------------------------------------------------------------------------------------:|
|     value      |              Array               |      Yes       |       N/A       |                              列表数据, 数据格式详见数据格式表                               |
|      head      |              Array               |      Yes       |       N/A       |                              表头数据, 数据格式详见数据格式表                               |
|     group      |              Array               |       No       |       N/A       |                              分组数据, 数据格式详见数据格式表                               |
|     filter     |              String              |       No       |       N/A       |                  搜索筛选, 数据格式详见数据格式表, 控制表显示哪些搜索字段                   |
|   showGroup    |             Boolean              |       No       |      false      | 是否开启按组分割显示, 开启后排序功能将失效, 默认不开启, 若 group 为空, 则开启后表格内容为空 |
|   autoHeight   |             Boolean              |       No       |      false      |                                      是否开启自动高度                                       |
| headBackground |          [string(color)]           |       No       |       N/A       |         表头背景, 不会修改点燃颜色, 若要修改点燃颜色请自定义 fv-custom-head 类样式          |
|    compact     |             Boolean              |       No       |      false      |                                      是否开启收缩模式                                       |
| multiSelection |             Boolean              |       No       |      false      |                                      是否开启多选模式                                       |
|   allowDrag    |             Boolean              |       No       |      false      |                                      是否开启拖动排序                                       |
|     rowCSS     |              String              |       No       |       N/A       |                                     客制化每一行的样式                                      |
| rightMenuWidth |              Number              |       No       |       200       |                                      右键菜单宽度设置                                       |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---

| 事件名(Name) |         参数类型(args)          |                              说明(statement)                               |
|:------------:|:-------------------------------:|:--------------------------------------------------------------------------:|
| change-value |         修改后的 value          |        在列表内部的 value 发生改变后会触发事件并返回修改后的 value         |
| choose-items |          currentChoose          |                      在选择某行数据后返回被选中的数据                      |
|   lazyload   |         修改后的 value          |                  滚动到底部加载数据, 返回列表内部的 value                  |
|  rightclick  |       当前选中的 row-item       |                         右键菜单返回当前选择的项目                         |
|  drop-items  | 返回对象包含`transfer`和`value` | 项目拖拽释放后触发事件, `transfer`包含拖拽项目, `value`包含列表内部的value |

### Slot

---

1. Head

默认情况下用户可直接在`head`中定义`content`来应用默认样式, 不需要修改此模板, 可缺省
用户自定义样式时, 包含以下可选属性

- item: 当前项
- index: 当前项索引

```vue
<template v-slot:head="x">
  <p class="default-title">{{ x.item.content }}</p>
</template>
```

2. Column

用户根据`head`中的数量通过`column_[数字]`的方式来定义每一列的模板
默认情况下利用`<p>`标签来表示正文, 通过`class="sec"`来表示附属文本
用户自定义样式时, 包含以下可选属性

- item: 当前项
- row_index: 当前项行号
- col_index: 当前项列号

```vue
<template v-slot:column_0="x">
  <p>{{ x.item.name }}</p>
</template>
<template v-slot:column_1="x">
  <p class="sec">{{ x.item.publisher }}</p>
</template>
<template v-slot:column_2="x">
  <p class="sec">{{ x.item.publish_time }}</p> </template
><template v-slot:column_3="x">
  <p class="sec">{{ x.item.prop }}</p>
</template>
<template v-slot:column_4="x">
  <p class="sec">{{ x.item.userInfo.name }}</p>
</template>
```

3. Row Expand

用户可以根据需要在每一行添加额外的内容, 如下拉菜单, 注意自定义的内容定位需要设置为'absolute'.

- item: 当前项
- row_index: 当前项行号

```vue
<template v-slot:row_expand="x">
    <div style="position: absolute;"></div>
</template>
```

4. Group

源代码, 默认不需要修改, 用户只需要定义`gi`数组中每一项的`name`来应用默认样式, 不需要定义此模板, 可缺省

```vue
<slot name="group" :item="gi" :index="i" :isMulti="multiSelection" :isChoose="isGroupChooseAll(gi)">
    <span v-show="multiSelection" class="icon-block icon" key="multi-col" @click="chooseGroup(gi)">
        <span class="icon" :class="{choose: isGroupChooseAll(gi)}">
            <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
            <i class="ms-Icon ms-Icon--CircleRing ll"></i>
            <i class="ms-Icon ms-Icon--Completed ll"></i>
        </span>
    </span>
    <span class="expand" :class="{choose: gi.expand}" @click="expandGroup(gi)">
        <i class="ms-Icon ms-Icon--ChevronRight"></i>
    </span>
    <span class="col">
        <p>{{gi.name}}</p>
    </span>
</slot>
```

用户自定义样式时, 包含以下可选属性

- item: 当前组数据
- index: 当前组索引
- isMulti: 当前是否开启多选
- isChoose: 当前组是否全选

```vue
<template v-slot:group="x">
  <p>{{ x.item.name }}</p>
</template>
```

5. Goup Content

若用户想保留默认`Group`下拉样式并且只修改内容部分, 可使用`group_content`来重定义样式, 默认值为:

```vue
<slot name="group_content" :item="gi" :index="i">
    <span class="col">
        <p>{{gi.name}}</p>
    </span>
</slot>
```

用户自定义样式时, 包含以下可选属性

- item: 当前组数据
- index: 当前组索引
- isMulti: 当前是否开启多选
- isChoose: 当前组是否全选

```vue
<template v-slot:group_content="x">
  <p>{{ x.item.name }}</p>
</template>
```

6. Context Menu

默认显示列表选中数量

```vue
<template v-slot:menu>
  <div>
    <span>
      <i>[图标]</i>
      <p>[内容]</p>
    </span>
    ...
    <hr />
    <span>
      <i>[图标]</i>
      <p>[内容]</p>
    </span>
  </div>
</template>
```

### Data

---

1. value

```javascript
value = [{any: '', ...}]

//e.g.//

value: [{id: "", name: "", publisher: "", userInfo: {}, publish_time: "", update_time: "", prop: ""}]
```

2. head

```javascript
head = [
  {
    content: "", //默认表头的列名
    minWidth: "", //最小的列宽, 默认为60
    width: "", //初始的列宽, 默认为80
    sortName: "", //按字段名来排序, 名字为value中的属性, DetailsList将根据当前的属性类型智能排序
    customSort: {}, //自定义排序方法, 在此定义函数满足预设两个参数(itemA, itemB)分别代表value中的两项并根据用户需要自定义函数方法, 此字段定义后, sortName仍需填写, 但值可任意
    visible: true //是否显示该列, 支持函数式声明
  }
];

**特别地** 0.2.17版本后支持采用函数式字段, 其中支持的字段包括`visible`

//e.g.//

head: [
  {
    content: "Name",
    minWidth: 60,
    width: 80,
    sortName: "name",
    visible: true
  },
  {
    content: "Publisher",
    minWidth: 60,
    width: 80,
    sortName: "publisher",
    visible: true
  },
  {
    content: "Publish Time",
    minWidth: 60,
    width: 190,
    sortName: "publish_time",
    visible: true
  },
  {
    content: "Prop",
    minWidth: 60,
    width: 92,
    sortName: "prop",
    visible: true
  },
  {
    content: "User Name",
    minWidth: 60,
    width: 80,
    visible: true
  }
];
```

3. group

```javascript
group = [
  {
    key: "", //分组的键值, 键来自value的属性
    value: "", //分组的键值对应的具体值, DetailsList会根据当前的key匹配value来进行分组
    name: "" //分组的其他数据, 默认模板将以name属性来渲染名称
  }
];

//e.g.//

group: [
  {
    key: "prop",
    value: "Windows",
    name: "A"
  },
  {
    key: "prop",
    value: "Edge",
    name: "B"
  },
  {
    key: "prop",
    value: "Office",
    name: "C"
  },
  {
    key: "prop",
    value: "Visual Studio",
    name: "D"
  }
];
```

### Custom Class

---

|     类名(Name)      |                                           说明(statement)                                           |
|:-------------------:|:---------------------------------------------------------------------------------------------------:|
|   fv-custom-head    | 客制化表头, 主要递推关系: fv-custom-head -> icon-block, col -> col-content, expand -> default-title |
|    fv-custom-row    |                      客制化行, 主要递推关系: fv-custom-row -> icon-block, col                       |
| fv-custom-group-row |               客制化组, 主要递推关系: fv-custom-group-row -> icon-blocks, expand, col               |

```scss
.fv-custom-head {
  .icon-block {
    .icon {
    }
  }
  .col {
    .col-content {
      .default-title {
      }
    }

    .expand {
    }
  }
}

.fv-custom-row {
  .icon-block {
    .icon {
    }
  }
  .col {
  }
}

.fv-custom-group-row {
  &.choose {
  }

  .icon-block {
    .icon {
    }
  }
  .col {
  }

  .expand {
  }
}
```
