---
  title: TableView
  sidebarDepth: 2
---
  
[[toc]]

### TableView-DEMO
---

<script>
export default {
  data() {
    return {
        obj: {
            heads: [
                {
                    key: 'name',
                    name: 'Name',
                    emoji: '😂',
                    type: 'text',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'age',
                    name: 'Age',
                    emoji: '👴',
                    type: 'number',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'time',
                    name: 'Time',
                    emoji: '🕒',
                    type: 'date',
                    timeFormat: '12',
                    showEndDate: true,
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'email',
                    name: 'Email',
                    emoji: '@',
                    type: 'email',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'age1',
                    name: 'Age',
                    emoji: '👴',
                    type: 'number',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'time1',
                    name: 'Time',
                    emoji: '🕒',
                    type: 'date',
                    minWidth: 60,
                    width: 100
                }
            ],
            rows: [
                {
                    name: 'Tom',
                    age: 18,
                    email: 'tom@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Jerry',
                    age: 20,
                    email: 'Jerry@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Minskiter',
                    age: 20,
                    email: 'Minskiter@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'PCPower',
                    age: 20,
                    email: 'PCPower@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Lina Bell',
                    age: 20,
                    email: 'fatbabby@cat.com',
                    time: '2020-01-01 12:00:00'
                }
            ]
        }
    }
  },
  methods: {
  }
}
</script>

<fv-TableView v-model="obj" style="width: 100%; height: auto;">
</fv-TableView>

<div style="width: 100%; height: 1000px;"></div>

### Propoties
---
|     属性(attr)      | 类型(type) | 必填(required) |   默认值(default)   |                      说明(statement)                      |
|:-------------------:|:----------:|:--------------:|:-------------------:|:---------------------------------------------------------:|
|        value        |   Object   |      Yes       |         {}          |       绑定数据对象, 包含heads: []和rows: []两个对象       |
|        i18n         |  Function  |       No       |                     |          语言本地化函数, 默认为直接返回传入文本           |
|     foreground      |   String   |       No       | rgba(0, 90, 158, 1) |                          主题色                           |
|  deleteColumnFunc   |  Function  |       No       |        null         |                     客制化删除列函数                      |
|   deleteRowsFunc    |  Function  |       No       |        null         |                     客制化删除行函数                      |
|    copyTableFunc    |  Function  |       No       |        null         |                   客制化复制选中项函数                    |
|   pastedTableFunc   |  Function  |       No       |        null         |                      客制化粘贴函数                       |
|    syncRowsFunc     |  Function  |       No       |        null         |                   客制化表格值拖拽函数                    |
| rightMenuBackground |   String   |       No       |         N/A         |                      右键菜单背景色                       |
|     extensions      |   Array    |       No       |         []          |                           扩展                            |
|        theme        |   String   |       No       |       system        | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|              |                |                 |

### Extensions

`TableView`支持自定义新的列类型, 通过`extensions`属性传入一个数组, 数组中每个对象需包含以下基本属性:

```javascript
{
    name: 'Text', // 列类型名称
    type: 'text', // 列类型
    icon: 'List', // 列类型图标
    emoji: '📝', // 列类型emoji
    headComponent: textHead, // 列头组件
    cellComponent: textCell, // 列单元格组件
    filter: ({ input, value }) => { // 过滤函数
        if (!input) return true;
        return (
            value.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
    },
    sortAsc: (a, b) => { // 升序排序函数
        return a.localeCompare(b);
    },
    sortDesc: (a, b) => { // 降序排序函数
        return b.localeCompare(a);
    },
    toString: value => { // 转换为字符串函数
        return value;
    }
}
```

在上述属性中, 包含`headComponent`和`cellComponent`两个属性, 用于自定义列头和单元格组件, 因此对于每个客制化的拓展, 需包含三个文件:

- `customHead.vue`: 列头组件
- `customCell.vue`: 列单元格组件
- `index.js`: 拓展对象

这里以`Number`组件为例, 展示如何自定义一个`Number`列类型:

- index.js:

```javascript
import numberHead from './numberHead.vue';
import numberCell from './numberCell.vue';

export default {
    name: 'Number',
    type: 'number',
    icon: 'NumberField',
    emoji: '🔢',
    headComponent: numberHead,
    cellComponent: numberCell,
    filter: ({ input, value }) => {
        if (!input) return true;
        return (
            input === value
        );
    },
    sortAsc: (a, b) => {
        return a.localeCompare(b);
    },
    sortDesc: (a, b) => {
        return b.localeCompare(a);
    }
}
```

- numberHead.vue:

对于Head组件, 默认采用`fv-table-view-head-base`组件, 通过`formatFunction`属性传入一个格式化函数, 用于格式化列头数据:

```vue
<template>
    <fv-table-view-head-base
        :value="value"
        :index="index"
        :i18n="i18n"
        :foreground="foreground"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :theme="theme"
        :wrapperWidth="'260px'"
        :dragItem="dragItem"
        :formatFunction="formatNumberHead"
        @duplicate-column="$emit('duplicate-column', $event)"
        @drop-item="$emit('drop-item', $event)"
        @delete-column="$emit('delete-column', $event)"
    >
        <template v-slot:default>
            ...
        </template>
        <template v-slot:entire>
            ...
        </template>
        <template v-slot:menu>
            ...
        </template>
    </fv-table-view-head-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: ''
        },
        dragItem: {
            type: Object,
            default: null
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    ...,
    methods: {
        formatNumberHead(value) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '🔢',
                type: 'number',
                minWidth: 60,
                width: 100,
                numberFormat: 'Number',
                showAs: 'number',
                showColor: '#958DF1',
                divideBy: 100,
                showNumber: true,
                fixed: false,
                fixedSide: false,
                wrap: false,
                visible: true
            };
            for (let key in defaultHead) {
                if (!value[key]) this.$set(value, key, defaultHead[key]);
            }
            if (!value.__guid)
                this.$set(value, '__guid', this.GuidWithoutDash());
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    }
};
</script>
```

上述的`props`属性均需要传入组件中.

- numberCell.vue:

对于Cell组件, 默认采用`fv-table-view-cell-base`组件, 通过`formatFunction`属性传入一个格式化函数, 用于格式化单元格数据:

```vue
<template>
    <fv-table-view-cell-base
        :value="value"
        :head="head"
        :i18n="i18n"
        :selectPos="selectPos"
        :foreground="foreground"
        :row_index="row_index"
        :col_index="col_index"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :formatFunction="formatNumberCell"
        :theme="theme"
        @drop-item="$emit('drop-item', $event)"
        @set-select="$emit('set-select', $event)"
    >
        <template v-slot:default>
            ...
        </template>
        <template v-slot:entire>
            ...
        </template>
    </fv-table-view-cell-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        head: {
            type: Object,
            default: () => ({})
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        selectPos: {
            type: Object,
            default: () => ({})
        },
        foreground: {
            default: ''
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        row_index: {
            type: Number,
            default: 0
        },
        col_index: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    ...,
    methods: {
        formatNumberCell(value) {
            ...
        },
        GuidWithoutDash() {
            ...
        }
    }
};
</script>
```

上述的`props`属性均需要传入组件中.
