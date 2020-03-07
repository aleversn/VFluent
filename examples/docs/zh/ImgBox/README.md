---
  title: ImgBox ImgBox
  sidebarDepth: 2
---
  
[[toc]]

### ImgBox-DEMO

<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" style="width: 350px; height: 350px;"></fv-ImgBox>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" style="width: 350px; height: 350px;"></fv-ImgBox>
```

### ImgBox-Background Image
---
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```

### ImgBox-Lazy Load
---
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/e131600a-b9c7-40e7-aa92-d85db97aed0e.jpg" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>

```vue
<fv-ImgBox url="https://rescreator.blob.core.windows.net/slider/e131600a-b9c7-40e7-aa92-d85db97aed0e.jpg" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```

### Propoties
---
|  属性(attr)  | 类型(type) | 必填(required) | 默认值(default) |                 说明(statement)                  |
|:------------:|:----------:|:--------------:|:---------------:|:------------------------------------------------:|
|     url      |  [string]  |      Yes       |       N/A       | Image url, be careful don't use cross-domain url |
|    onlazy    | [boolean]  |       No       |      false      |                 Lazy load image                  |
| onbackground | [boolean]  |       No       |      false      |                Show as background                |

### Events
---
| 事件名(Name) | 参数类型(args) |                           说明(statement)                           |
|:------------:|:--------------:|:-------------------------------------------------------------------:|
|    error     |     object     | Image load failed will call back error function with error message. |