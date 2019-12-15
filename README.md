## 基于Vue Cli 的组件库模板

### 目录结构

``` bash
- build
- examples 
  - docs # 在线演示文档(VuePress)
  index.js # Vue Cli Lib 打包入口
- lib # 打包文件
- packages
  - {themeName}-theme 
    index.scss # 全局scss 由脚本生成
    {ComponentScss}.scss
  - {ComponentName}
    - src # 组件Source
      index.vue # 组件
    index.js # 组件入口
  index.js # 所有组件入口 由脚本生成
components.json # 组件目录
vue.config.js # Vue cli 配置
```


### 脚本命令(2019-12-9更新)
``` bash
npm run lib # 打包生辰模式
npm run docs:dev # 开发模式，组件DEMO将显示在VuePress文档上
npm run bin:new componentName chineseName #新建组件
npm run bin:remove componentName && npm run bin:entry #移除组件并重新定制入口
npm run bin:entry # 定制入口
```
