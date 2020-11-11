<template>
<div class="picker-container" ref="main">
    <button v-for="(item, index) in months" :key="`year: ${index}`" class="btn" :class="{range: item.year === currentRange.year, current: item.year === nowYear && item.no === nowMonth}" @click="choose(item)">{{item.name}}</button>
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
        lan: {
            default: 'en'
        },
        theme: {
            default: 'system'
        }
    },
    data () {
        return {
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            months: [],
            monthList: [
                { en: 'Jan', zh: '一月'},
                { en: 'Feb', zh: '二月'},
                { en: 'Mar', zh: '三月'},
                { en: 'Apr', zh: '四月'},
                { en: 'May', zh: '五月'},
                { en: 'Jun', zh: '六月'},
                { en: 'Jul', zh: '七月'},
                { en: 'Aug', zh: '八月'},
                { en: 'Set', zh: '九月'},
                { en: 'Oct', zh: '十月'},
                { en: 'Nov', zh: '十一月'},
                { en: 'Dec', zh: '十二月'}
            ],
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
        this.monthsInit();
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
        monthsInit () {
            let m = [];
            let num = this.year - 1;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < this.monthList.length; j++) {
                    m.push({ year: num, no: j, name: this.monthList[j][this.lan]});
                }
                num++;
            }
            this.months = m;
            setTimeout(() => {
                this.$refs.main.scrollTop = this.$refs.main.scrollTop + this.size * 3;
            }, 50);
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
                    this.currentRange = this.months[scrollTop + 3];
                }
                catch (e)
                {
                    this.currentRange = { year: 0, no: 0, name: this.monthList[0][this.lan]};
                }
            }, 300);
        },
        async loadPrev () {
            let num = this.months[0].year;
            if(num == this.start)
                return 0;
            num--;
            for(let j = this.monthList.length - 1; j >= 0; j--) {
                this.months.splice(0, 0, { year: num, no: j, name: this.monthList[j][this.lan]});
            }
            await this.delay(30);
            this.$refs.main.scrollTop = this.$refs.main.scrollTop + 12 / 4 * this.size;
        },
        async loadNext () {
            let num = this.months[this.months.length - 1].year;
            if(num == this.end)
                return 0;
            num++;
            for(let j = 0; j < this.monthList.length; j++) {
                this.months.push({ year: num, no: j, name: this.monthList[j][this.lan]});
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
                    let target = this.months.find(
                        item => item.year == val.year && item.no == 0
                    );
                    if(target == undefined) {
                        if(val < this.currentRange.year) {
                            this.loadPrev();
                        }
                        else
                            this.loadNext();
                        return 0;
                    }
                    let index = this.months.indexOf(target);
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