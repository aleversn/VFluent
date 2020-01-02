<template>
<div :class="'fv-'+$theme+'-button'">
    <div class="reveal-border" :class="{disabled: isDisabled}" :style="styles.revealBorder">
        <button :disabled="disabled" class="button-container" :style="styles.buttonContainer" @click="onClick">
            <span class="content-block" :style="styles.contentBlock">
                <i class="ms-Icon" :class="`ms-Icon--${icon}`" :style="{'margin-right': icon != '' ? '5px': ''}"></i>
                <slot>
                    Button
                </slot>
            </span>
        </button>
    </div>
</div>
</template>

<script>
import 'office-ui-fabric-core/dist/css/fabric.min.css';
import { FluentRevealEffect } from "fluent-reveal-effect";

export default {
    name: "FvButton",
    props: {
        icon: {
            default: '',
            type: String
        },
        theme: {
            default: 'system',
            type: String
        },
        foreground: {
            default: '',
            type: String
        },
        background: {
            default: '',
            type: String
        },
        fontWeight: {
            default: 'normal',
            type: String
        },
        disabled: {
            default: false,
            type: Boolean
        },
        borderWidth: {
            default: 2,
            type: Number
        }
    },
    data () {
        return {
            styles: {
                revealBorder: {
                    padding: '2px'
                },
                buttonContainer: {
                    background: ''
                },
                contentBlock: {
                    color: '',
                    fontWeight: 'normal'
                }
            }
        }
    },
    watch: {
        theme (val) {
            this.FRInit();
        },
        borderWidth (val) {
            this.stylesInit();
        },
        foreground (val) {
            this.stylesInit();
        },
        background (val) {
            this.stylesInit();
        },
        fontWeight (val) {
            this.stylesInit();
        }
    },
    computed: {
        $theme () {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        borderLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
        },
        backgroundLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
        },
        isDisabled () {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        }
    },
    mounted () {
        this.FRInit();
        this.stylesInit();
    },
    methods: {
        FRInit () {
            FluentRevealEffect.applyEffect('body', {
                clickEffect: true,
                lightColor: this.borderLightColor,
                gradientSize: 80,
                isContainer: true,
                children: {
                    borderSelector: `.fv-${this.$theme}-button .reveal-border`,
                    elementSelector: `.fv-${this.$theme}-button .button-container`,
                    lightColor: this.backgroundLightColor,
                    gradientSize: 120
                }
            });
        },
        stylesInit () {
            this.styles.revealBorder.padding = `${this.borderWidth}px`;
            this.styles.contentBlock.color = this.foreground;
            this.styles.buttonContainer.background = this.background;
            this.styles.contentBlock.fontWeight = this.fontWeight;
        },
        onClick (event) {
            this.$emit('click', event);
        }
    }
};
</script>
