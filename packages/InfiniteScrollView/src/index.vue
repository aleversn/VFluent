<template>
    <div :class="['fv-'+$theme+'-InfiniteScrollView']">
        <slot :thisValue="thisValue" :dynamicValue="dynamicValue">
            <p v-for="(item, index) in dynamicValue" :key="index">{{item}}</p>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'FvInfiniteScrollView',
    props: {
        value: {
            default: () => []
        },
        batchSize: {
            default: 30
        },
        offset: {
            default: 100
        },
        static: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            dynamicValue: [],
            lock: true,
            looper: true
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
            this.dataChange();
        },
        static () {
            this.loadMore();
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.init();
        this.lazyLoadInit();
    },
    methods: {
        async init () {
            while(this.looper) {
                if(this.$el.scrollHeight <= this.$el.clientHeight && this.thisValue.length > this.dynamicValue.length) {
                    this.loadMore();
                    this.$emit('init-start');
                }
                else
                    this.$emit('init-end');
                await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(1);
                    }, 100);
                });
            }
        },
        loadMore () {
            if(this.static) {
                this.dynamicValue = this.thisValue;
                return;
            }
            if(!this.lock) return;
            this.lock = false;
            let item = this.dynamicValue[this.dynamicValue.length - 1];
            let index = this.thisValue.indexOf(item);
            let addition = this.thisValue.slice(index + 1, index + this.batchSize + 1);
            this.dynamicValue = this.dynamicValue.concat(addition);
            this.lock = true;
            return addition > 0;
        },
        dataChange () {
            let size = this.dynamicValue.length;
            this.dynamicValue = this.thisValue.slice(0, size);
        },
        lazyLoadInit () {
            this.$el.addEventListener("scroll", event => {
                if(this.$el.scrollHeight - this.$el.scrollTop - this.$el.clientHeight < this.offset)
                    this.$emit("lazyload", this.loadMore());
            });
        }
    },
    beforeDestroy () {
        this.looper = false;
    }
}
</script>
