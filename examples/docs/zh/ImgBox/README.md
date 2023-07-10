---
  title: ImgBox
  sidebarDepth: 2
---
  
[[toc]]

### ImgBox-DEMO
---





<ClientOnly>
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/1444a25f-3e33-44a2-878f-a628342ad88f.jpg" style="width: 350px; height: 350px;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/1444a25f-3e33-44a2-878f-a628342ad88f.jpg" style="width: 350px; height: 350px;"></fv-ImgBox>
```

### ImgBox-Background Image
---

<ClientOnly>
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/1444a25f-3e33-44a2-878f-a628342ad88f.jpg" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/1444a25f-3e33-44a2-878f-a628342ad88f.jpg" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```

### ImgBox-Lazy Load
---

<ClientOnly>
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/f2fcea9e-e31b-4a1e-87be-9241531c7dc6.jpg" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/f2fcea9e-e31b-4a1e-87be-9241531c7dc6.jpg" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```


</ClientOnly>


### Propoties
---
|  属性(attr)  |     类型(type)     |   必填(required)    |                   默认值(default)                    |                 说明(statement)                  |
|:------------:|:------------------:|:-------------------:|:----------------------------------------------------:|:------------------------------------------------:|
|     url      |      String      |         Yes         |                         N/A                          | Image url, be careful don't use cross-domain url |
|    onlazy    |     Boolean      |         No          |                        false                         |                 Lazy load image                  |
| loadingColor | [string(color)] No | rgba(0, 90, 158, 1) | The foreground of the progress-ring or progress-bar. |                                                  |
| onbackground |     Boolean      |         No          |                        false                         |                Show as background                |

### Events
---
| 事件名(Name) | 参数类型(args) |                           说明(statement)                           |
|:------------:|:--------------:|:-------------------------------------------------------------------:|
|    error     |     object     | Image load failed will call back error function with error message. |