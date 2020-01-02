/**
 * 
 */
module.exports=`import Vue, { PluginObject } from 'vue'
import {{{ProjectName}}Component,{{ProjectName}}ComponentSize,{{ProjectName}}HorizontalAlignment,{{ProjectName}}Theme } from './component'
{{importTs}}

export function install (vue: typeof Vue): void
export type ComponentSize = {{ProjectName}}ComponentSize
export type Component = {{ProjectName}}Component
export type HorizontalAlignment = {{ProjectName}}HorizontalAlignment
export type Theme = {{ProjectName}}Theme

{{exportTs}}
`