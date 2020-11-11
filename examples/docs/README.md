---
title: UI
home: true
heroImage: https://raw.githubusercontent.com/aleversn/VFluent/master/examples/assert/logo/VFluent.png
actionLink: /zh/
features:
- title: 基于Fluent Design理念设计
  details: 基于Microsoft Fluent Design System设计理念设计
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2020 Creator SN
---

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        redirect () {
            this.$router.push('zh/Button/');
        }
    }
}
</script>

<div style="width: 100%; height: 80px; display: flex; justify-content: center; align-items: center;">
<fv-button theme="dark" fontSize="16" background="linear-gradient(to right, #11998e, #38ef7d)" borderRadius="3" :isBoxShadow="true" style="width: 128px; height: 58.9px;" @click.native="redirect">快速上手</fv-button>
</div>