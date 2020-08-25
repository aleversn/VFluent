<template>
<div :class="['fv-'+$theme+'-Badge']">
    <slot>
        <p>Badge</p>
    </slot>
    <sup v-show="!hidden" class="fv-badge-container" :class="{dot: isDot}" :style="{background: finalColor}">
        <p class="badge-content">
            {{finalValue}}
        </p>
    </sup>
</div>
</template>

<script>
export default {
    name: 'FvBadge',
    props: {
        value: {
            default: ""
        },
        max: {
            default: Infinity
        },
        isDot: {
            default: false
        },
        hidden: {
            default: false
        },
        type: {
            default: "default"
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            colorList: {
                'default': '#f56c6c',
                'primary': '#409eff',
                'success': 'rgba(0, 204, 153, 1)',
                'warning': '#e6a23c',
                'danger': '#f56c6c',
                'info': '#909399'
            }
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
        }
    },
    computed: {
        finalValue () {
            if(this.thisValue * 1 > this.max * 1)
                return `${this.max}+`;
            return this.thisValue;
        },
        finalColor () {
            if(!this.colorList[this.type])
                return this.type;
            return this.colorList[this.type];
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    }
}
</script>
