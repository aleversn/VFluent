---
title: Image Image
sidebarDepth: 2
---

[[toc]]

### Image-DEMO

<ClientOnly>
<div style="width: 100%; height: 500px;">
    <fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Image>
</div>

<div style="width: 100%; height: 500px;">
    <fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Image>
</div>

### Image-Lazy Load

---

<div style="width: 100%; height: 500px;">
    <fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Image>
</div>
</ClientOnly>

### Propoties

---

| 属性(attr) | 类型(type) | 必填(required) | 默认值(default) |           说明(statement)            |
| :--------: | :--------: | :------------: | :-------------: | :----------------------------------: |
|    src     |  [string]  |      Yes       |       N/A       | 图像 src, 支持跨域加载, 但不支持缓存 |
|   onlazy   | [boolean]  |       No       |      false      |            是否开启懒加载            |
