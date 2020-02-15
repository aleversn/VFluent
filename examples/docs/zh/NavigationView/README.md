---
  title: NavigationView NavigationView
  sidebarDepth: 2
---
  
[[toc]]

### NavigationView-DEMO

<script>
export default {
    data () {
        return {
            options: [
                { name: "Fruits", type: "header"},
                { name: "Apple", icon: "WindowsLogo"},
                { name: "Banana", icon: "DelveAnalyticsLogo"},
                { name: "Orange", icon: "Guitar"},
                { name: "Grape", icon: "HailDay"},
                { name: "", type: "divider" },
                { name: "Vegetables", type: "header"},
                { name: "Broccoli", icon: "QuadColumn"},
                { name: "Carrot", icon: "Quantity"},
                { name: "Lettuce", icon: "TestBeaker"}
            ]
        }
    }
}
</script>

<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### NavigationPanel-Flyout
---
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### NavigationPanel-Mobile Display
---
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000"></fv-NavigationView>
    <fv-img src="https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-le-info-utili-e-le-norme-di-sicurezza.jpg" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>

### Propoties
---
| 属性(attr)  |             类型(type)             | 必填(required) | 默认值(default) |     说明(statement)     |
|:-----------:|:----------------------------------:|:--------------:|:---------------:|:-----------------------:|

### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
  
