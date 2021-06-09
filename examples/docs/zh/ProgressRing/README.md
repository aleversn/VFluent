---
  title: ProgressRing ProgressRing
  sidebarDepth: 2
---
  
[[toc]]

### ProgressRing-DEMO 

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

<fv-progressRing loading="true">
</fv-progressRing>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

### Default ProgressRing
---
<fv-progressRing v-model="percent[0]">
</fv-progressRing>

```vue
<fv-progressRing v-model="percent[0]">
</fv-progressRing>
```

### Indeterminate ProgressRing
---
<fv-progressRing loading="true">
</fv-progressRing>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

### ProgressRing Legacy
---
<fv-progressRing :legacy="true">
</fv-progressRing>

```vue
<fv-progressRing :legacy="true">
</fv-progressRing>
```

### Different Size(Legacy)
---
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>

<fv-progressRing size="m" :legacy="true">
</fv-progressRing>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>

```vue
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>

<fv-progressRing size="m" :legacy="true">
</fv-progressRing>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>
```

### ProgressBar Custom Style
---
1. Custom Foreground
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>

```vue
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>
```

2. Custom Background
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>

```vue
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>
```

### Propoties
---
| 属性(attr)  |     类型(type)     | 必填(required) |    默认值(default)     |                     说明(statement)                      |
|:-----------:|:------------------:|:--------------:|:----------------------:|:--------------------------------------------------------:|
|    value    |      [number]      |       No       |           0            |                    progressRing value                     |
|    size     | ['l','m','s','xs'] |       No       |           xs           | The size of progress ring, only works on legacy versions |
|      r      |      [number]      |       No       |           40           |                Radius of the ProgressRing                |
|   loading   |     [boolean]      |       No       |         false          |               Is progressRing indeterminate               |
|    color    |  [string(color)]   |       No       |  rgba(0, 120, 215, 1)  |                The color of progress ring                |
| background  |  [string(color)]   |       No       | rgba(204, 204, 204, 1) |                                                          |
| borderWidth |      [number]      |       No       |           8            |                                                          |
|   legacy    |     [boolean]      |       No       |         false          |          Use the legacy version of ProgressRing          |