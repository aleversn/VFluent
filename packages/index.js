import './light-theme/index.scss'
import './dark-theme/index.scss'
import './custom-theme/index.scss'
// Script Gen, Wanring: Edit template instead of it
import global from './global.js'
import {SDate} from './usual.js'
import {SUtility} from './usual.js'
import {RevealEffects} from './usual.js'
import '../examples/style/global-transition.css'
import 'office-ui-fabric-core/dist/css/fabric.min.css'
import Button from '@/Button/index.js'
import ProgressRing from '@/ProgressRing/index.js'
import CheckBox from '@/CheckBox/index.js'
import DropDown from '@/DropDown/index.js'
import ProgressBar from '@/ProgressBar/index.js'
import FlipView from '@/FlipView/index.js'
import ToggleSwitch from '@/ToggleSwitch/index.js'
import Slider from '@/Slider/index.js'
import CalendarView from '@/CalendarView/index.js'
import ColorPicker from '@/ColorPicker/index.js'
import TextBox from '@/TextBox/index.js'
import RadioGroup from '@/RadioGroup/index.js'
import Radio from '@/Radio/index.js'
import Callout from '@/Callout/index.js'
import ImgBox from '@/ImgBox/index.js'
import ScrollStory from '@/ScrollStory/index.js'
import DetailsList from '@/DetailsList/index.js'
import Pivot from '@/Pivot/index.js'
import MenuFlyout from '@/MenuFlyout/index.js'
import ListView from '@/ListView/index.js'
import NavigationView from '@/NavigationView/index.js'
import TreeView from '@/TreeView/index.js'
import CommandBar from '@/CommandBar/index.js'
import NavigationPanel from '@/NavigationPanel/index.js'
import Image from '@/Image/index.js'
import Img from '@/Img/index.js'
import SearchBox from '@/SearchBox/index.js'
import CalendarDatePicker from '@/CalendarDatePicker/index.js'
import WebWindow from '@/WebWindow/index.js'
import DatePicker from '@/DatePicker/index.js'
import Persona from '@/Persona/index.js'
import Combobox from '@/Combobox/index.js'


let components = [
  Button,
  ProgressRing,
  CheckBox,
  DropDown,
  ProgressBar,
  FlipView,
  ToggleSwitch,
  Slider,
  CalendarView,
  ColorPicker,
  TextBox,
  RadioGroup,
  Radio,
  Callout,
  ImgBox,
  ScrollStory,
  DetailsList,
  Pivot,
  MenuFlyout,
  ListView,
  NavigationView,
  TreeView,
  CommandBar,
  NavigationPanel,
  Image,
  Img,
  SearchBox,
  CalendarDatePicker,
  WebWindow,
  DatePicker,
  Persona,
  Combobox,

]

const install = function(Vue){
  if (install.installed) return
  Vue.prototype.$fvGlobal=global
  Vue.prototype.$SDate=SDate
  Vue.prototype.$SUtility=SUtility
  Vue.prototype.$RevealEffects=RevealEffects
  components.map(component => Vue.use(component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
    Button,
  ProgressRing,
  CheckBox,
  DropDown,
  ProgressBar,
  FlipView,
  ToggleSwitch,
  Slider,
  CalendarView,
  ColorPicker,
  TextBox,
  RadioGroup,
  Radio,
  Callout,
  ImgBox,
  ScrollStory,
  DetailsList,
  Pivot,
  MenuFlyout,
  ListView,
  NavigationView,
  TreeView,
  CommandBar,
  NavigationPanel,
  Image,
  Img,
  SearchBox,
  CalendarDatePicker,
  WebWindow,
  DatePicker,
  Persona,
  Combobox,

}

