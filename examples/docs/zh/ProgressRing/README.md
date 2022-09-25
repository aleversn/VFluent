---
  title: ProgressRing
  sidebarDepth: 2
---
  
[[toc]]

### ProgressRing-DEMO
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
<fv-progressRing loading="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

<ClientOnly>
<fv-progressRing loading="true" r="20" borderWidth="5">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true" r="20" borderWidth="5">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing loading="true" r="10" borderWidth="2">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true" r="10" borderWidth="2">
</fv-progressRing>
```

### Default ProgressRing
---

<ClientOnly>
<fv-progressRing v-model="percent[0]">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing v-model="percent[0]" r="20" borderWidth="5">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]" r="20" borderWidth="5">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing v-model="percent[0]" r="10" borderWidth="2">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]" r="10" borderWidth="2">
</fv-progressRing>
```

### Indeterminate ProgressRing
---

<ClientOnly>
<fv-progressRing loading="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

### ProgressRing Legacy
---

<ClientOnly>
<fv-progressRing :legacy="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing :legacy="true">
</fv-progressRing>
```

### Different Size(Legacy)
---

<ClientOnly>
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>


<ClientOnly>
<fv-progressRing size="m" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>

```vue

<ClientOnly>
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>


<ClientOnly>
<fv-progressRing size="m" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>
```

### ProgressBar Custom Style
---
1. Custom Foreground

<ClientOnly>
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>
```

2. Custom Background

<ClientOnly>
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>
```



### Propoties
---
|  属性(attr)  |     类型(type)     | 必填(required) |    默认值(default)     |                     说明(statement)                      |
|:------------:|:------------------:|:--------------:|:----------------------:|:--------------------------------------------------------:|
|    value     |      Number      |       No       |           0            |                    progressRing value                    |
|     size     | ['l','m','s','xs'] |       No       |           xs           | The size of progress ring, only works on legacy versions |
|      r       |      Number      |       No       |           40           |                Radius of the ProgressRing                |
|   loading    |     Boolean      |       No       |         false          |              Is progressRing indeterminate               |
|    color     |  [string(color)]   |       No       |  rgba(0, 90, 158, 1)  |                The color of progress ring                |
| loadingColor |  [string(color)]   |       No       |  rgba(0, 90, 158, 1)  |                                                          |
|  background  |  [string(color)]   |       No       | rgba(204, 204, 204, 1) |                                                          |
| borderWidth  |      Number      |       No       |           8            |                                                          |
|    legacy    |     Boolean      |       No       |         false          |          Use the legacy version of ProgressRing          |

