---
title: MenuFlyout MenuFlyout
sidebarDepth: 2
---

[[toc]]

<script>
  export default {
    data(){
      return {
        theme:0,
      }
    },
    computed:{
      $theme(){
        return !this.theme?'light':'dark';
      },
      divStyle(){
        if (this.$theme=='light'){
          return {
            backgroundColor:'#fff',
            padding:'20px',
            color:'#000',
          }
        }else{
          return {
            backgroundColor:'#000',
            padding:'20px',
            color:'#fff',
          }
        }
      }
    },
    methods:{
      alert(text){
        alert(text);
      },
      go(url){
        window.location.href=url
      }
    }
  }
</script>

<div :style="divStyle">
THEME:<fv-toggle-switch v-model="theme" :on="$theme" :off="$theme" :theme="$theme"/>
</div>

### MenuFlyout

<ClientOnly>
<div :style="divStyle">
<fv-menuFlyout :theme="$theme">
<fv-menu-sub-flyout label="Actions"> 
<fv-menu-item-flyout  label="New">
</fv-menu-item-flyout>
<fv-menu-sub-flyout label="Remove">  
<fv-menu-item-flyout label="Item">
</fv-menu-item-flyout>
</fv-menu-sub-flyout>
</fv-menu-sub-flyout>
<hr/>
<fv-menu-item-flyout>
</fv-menu-item-flyout>
<fv-menu-item-flyout>
</fv-menu-item-flyout>
</fv-menuFlyout>
</div>
</ClientOnly>

```vue
<fv-menuFlyout :theme="$theme">
  <fv-menu-sub-flyout label="Actions">
    <fv-menu-item-flyout label="New"> </fv-menu-item-flyout>
    <fv-menu-sub-flyout label="Remove">
      <fv-menu-item-flyout label="Item"> </fv-menu-item-flyout>
    </fv-menu-sub-flyout>
  </fv-menu-sub-flyout>
  <hr />
  <fv-menu-item-flyout> </fv-menu-item-flyout>
  <fv-menu-item-flyout> </fv-menu-item-flyout>
</fv-menuFlyout>
```

### MenuFlyout Custom Block

<ClientOnly>
<div :style="divStyle">
<fv-menu-flyout :theme="$theme">
  <fv-menu-block-flyout>
    <template v-slot:header>Actions</template>
    <fv-menu-item-flyout label="New" @click="alert('New');">
    </fv-menu-item-flyout>
    <fv-menu-item-flyout label="Remove" @click="alert('Remove');">
    </fv-menu-item-flyout>
  </fv-menu-block-flyout>
  <hr/>
  <fv-menu-block-flyout>
    <template v-slot:header>Share</template>
    <fv-menu-sub-flyout label="Microsoft" :spilt="true">
      <fv-menu-item-flyout label="outlook" icon="OutlookLogo16">
      </fv-menu-item-flyout>
      <fv-menu-item-flyout label="github" icon="GitGraph" @click="go('https://github.com')">
      </fv-menu-item-flyout>
    </fv-menu-sub-flyout>
  </fv-menu-block-flyout>
</fv-menu-flyout>
</div>
</ClientOnly>

```vue
<fv-menu-flyout>
  <fv-menu-block-flyout>
    <template v-slot:header>Actions</template>
    <fv-menu-item-flyout label="New" @click="alert('New');">
    </fv-menu-item-flyout>
    <fv-menu-item-flyout label="Remove" @click="alert('Remove');">
    </fv-menu-item-flyout>
  </fv-menu-block-flyout>
  <hr/>
  <fv-menu-block-flyout>
    <template v-slot:header>Share</template>
    <fv-menu-sub-flyout label="Microsoft" :spilt="true">
      <fv-menu-item-flyout label="outlook" icon="OutlookLogo16">
      </fv-menu-item-flyout>
      <fv-menu-item-flyout label="github" icon="GitGraph" @click="go('https://github.com')">
      </fv-menu-item-flyout>
    </fv-menu-sub-flyout>
  </fv-menu-block-flyout>
</fv-menu-flyout>
```

### MenuFlyout Checkable

<ClientOnly>
<div :style="divStyle">
<fv-menuFlyout :checkable="true" :theme="$theme" label="Files">
<fv-menu-sub-flyout label="Show">
  <fv-menu-item-flyout label="Name" /> 
  <fv-menu-item-flyout label="Time" />
  <fv-menu-item-flyout label="Author" />
</fv-menu-sub-flyout>
<fv-menu-item-flyout label="This is a long text for menuflyout item" />
<fv-menu-sub-flyout label="disabled" :disabled="true" />
<fv-menu-item-flyout label="disabledItem" :disabled="true" />
</fv-menuFlyout>
</div>
</ClientOnly>

``` vue
<fv-menuFlyout :checkable="true" :theme="$theme">
<fv-menu-sub-flyout label="Show">
  <fv-menu-item-flyout label="Name" /> 
  <fv-menu-item-flyout label="Time" />
  <fv-menu-item-flyout label="Author" />
</fv-menu-sub-flyout>
<fv-menu-item-flyout label="This is a long text for menuflyout item" />
</fv-menuFlyout>
```

### MenuFlyout Disabled

<ClientOnly>
<div :style="divStyle">
<fv-menuFlyout :checkable="true" :theme="$theme" label="Files" :disabled="true">
<fv-menu-sub-flyout label="Show">
  <fv-menu-item-flyout label="Name" /> 
  <fv-menu-item-flyout label="Time" />
  <fv-menu-item-flyout label="Author" />
</fv-menu-sub-flyout>
<fv-menu-item-flyout label="This is a long text for menuflyout item" />
</fv-menuFlyout>
</div>
</ClientOnly>

``` vue
<fv-menuFlyout :checkable="true" :theme="$theme" label="Files" :disabled="true">
<fv-menu-sub-flyout label="Show">
  <fv-menu-item-flyout label="Name" /> 
  <fv-menu-item-flyout label="Time" />
  <fv-menu-item-flyout label="Author" />
</fv-menu-sub-flyout>
<fv-menu-item-flyout label="This is a long text for menuflyout item" />
</fv-menuFlyout>
```

### MenuFlyout Custom Style

<ClientOnly>
  <div :style="divStyle">
  <fv-menuFlyout :checkable="true" label="Files" theme="dark" :beak="15" backgroundColor="#00cc99" color="#fff" borderColor="#00cc99">
  <fv-menu-sub-flyout label="Show">
    <fv-menu-item-flyout label="Name" /> 
    <fv-menu-item-flyout label="Time" />
    <fv-menu-item-flyout label="Author" />
  </fv-menu-sub-flyout>
  <fv-menu-item-flyout label="This is a long text for menuflyout item" />
  <fv-menu-block-flyout>
  <template v-slot:header>
  Share
  </template>
  <fv-menu-item-flyout label="github">
  </fv-menu-item-flyout>
   <fv-menu-item-flyout label="codeforces" :disabled="true">
  </fv-menu-item-flyout>
  </fv-menu-block-flyout>
  </fv-menuFlyout>
  </div>
</ClientOnly>

``` vue
 <fv-menuFlyout :checkable="true" label="Files" theme="dark" backgroundColor="#00cc99" color="#fff" borderColor="#00cc99">
  <fv-menu-sub-flyout label="Show">
    <fv-menu-item-flyout label="Name" /> 
    <fv-menu-item-flyout label="Time" />
    <fv-menu-item-flyout label="Author" />
  </fv-menu-sub-flyout>
  <fv-menu-item-flyout label="This is a long text for menuflyout item" />
  <fv-menu-block-flyout>
  <template v-slot:header>
  Share
  </template>
  <fv-menu-item-flyout label="github">
  </fv-menu-item-flyout>
  </fv-menu-block-flyout>
  </fv-menuFlyout>
```

### Propoties

---

#### Menu

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) | 说明(statement) |
| :--------: | :--------: | :------------: | :-------------: | :-------------: |
| label | [string] | No | 'Click the Menu' | 标签值 |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| disabled | [boolean] | No | false | 是否禁用 |
| checkable | [boolean] | No | false | 是否可选 |
| position | [string] | No | 'bottomLeft' | callout默认位置 |
| beak | [number] | No | 0 | 角标大小，大于等于10时显示 |
| backgroundColor | [string] | No | undefined | 背景色 |
| borderColor | [string] | No | undefined | 按钮边框颜色 |
| color | [string] | No | undefined | 颜色 |

#### SubMenu 

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) | 说明(statement) |
| :--------: | :--------: | :------------: | :-------------: | :-------------: |
| label | [string] | No | 'Click the Menu' | 标签值 |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| disabled | [boolean] | No | false | 是否禁用 |
| checkable | [boolean] | No | false | 是否可选 |
| position | [string] | No | 'rightTop' | callout默认位置 |
| checked.sync | [boolean] | No | false | 是否选中 |
| backgroundColor | [string] | No | undefined | 背景色 |
| color | [string] | No | undefined | 颜色 |
| split | [boolean] | No | false | 标签和子菜单是否分离 |
| icon | [string] | No | undefined | Fabric图标 |

#### Item 

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) | 说明(statement) |
| :--------: | :--------: | :------------: | :-------------: | :-------------: |
| label | [string] | No | 'Click the Menu' | 标签值 |
| theme | ['system','dark','light','custom'] | No | 'system' | 主题色 |
| disabled | [boolean] | No | false | 是否禁用 |
| checkable | [boolean] | No | false | 是否可选 |
| checked.sync | [boolean] | No | false | 是否选中 |
| backgroundColor | [string] | No | undefined | 背景色 |
| color | [string] | No | undefined | 颜色 |
| icon | [string] | No | undefined | Fabric图标 |


### Events

---

#### SubMenu

| 事件名(Name) | 参数类型(args) | 说明(statement) |
| :----------: | :------------: | :-------------: |
| click | null | 标签点击触发 |

#### Item

| 事件名(Name) | 参数类型(args) | 说明(statement) |
| :----------: | :------------: | :-------------: |
| click | null | 点击触发 |


### Slot

#### Block

``` vue
<template v-slot:header>
  Header
</template>
```