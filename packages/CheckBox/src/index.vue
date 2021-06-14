<template>
<div :class="['fv-'+$theme+'-checkBox', boxSide == 'end' ? 'box-side-end' : '']" @click="Checked">
    <div class="checkbox-rec" :class="[{disabled: isDisabled}]">
        <p class="checkbox-border" :class="{check: isCheck}" :style="{background: Indeterminate ? background : '', borderColor: Indeterminate ? 'transparent' : borderColor, borderWidth: `${borderWidth}px`}"></p>
        <transition name="font-scale-in">
            <p v-show="isCheck" class="checkbox-content ms-Icon ms-Icon--CheckMark" :style="{background: background}"></p>
        </transition>
        <transition name="font-scale-in">
            <p v-show="Indeterminate" class="CheckboxIndeterminate"></p>
        </transition>
    </div>
    <span class="text-content-block" :style="{color: foreground}"><slot></slot></span>
</div>
</template>

<script>

export default {
    name: "FvCheckBox",
    props: {
        value: {
            default: ''
        },
        borderWidth: {
            default: 1.5
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
            default: 'rgba(0, 120, 215, 1)'
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
            isCheck: this.value
        };
    },
    watch: {
        value (val) {
            this.isCheck = val;
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
        this.isCheck = this.value;
    },
    methods: {
        Checked () {
            if(this.isDisabled)
                return 0;
            this.isCheck = !this.isCheck;
            this.$emit('click', this.isCheck);   //@event click//
        }
    }
};
</script>
