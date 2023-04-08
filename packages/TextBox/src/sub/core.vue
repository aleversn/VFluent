<template>
<div class="text-box-container">
    <input v-if="mode == 'default'" v-model="thisValue" :type="type" :placeholder="placeholder" class="fv-text-box-input" :readonly="isReadOnly" :disabled="isDisabled" :maxlength="maxlength" ref="input" :style="{'font-size': `${fontSize}px`, 'font-weight': fontWeight, color: foreground, 'text-align': textAlign}" @keydown="keyDown" @keyup="$emit('keyup', $event)" @change="$emit('change', $event)" @paste="$emit('paste', $event)" @focus="$emit('update:focus', true)" @blur="$emit('update:focus', false)"/>
    <mask-input v-if="mode == 'mask'" ref="mask_input" v-model="thisMaskValue" :type="type" :placeholder="placeholder" :mask="mask" :flag="flag" :pattern="pattern" :readonly="isReadOnly" :disabled="isDisabled" :fontSize="fontSize" :fontWeight="fontWeight" :textAlign="textAlign" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)" @change="$emit('change', $event)" @paste="$emit('paste', $event)" @focus="$emit('update:focus', true)" @blur="$emit('update:focus', false)"></mask-input>
</div>
</template>

<script>
import maskInput from './mask.vue';

export default {
    components: {
        maskInput
    },
    props: {
        value: {
            default: ""
        },
        mode: {
            default: "default"
        },
        placeholder: {
            default: ""
        },
        type: {
            default: "text"
        },
        mask: {
            type: String,
            default: "mask:___"
        },
        flag: {
            type: String,
            default: "_"
        },
        pattern: {
            type: String,
            default: "[\S\s]*"
        },
        readonly: {
            default: false
        },
        focus: {
            default: false
        },
        maxlength: {
            default: ''
        },
        disabled: {
            default: false
        },
        fontSize: {
            default: 13.3
        },
        fontWeight: {
            default: 'normal'
        },
        foreground: {
            default: ""
        },
        textAlign: {
            default: 'left'
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: (typeof(this.value)).toString() == 'string' ? this.value : '',
            thisMaskValue: (typeof(this.value)).toString() == 'object' ? this.value : [],
            thisPattern: new RegExp(this.partten)
        };
    },
    watch: {
        value (val) {
            if((typeof(val)).toString() == 'string')
                this.thisValue = val;
            else
                this.thisMaskValue = val;
        },
        mode (val) {
            if(val == 'default')
                this.thisValue = "";
            else
                this.thisMaskValue = [];
        },
        thisValue (val) {
            this.$emit("input", val);
        },
        thisMaskValue (val) {
            this.$emit("input", val);
        },
        pattern (val) {
            this.thisPattern = new RegExp(val);
        }
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        isReadOnly () {
            return (
                this.readonly.toString() == "true" ||
                this.readonly == "readonly" ||
                this.readonly === ""
            );
        },
        isDisabled () {
            return (
                this.disabled.toString() == "true" ||
                this.disabled == "disabled" ||
                this.disabled === ""
            );
        }
    },
    mounted () {
        this.thisPattern = new RegExp(this.pattern);
    },
    methods: {
        keyDown (event) {
            this.$emit("keydown", event);
            if(!event.key) return;
            if(!this.thisPattern.test(event.key))
                event.preventDefault();
        },
        focusInspect () {
            if(this.mode == 'mask')
                this.$refs.mask_input.focusInspect();
            else
                this.$refs.input.focus();
        }
    }
};
</script>