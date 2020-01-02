import Vue from 'vue'

/** declare FluentVue Component */
export declare class FluentVueComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type FluentVueComponentSize =  'l' | 'm'  | 's' | 'xs' 

/** Horizontal alignment */
export type FluentVueHorizontalAlignment = 'left' | 'center' | 'right'

export type FluentVueTheme = 'light' | 'dark' | 'system' | 'custom'