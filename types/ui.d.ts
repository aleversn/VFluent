import Vue, { PluginObject } from 'vue'
import {FluentVueComponent,FluentVueComponentSize,FluentVueHorizontalAlignment,FluentVueTheme } from './component'
import { FvButton } from './button'
import { FvProgressRing } from './progressring'
import { FvCheckBox } from './checkbox'
import { FvDropDown } from './dropdown'
import { FvProgressBar } from './progressbar'
import { FvFlipView } from './flipview'
import { FvToggleSwitch } from './toggleswitch'
import { FvSlider } from './slider'
import { FvCalendarView } from './calendarview'
import { FvColorPicker } from './colorpicker'
import { FvTextBox } from './textbox'
import { FvRadioGroup } from './radiogroup'
import { FvRadio } from './radio'
import { FvCallout } from './callout'
import { FvImgBox } from './imgbox'
import { FvScrollStory } from './scrollstory'
import { FvDetailsList } from './detailslist'
import { FvPivot } from './pivot'
import { FvMenuFlyout } from './menuflyout'
import { FvListView } from './listview'
import { FvNavigationView } from './navigationview'
import { FvTreeView } from './treeview'
import { FvCommandBar } from './commandbar'
import { FvNavigationPanel } from './navigationpanel'
import { FvImage } from './image'
import { FvImg } from './img'
import { FvSearchBox } from './searchbox'
import { FvCalendarDatePicker } from './calendardatepicker'
import { FvWebWindow } from './webwindow'
import { FvDatePicker } from './datepicker'
import { FvPersona } from './persona'
import { FvCombobox } from './combobox'
import { FvTimePicker } from './timepicker'
import { FvShimmer } from './shimmer'
import { FvMessageBar } from './messagebar'
import { FvInfoBox } from './infobox'
import { FvDrawer } from './drawer'
import { FvBadge } from './badge'
import { FvPanel } from './panel'

export function install (vue: typeof Vue): void
export type ComponentSize = FluentVueComponentSize
export type Component = FluentVueComponent
export type HorizontalAlignment = FluentVueHorizontalAlignment
export type Theme = FluentVueTheme

/** Button component */
  export class Button extends FvButton {}
/** ProgressRing component */
  export class ProgressRing extends FvProgressRing {}
/** CheckBox component */
  export class CheckBox extends FvCheckBox {}
/** DropDown component */
  export class DropDown extends FvDropDown {}
/** ProgressBar component */
  export class ProgressBar extends FvProgressBar {}
/** FlipView component */
  export class FlipView extends FvFlipView {}
/** ToggleSwitch component */
  export class ToggleSwitch extends FvToggleSwitch {}
/** Slider component */
  export class Slider extends FvSlider {}
/** CalendarView component */
  export class CalendarView extends FvCalendarView {}
/** ColorPicker component */
  export class ColorPicker extends FvColorPicker {}
/** TextBox component */
  export class TextBox extends FvTextBox {}
/** RadioGroup component */
  export class RadioGroup extends FvRadioGroup {}
/** Radio component */
  export class Radio extends FvRadio {}
/** Callout component */
  export class Callout extends FvCallout {}
/** ImgBox component */
  export class ImgBox extends FvImgBox {}
/** ScrollStory component */
  export class ScrollStory extends FvScrollStory {}
/** DetailsList component */
  export class DetailsList extends FvDetailsList {}
/** Pivot component */
  export class Pivot extends FvPivot {}
/** MenuFlyout component */
  export class MenuFlyout extends FvMenuFlyout {}
/** ListView component */
  export class ListView extends FvListView {}
/** NavigationView component */
  export class NavigationView extends FvNavigationView {}
/** TreeView component */
  export class TreeView extends FvTreeView {}
/** CommandBar component */
  export class CommandBar extends FvCommandBar {}
/** NavigationPanel component */
  export class NavigationPanel extends FvNavigationPanel {}
/** Image component */
  export class Image extends FvImage {}
/** Img component */
  export class Img extends FvImg {}
/** SearchBox component */
  export class SearchBox extends FvSearchBox {}
/** CalendarDatePicker component */
  export class CalendarDatePicker extends FvCalendarDatePicker {}
/** WebWindow component */
  export class WebWindow extends FvWebWindow {}
/** DatePicker component */
  export class DatePicker extends FvDatePicker {}
/** Persona component */
  export class Persona extends FvPersona {}
/** Combobox component */
  export class Combobox extends FvCombobox {}
/** TimePicker component */
  export class TimePicker extends FvTimePicker {}
/** Shimmer component */
  export class Shimmer extends FvShimmer {}
/** MessageBar component */
  export class MessageBar extends FvMessageBar {}
/** InfoBox component */
  export class InfoBox extends FvInfoBox {}
/** Drawer component */
  export class Drawer extends FvDrawer {}
/** Badge component */
  export class Badge extends FvBadge {}
/** Panel component */
  export class Panel extends FvPanel {}

