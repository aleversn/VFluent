<template>
<div class="picker-container" ref="main">
    <button v-for="(item, index) in years" :key="`year: ${index}`" class="picker-btn" :class="{range: item >= currentRange && item - currentRange < 10, current: item == nowYear}" @click="choose(item)">{{item}}</button>
</div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => new Date()
        },
        start: {
            default: 1900
        },
        end: {
            default: 3000
        },
        size: {
            default: 72.5
        },
        theme: {
            default: 'system'
        }
    },
    data () {
        return {
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            years: [],
            currentRange: 0,
            timer: {
                updateRange: {},
                scroller: {}
            },
            lock: {
                slide: true
            }
        };
    },
    watch: {
        currentRange (val) {
            this.$emit('range-change', val);
        }
    },
    computed: {
        $theme() {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        year () {
            return this.thisValue.getFullYear();
        },
        month () {
            return this.thisValue.getMonth();
        },
        date () {
            return this.thisValue.getDate();
        },
        nowYear () {
            return new Date().getFullYear();
        },
        nowMonth () {
            return new Date().getMonth();
        },
        nowDate () {
            return new Date().getDate();
        },
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
        }
    },
    mounted () {
        this.FRInit();
        this.yearsInit();
        this.scrollBottomToLoadInit(80);
        this.scrollTopToLoadInit();
        this.rangeTimerInit();
    },
    methods: {
        FRInit () {
            let FR = new this.$RevealEffectsMasked("body", {
                selector: this.$refs.main,
                childrenSelector: [],
                borderGradientSize: 90,
                backgroundGradientSize: 120,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        yearsInit () {
            let y = [];
            let num = this.year - 8;
            for(let i = 0; i < 28; i++) {
                y.push(num);
                num++;
            }
            this.years = y;
        },
        scrollBottomToLoadInit(offset=0) {
            let target = this.$refs.main;
            target.addEventListener("scroll", event => {
                if(target.scrollTop + offset >= target.scrollHeight - target.clientHeight)
                    this.loadNext();
            });
        },
        scrollTopToLoadInit(offset=0) {
            let target = this.$refs.main;
            target.addEventListener("scroll", event => {
                if(target.scrollTop <= 80)
                    this.loadPrev();
            });
        },
        rangeTimerInit () {
            clearInterval(this.timer.updateRange);
            this.timer.updateRange = setInterval(() => {
                try
                {
                    let scrollTop = this.$refs.main.scrollTop;
                    scrollTop = scrollTop + this.size * 2;
                    scrollTop = scrollTop / this.size * 4;
                    scrollTop = Math.floor(scrollTop);
                    this.currentRange = Math.floor(this.years[scrollTop] / 10) * 10;
                }
                catch (e)
                {
                    this.currentRange = 0;
                }
            }, 300);
        },
        async loadPrev () {
            let num = this.years[0];
            if(num == this.start)
                return 0;
            for (let i = 0; i < 16; i++) {
                if(num <= this.start)
                    return 0;
                num--;
                this.years.splice(0, 0, num);
            }
            await this.delay(30);
            this.$refs.main.scrollTop = this.$refs.main.scrollTop + 16 / 4 * this.size;
        },
        async loadNext () {
            let num = this.years[this.years.length - 1];
            if(num == this.end)
                return 0;
            for (let i = 0; i < 16; i++) {
                if(num >= this.end)
                    return 0;
                num++;
                this.years.push(num);
            }
            await this.delay(30);
        },
        async slide (val) {
            if(!this.lock.slide)
                return 0;
            this.lock.slide = false;
            clearInterval(this.timer.scroller);
            return await new Promise(resolve => {
                this.timer.scroller = setInterval(() => {
                    let index = this.years.indexOf(val);
                    if(index == -1) {
                        if(val < this.currentRange) {
                            this.loadPrev();
                        }
                        else
                            this.loadNext();
                    }
                    let height = Math.floor(index / 4) * this.size;
                    let speed = -Math.floor((this.$refs.main.scrollTop - height) / 7);
                    this.$refs.main.scrollTop = this.$refs.main.scrollTop + speed;
                    if(speed == 0) {
                        this.$refs.main.scrollTop = height;
                        this.lock.slide = true;
                        resolve(0);
                        clearInterval(this.timer.scroller);
                    }
                }, 30);
            });
        },
        async delay (millionseconds) {
            return await new Promise(resolve => {
                setTimeout(() => {
                    resolve(millionseconds);
                }, millionseconds);
            });
        },
        choose (item) {
            this.$emit('choose', item);
        }
    },
    beforeDestroy () {
        clearInterval(this.timer.updateRange);
    }
};
</script>