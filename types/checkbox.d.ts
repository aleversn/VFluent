import {FluentVueComponent,FluentVueTheme} from './component'

/**
 * FvCheckBox Component
 */
export declare class FvCheckBox extends FluentVueComponent{
  theme:FluentVueTheme
  disabled:boolean
  value:boolean
  foreground:string
  background:string
  borderColor:string
  boxSide: 'start' | 'end'
  borderWidth:number
}
