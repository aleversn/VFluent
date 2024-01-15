---
title: TreeView
sidebarDepth: 2
---

<script>
  export default {
    data() {
        return {
            theme: 0,
            backgroundColorHover: 'rgba(0, 200, 247, 0.1)',
            backgroundColorActive: 'rgba(0, 204, 153, 0.1)',
            foregroundColor: 'rgba(145, 145, 235, 1)',
            files: [
                {
                    label: 'Img Folder',
                    icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
                    loading: true,
                    children: [
                        {
                            label: 'Folder',
                            icon: 'Folder',
                            expanded: true,
                            children: [
                                {
                                    label: 'File',
                                    icon: 'FileCode'
                                },
                                {
                                    label: 'File',
                                    icon: 'FileCode'
                                }
                            ]
                        },
                        {
                            label: 'File',
                            icon: 'FileCode'
                        },
                        {
                            label: 'File',
                            icon: 'FileCode',
                            disabled: true
                        },
                        {
                            label: 'No Drop Inside',
                            icon: 'Error',
                            dropInside: false
                        }
                    ]
                },
                {
                    label: 'File',
                    icon: 'FileCode'
                },
                {
                    label: 'Cascade',
                    icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
                    children: [
                        {
                            label: 'Cascade2',
                            icon: 'Folder',
                            children: [
                                {
                                    label: 'Cascade3',
                                    icon: 'FileCode',
                                    children: [

                                    ]
                                },
                                {
                                    label: 'File',
                                    icon: 'FileCode',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        $theme() {
            return !this.theme ? 'light' : 'dark';
        }
    },
    mounted() {
        
    },
    methods: {
        alert(text) {
            alert(text);
        },
        click(item) {
            console.log(item);
        },
        addChildren() {
            let item = this.files[0].children[0];
            let temp = [];
            for (let i = 0; i < 20; ++i) {
                temp.push(Object.assign({}, item.children[0]));
            }
            item.children = temp;
        },
        expand() {
            let item = this.files[0].children[0];
            item.expanded = !item.expanded;
        },
        dropItem (event) {
            let { root, drop, dropParent, drag, dragParent, mode } = event;
            if (mode === 'enter') {
                if(!drop.children)
                    drop.children = [];
                drop.children.push(drag);
                let dragParentChildren = dragParent ? dragParent.children : root;
                dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
            } else {
                let dropParentChildren = dropParent ? dropParent.children : root;
                const index = dropParentChildren.indexOf(drop);
                dropParentChildren.splice(index, 0, drag);
                let dragParentChildren = dragParent ? dragParent.children : root;
                dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
            }
        }
    }
};
</script>

[[toc]]

### TreeView-DEMO
---

<ClientOnly>
<fv-button style="width: 250px; margin: 5px 0px;" @click="addChildren">Add Child for Img Folder/Folder</fv-button>
<fv-button style="width: 250px; margin: 5px 0px;" @click="expand">Expand Img Folder/Folder</fv-button>
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px" :viewStyle="{backgroundColor:'transparent'}" background="transparent">
</fv-TreeView>
```

### TreeView Draggable
---

<ClientOnly>
<fv-TreeView v-model="files" :draggable="true" @click="click" @drop-item="dropItem">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" :draggable="true" @click="click" @drop-item="dropItem">
</fv-TreeView>
```

默认的修改项目顺序的示例, 其中`dropParent`和`dragParent`在根下为`null`

```javascript
dropItem (event) {
    let { root, drop, dropParent, drag, dragParent, mode } = event;
    if (mode === 'enter') {
        if(!drop.children)
            drop.children = [];
        drop.children.push(drag);
        let dragParentChildren = dragParent ? dragParent.children : root;
        dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
    } else {
        let dropParentChildren = dropParent ? dropParent.children : root;
        const index = dropParentChildren.indexOf(drop);
        dropParentChildren.splice(index, 0, drag);
        let dragParentChildren = dragParent ? dragParent.children : root;
        dragParentChildren.splice(dragParentChildren.indexOf(drag), 1);
    }
}
```

### TreeView Checkable
---
<ClientOnly>
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" :checkable="true" expandedIconPosition="right" @click="click">
</fv-TreeView>
```

### Slot

<ClientOnly>
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
</ClientOnly>

```vue
<fv-TreeView v-model="files" style="width:200px">
  <template v-slot:default="prop">
    {{prop.item.label}}
  </template>
</fv-TreeView>
```

### TreeView Customize and Draggable
---

backgroundColorHover:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:backgroundColorHover}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="backgroundColorHover" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>

backgroundColorActive:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:backgroundColorActive}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="backgroundColorActive" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>
foregroundColor:
<ClientOnly>
<fv-callout>
    <div :style="{width:'20px', height:'20px', backgroundColor:foregroundColor}" style="border:2px solid rgba(200, 200, 200, 0.3); border-radius: 6px;" />
    <main>
    <fv-colorPicker v-model="foregroundColor" style="width:500px"/>
    </main>
</fv-callout>
</ClientOnly>


<ClientOnly>
<fv-TreeView
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :backgroundColorHover="backgroundColorHover"
  :backgroundColorActive="backgroundColorActive"
  leftIconForeground="black"
  :foreground="foregroundColor"
  :draggable="true" 
  expandClickMode="normal"
  :space="10">
</fv-TreeView>
</ClientOnly>

``` vue 
<fv-TreeView
  :theme="$theme" 
  v-model="files" 
  :checkable="true" 
  @click="click" 
  :backgroundColorHover="backgroundColorHover"
  :backgroundColorActive="backgroundColorActive"
  leftIconForeground="black"
  :foreground="foregroundColor"
  :draggable="true" 
  expandClickMode="normal"
  :space="10">
</fv-TreeView>
```

### Propoties

---

|      属性(attr)       |             类型(type)             | 必填(required) |   默认值(default)   |    说明(statement)     |
|:---------------------:|:----------------------------------:|:--------------:|:-------------------:|:----------------------:|
|         value         |               Array                |      Yes       |         []          |     数据，详见data     |
|       draggable       |              Boolean               |       No       |        false        |       是否可拖动       |
|       checkable       |              Boolean               |       No       |        false        |        是否可选        |
|         space         |               Number               |       No       |         20          | 树形父与子间的间距(px) |
|      foreground       |               String               |       No       | rgba(0, 90, 158, 1) |         前景色         |
|     expandedIcon      |               String               |       No       |  ChevronDownSmall   |      扩展后的箭头      |
|    unexpandedIcon     |               String               |       No       |  ChevronRightSmall  |      未扩展的箭头      |
| backgroundColorHover  |               String               |       No       |         N/A         |    子项Hover的颜色     |
| backgroundColorActive |               String               |       No       |         N/A         |     子项激活的颜色     |
|      itemHeight       |               String               |       No       |         30          |        子项高度        |
|      showLoading      |              Boolean               |       No       |        false        |  加载时是否显示进度条  |
| expandedIconPosition  |          ['left','right']          |       No       |       'left'        |      扩展箭头位置      |
|    expandClickMode    |         ['icon','normal']          |       No       |      'normal'       |     点击展开的方式     |
|         theme         | ['system','dark','light','custom'] |       No       |      'system'       |         主题色         |

### Events
---

| 事件名(Name) |                  参数类型(args)                  |           说明(statement)            |
|:------------:|:------------------------------------------------:|:------------------------------------:|
|    click     |                       item                       | 当点击时触发，第一个参数为点击的item |
|  drop-item   | {root, drop, dropParent, drag, dragParent, mode} |           拖动放置回调函数           |


### Slots
---

1. TreeItem

默认以value中每一项的属性name作为默认显示, 包含以下可选属性
- item: 当前项
- deep: 当前深度

```vue
<template v-slot:default="x">
  {{x.item.label}}
</template>
```

### Data
---

1. value

其中`icon`表示该项图标, 支持引入图像, `expanded`表示是否展开, `selected`表示是否选中, `loading`表示该项是否在加载, `dropInside`表示是否允许拖动放置到该项内部, `show`表示是否显示该项, `children`表示子项

若想在外部控制`expanded`和`selected`, 需在传入数据前定义它们

``` javascript
value = [{label: '', icon: '', disabled: '', children: [], expanded: false, selected: false, loading: false, dropInside: true, show: true}]

[
    {
        label: 'Img Folder',
        icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
        children: [
            {
                label: 'Folder',
                icon: 'Folder',
                expanded: true,
                children: [
                    {
                        label: 'File',
                        icon: 'FileCode'
                    },
                    {
                        label: 'File',
                        icon: 'FileCode'
                    }
                ]
            },
            {
                label: 'File',
                icon: 'FileCode'
            },
            {
                label: 'File',
                icon: 'FileCode',
                disabled: true
            },
            {
                label: 'No Drop Inside',
                icon: 'Error',
                dropInside: false
            }
        ]
    },
    {
        label: 'File',
        icon: 'FileCode'
    },
    {
        label: 'Cascade',
        icon: 'https://img.icons8.com/bubbles/2x/folder-invoices.png',
        children: [
            {
                label: 'Cascade2',
                icon: 'Folder',
                children: [
                    {
                        label: 'Cascade3',
                        icon: 'FileCode',
                        children: [

                        ]
                    },
                    {
                        label: 'File',
                        icon: 'FileCode',
                        disabled: true
                    }
                ]
            }
        ]
    }
]
```


**特别地** 1.2.31版本后支持采用函数式字段, 其中支持的字段包括`label`, `icon`, `disabled`, `loading`, `dropInside`, `show`