import {FluentVueComponent,FluentVueTheme} from './component'

/**
 * FvSlider Component
 */
export declare class FvSlider extends FluentVueComponent{
  theme:FluentVueTheme
  disabled:boolean
  value:number
  unit:number
  mininum:number
  maxinum:number
  icon:number
  vertical:number
  showLabel:boolean
  scale:boolean | number
  color:string
}
