<template>
<div class="container">
    <input v-if="mode == 'default'" v-model="thisValue" :type="type" :placeholder="placeholder" class="input" :readonly="isReadOnly" :disabled="isDisabled" :maxlength="maxlength" ref="input" @keydown="keyDown" @keyup="$emit('keyup', $event)" @focus="$emit('update:focus', true)" @blur="$emit('update:focus', false)"/>
    <mask-input v-if="mode == 'mask'" v-model="thisMaskValue" :type="type" :placeholder="placeholder" :mask="mask" :flag="flag" :pattern="pattern" :readonly="isReadOnly" :disabled="isDisabled" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)" @focus="$emit('update:focus', true)" @blur="$emit('update:focus', false)"></mask-input>
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
        
    },
    methods: {
        keyDown (event) {
            this.$emit("keydown", event);
            if(!event.key.match(this.thisPattern))
                event.preventDefault();
        }
    }
};
</script>