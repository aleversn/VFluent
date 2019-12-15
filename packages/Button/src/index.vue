<template>
<div :class="'fv-'+$fvTheme+'-button'">
    <div class="reveal-border" :class="{disabled:(disabled||disabled=='disabled'||disabled=='')}">
        <button :disabled="disabled" class="button-container">
            <span class="content-block">
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
            default: ''
        },
        disabled: {
            default: false
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        theme () {
            return this.$fvTheme;
        },
        borderLightColor () {
            if(this.theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.theme == 'dark' || this.theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
        },
        backgroundLightColor () {
            if(this.theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.theme == 'dark' || this.theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
        }
    },
    mounted () {
        this.FRInit();
    },
    methods: {
        FRInit () {
            FluentRevealEffect.applyEffect('body', {
                clickEffect: true,
                lightColor: this.borderLightColor,
                gradientSize: 80,
                isContainer: true,
                children: {
                    borderSelector: ".reveal-border",
                    elementSelector: ".button-container",
                    lightColor: this.backgroundLightColor,
                    gradientSize: 120
                }
            });
        }
    }
};
</script>
