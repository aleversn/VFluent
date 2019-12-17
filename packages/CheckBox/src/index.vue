<template>
<div :class="['fv-'+$theme+'-checkBox', boxSide == 'end' ? 'box-side-end' : '']" @click="Checked">
    <div class="checkbox-rec" :class="{disabled: isDisabled}">
        <p class="border" :class="{check: isCheck}" :style="styles.border"></p>
        <transition name="font-scale-in">
            <p v-show="isCheck" class="checkbox-content ms-Icon ms-Icon--CheckMark" :style="styles.checkBoxContent"></p>
        </transition>
        <transition name="font-scale-in">
            <p v-show="Indeterminate" class="checkbox-content ms-Icon ms-Icon--CheckboxIndeterminate" :style="styles.Indeterminate"></p>
        </transition>
    </div>
    <span class="text-content-block" :style="styles.textContentBlock"><slot></slot></span>
</div>
</template>

<script>
import 'office-ui-fabric-core/dist/css/fabric.min.css';

export default {
    name: "FvCheckBox",
    props: {
        value: {
            default: ''
        },
        borderWidth: {
            default: ''
        },
        borderColor: {
            type: String,
            default: ''
        },
        foreground: {
            default: ''
        },
        background: {
            type: String,
            default: 'rgba(0,120,215,0.9)'
        },
        theme: {
            type: String,
            default: 'system'
        },
        boxSide: {
            default: 'start'
        },
        disabled: {
            default: false
        }
    },
    data () {
        return {
            isCheck: this.value,
            styles: {
                border: {
                    borderColor: '',
                    borderWidth: '2px'
                },
                checkBoxContent: {
                    background: 'rgba(0,120,215,0.9)'
                },
                Indeterminate: {
                    color: 'rgba(0,120,215,0.9)'
                },
                textContentBlock: {
                    color: ''
                }
            }
        };
    },
    watch: {
        borderWidth (val) {
            this.stylesInit();
        },
        borderColor (val) {
            this.stylesInit();
        },
        foreground (val) {
            this.stylesInit();
        },
        background (val) {
            this.stylesInit();
        },
        isCheck (val) {
            this.$emit('input', val);
        }
    },
    computed: {
        $theme () {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        Indeterminate () {
            return (this.isCheck === '' || this.isCheck === undefined);
        },
        isDisabled () {
            return this.disabled.toString() == 'true' || this.disabled == 'disabled' || this.disabled === '';
        }
    },
    mounted () {
        this.stylesInit();
        this.isCheck = this.value;
    },
    methods: {
        stylesInit () {
            this.styles.checkBoxContent.background = this.background;
            this.styles.Indeterminate.color = this.background;
            this.styles.border.borderWidth = `${this.borderWidth}px`;
            this.styles.border.borderColor = this.borderColor;
            this.styles.textContentBlock.color = this.foreground;
        },
        Checked () {
            if(this.isDisabled)
                return 0;
            this.isCheck = !this.isCheck;
            this.$emit('click', this.isCheck);   //@event click//
        }
    }
};
</script>
