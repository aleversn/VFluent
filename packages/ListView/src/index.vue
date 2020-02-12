<template>
<div :class="'fv-'+$theme+'-ListView'">
    <div class="container">
        <span v-for="(item, index) in thisValue" class="item" :key="index">
            <slot>
                <p>{{item.name}}</p>
            </slot>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: 'FvListView',
    props: {
        value: {
            default: () => []
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: []
        }
    },
    watch: {
        value (val) {
            this.valueInit();
        }
    },
    computed: {
        borderLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.FRInit();
        this.valueInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffects("body", {
                selector: `.fv-${this.$theme}-ListView .container .item`,
                borderGradientSize: 30,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        valueInit () {
            this.thisValue = this.value;
        }
    }
}
</script>
