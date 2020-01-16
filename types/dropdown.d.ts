import {FluentVueComponent,FluentVueTheme} from './component'

/**
 * FvDropDown Component
 */
export declare class FvDropDown extends FluentVueComponent{
  theme:FluentVueTheme
  disabled:boolean
  value:Array<object> | Array<number> | Array<string>
  options:Array<object> | Array<number> | Array<string>
  multiple:boolean
  borderWidth:number
  borderRadius:number
  placeholder:number
  maxHeight:number
  inputForeground:string
  dropDownListForeground	:string
  inputBackground:string
  dropDownListBackground	:string
  dropDownIcon:string
  dropDownIconForeground:string
  showError:boolean
  errorMessage:string
  setFocus:boolean
}
