---
  title: Img Img
  sidebarDepth: 2
---
  
[[toc]]

### Img-DEMO


<div style="width: 100%; height: 500px;">
    
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
```

<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
```

### Img-Lazy Load
---
<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
```


### Propoties
---
|  属性(attr)  |     类型(type)     |   必填(required)    |                   默认值(default)                    |                                              说明(statement)                                              |
|:------------:|:------------------:|:-------------------:|:----------------------------------------------------:|:---------------------------------------------------------------------------------------------------------:|
|     src      |      String      |         Yes         |                         N/A                          | 图像资源路径, 支持跨域和本域, 本域下将默认启用ImgBox进行缓存管理, 跨域时启用Image进行加载, 但无法实现缓存 |
|    onlazy    |     Boolean      |         No          |                        false                         |                                              Lazy load image                                              |
| loadingColor | [string(color)] No | rgba(0, 90, 158, 1) | The foreground of the progress-ring or progress-bar. |                                                                                                           |
| onbackground |     Boolean      |         No          |                        false                         |                                            Show as background                                             |
