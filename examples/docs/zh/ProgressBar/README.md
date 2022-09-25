---
  title: ProgressBar
  sidebarDepth: 2
---
  
[[toc]]

### ProgressBar-DEMO
---

<script>
export default {
    data () {
        return {
            percent: [10,20,30,35]
        }
    },
    mounted () {
        setInterval(() => {
            for(let item of this.percent) {
                this.$set(this.percent, this.percent.indexOf(item), Math.ceil(Math.random() * 100));
            }
        }, 3000);
    }
}
</script>


<ClientOnly>
<fv-ProgressBar>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar>
</fv-ProgressBar>
```

### Default ProgressBar
---

<ClientOnly>
<fv-ProgressBar v-model="percent[0]">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[0]">
</fv-ProgressBar>
```

### Indeterminate ProgressBar
---

<ClientOnly>
<fv-ProgressBar loading="true">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar loading="true">
</fv-ProgressBar>
```

### ProgressBar Disabled
---
1. Default

<ClientOnly>
<fv-ProgressBar v-model="percent[1]" disabled>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[1]" disabled>
</fv-ProgressBar>
```

2. Indeterminate

<ClientOnly>
<fv-ProgressBar loading="true" disabled>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar loading="true" disabled>
</fv-ProgressBar>
```

### ProgressBar Custom Style
---
1. Custom Foreground

<ClientOnly>
<fv-ProgressBar v-model="percent[2]" foreground="rgba(0,204,153,1)">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[2]" foreground="rgba(0,204,153,1)">
</fv-ProgressBar>
```

2. Custom Background

<ClientOnly>
<fv-ProgressBar v-model="percent[3]" background="rgba(0,204,153,0.6)">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[3]" background="rgba(0,204,153,0.6)">
</fv-ProgressBar>
```



### Propoties
---
| 属性(attr) |   类型(type)    | 必填(required) | 默认值(default) |       说明(statement)        |
|:----------:|:---------------:|:--------------:|:---------------:|:----------------------------:|
|   value    |    Number     |       No       |        0        |      Progressbar value       |
|  loading   |    Boolean    |       No       |      false      | Is progressbar indeterminate |
| foreground | [string(color)] |       No       |       N/A       |                              |
| background | [string(color)] |       No       |       N/A       |                              |
|  disabled  |    Boolean    |       No       |      false      |                              |

### Events
---
|   事件名(Name)    | 参数类型(args) | 说明(statement) |
|:-----------------:|:--------------:|:---------------:|
|  progress-change  |    percent     |                 |
| progress-finished |    percent     |                 |