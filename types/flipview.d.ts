import {FluentVueComponent,FluentVueTheme} from './component'

/**
 * FvFlipView Component
 */
export declare class FvFlipView extends FluentVueComponent{
  theme:FluentVueTheme
  value:Array<string>
  direction:'horizontal' |'vertical'
  animation:string
  duration:number
  autoPlay:boolean
  autoPlayDuration:number
  showControlPanel:''|'hidden'|'hover'
  mask:string
}
