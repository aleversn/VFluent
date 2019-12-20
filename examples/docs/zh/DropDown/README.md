---
  title: DropDown DropDown
  sidebarDepth: 2
---
  
[[toc]]

### DropDown-DEMO 

<fv-DropDown placeholder="Select an option"></fv-DropDown>

### DropDown-Disabled
---
<fv-DropDown placeholder="Select an option" disabled></fv-DropDown>

### DropDown-Multiple Select
---
<fv-DropDown placeholder="Select options" :multiple="true"></fv-DropDown>

### DropDown-Customize
---
1. Custom List Item
<fv-DropDown placeholder="Select an option"><template v-slot:options="item"><p>{{item.index}}</p></template></fv-DropDown>

2. Custom Style
<fv-DropDown placeholder="Select options" :multiple="true" borderWidth="1" borderRadius="5" inputBackground="rgba(0,204,153,0.9)" inputForeground="whitesmoke" dropDownIcon="AddTo" dropDownIconForeground="whitesmoke" dropDownListForeground="rgba(0,204,153,1)" dropDownListBackground="rgba(239,239,239,0.6)"></fv-DropDown>

3. Custom Drop Down Input
<fv-DropDown placeholder="Select options" :multiple="true"><template v-slot:input="x"><i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i><input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px;"/><i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i></template></fv-DropDown>

### DropDown-Show Error
---
<fv-DropDown placeholder="Select an option" :showError="true"></fv-DropDown>

### DropDown-Dark Theme
---
1. Single Selection
<fv-DropDown placeholder="Select an option" theme="dark"></fv-DropDown>

2. Multiple Selections
<fv-DropDown placeholder="Select an option" theme="dark" :multiple="true"></fv-DropDown>

### Propoties
---
|       属性(attr)       |             类型(type)             | 必填(required) |      默认值(default)       |      说明(statement)      |
|:----------------------:|:----------------------------------:|:--------------:|:--------------------------:|:-------------------------:|
|         value          |              [array]               |       No       |            N/A             |       Choosed Value       |
|        options         |              [array]               |       No       |            N/A             |  Dropdown options array   |
|        multiple        |             [boolean]              |       No       |            N/A             | Is enable multiple select |
|      borderWidth       |              [number]              |       No       |             2              |   Dropdown border width   |
|      borderRadius      |              [number]              |       No       |             3              |  Dropdown border radius   |
|      placeholder       |              [string]              |       No       |          Dropdown          |   Dropdown placeholder    |
|    inputForeground     |          [string(color)]           |       No       |            N/A             |                           |
| dropDownListForeground |          [string(color)]           |       No       |    rgba(0,120,215,0.9)     |                           |
|    inputBackground     |          [string(color)]           |       No       |            N/A             |                           |
| dropDownListBackground |          [string(color)]           |       No       |            N/A             |                           |
|      dropDownIcon      |              [string]              |       No       |        ChevronDown         |   Icon with Fabric-Icon   |
| dropDownIconForeground |          [string(color)]           |       No       |            N/A             |                           |
|       showError        |             [boolean]              |       No       |           false            |                           |
|      errorMessage      |              [string]              |       No       | This dropdown has an error |                           |
|        disabled        |             [boolean]              |       No       |           false            |                           |
|         theme          | ['light','dark','custom','system'] |       No       |           system           |      Dropdown theme       |

### Events
---
| 事件名(Name) | 参数类型(args) |   说明(statement)    |
|:------------:|:--------------:|:--------------------:|
|    change    |     event      | Dropdown choose item |