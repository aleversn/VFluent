<template>
    <div class="day-block">
        <div class="weekdays-block">
            <button
                v-for="(weekday, index) in weekdays[lan]"
                class="weekday"
                :key="`weekday: ${index}`"
            >{{weekday}}</button>
        </div>
        <div
            class="picker-container"
            ref="main"
        >
            <button
                v-for="(item, index) in days"
                :key="`day: ${index}`"
                class="btn day"
                :class="{range: item.year == currentRange.year && item.month == currentRange.month, current: item.year == nowYear && item.month == nowMonth && item.no == nowDate, choose: isChoose(item)}"
                :title="`${item.year}/${item.month + 1}/${item.no}`"
                @click="choose(item)"
            >{{item.no}}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => new Date(),
        },
        start: {
            default: 1900,
        },
        end: {
            default: 3000,
        },
        multiple: {
            default: "single",
        },
        size: {
            default: 41,
        },
        lan: {
            default: "en",
        },
        theme: {
            default: "system",
        },
    },
    data() {
        return {
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            days: [],
            weekdays: {
                en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                zh: ["日", "一", "二", "三", "四", "五", "六"],
            },
            dayList: {
                leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                default: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            },
            currentRange: 0,
            currentChoose: [],
            timer: {
                updateRange: {},
                scroller: {},
            },
            lock: {
                slide: true,
            },
        };
    },
    watch: {
        currentRange(val) {
            this.$emit("range-change", val);
        },
        multiple(val) {
            if (val == "single") this.currentChoose = [this.currentChoose[0]];
        },
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        year() {
            return this.thisValue.getFullYear();
        },
        month() {
            return this.thisValue.getMonth();
        },
        date() {
            return this.thisValue.getDate();
        },
        nowYear() {
            return new Date().getFullYear();
        },
        nowMonth() {
            return new Date().getMonth();
        },
        nowDate() {
            return new Date().getDate();
        },
        borderLightColor() {
            if (this.$theme == "light") {
                return "rgba(121, 119, 117, 0.6)";
            }
            if (this.$theme == "dark" || this.$theme == "custom") {
                return "rgba(255, 255, 255, 0.6)";
            }
            return "rgba(121, 119, 117, 0.6)";
        },
        backgroundLightColor() {
            if (this.$theme == "light") {
                return "rgba(121, 119, 117, 0.3)";
            }
            if (this.$theme == "dark" || this.$theme == "custom") {
                return "rgba(255, 255, 255, 0.3)";
            }
            return "rgba(121, 119, 117, 0.3)";
        },
    },
    mounted() {
        this.FRInit();
        this.daysInit();
        this.scrollBottomToLoadInit(80);
        this.scrollTopToLoadInit();
        this.rangeTimerInit();
    },
    methods: {
        FRInit() {
            let FR = new this.$RevealEffectsMasked("body", {
                selector: this.$refs.main,
                childrenSelector: [],
                borderGradientSize: 90,
                backgroundGradientSize: 120,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        async daysInit() {
            let d = [];
            let nowday = this.$SDate.Parse(
                this.$SDate.DateToString(this.thisValue)
            );
            nowday.setDate(1);

            let lastday = this.$SDate.Parse(this.$SDate.DateToString(nowday));
            lastday.setMonth(lastday.getMonth() - 1);
            let remain = nowday.getDay() + 14;
            for (
                let j =
                    this.dayList[this.leapYear(lastday.getFullYear())][
                        lastday.getMonth()
                    ] - remain;
                j <
                this.dayList[this.leapYear(lastday.getFullYear())][
                    lastday.getMonth()
                ];
                j++
            ) {
                d.push({
                    year: lastday.getFullYear(),
                    month: lastday.getMonth(),
                    no: j + 1,
                });
            }
            for (let i = 0; i < 2; i++) {
                for (
                    let j = 0;
                    j <
                    this.dayList[this.leapYear(nowday.getFullYear())][
                        nowday.getMonth()
                    ];
                    j++
                ) {
                    d.push({
                        year: nowday.getFullYear(),
                        month: nowday.getMonth(),
                        no: j + 1,
                    });
                }
                nowday.setMonth(nowday.getMonth() + 1);
            }
            this.days = d;
            await this.delay(50);
            this.$refs.main.scrollTop =
                this.$refs.main.scrollTop + this.size * 2;
            this.loadPrev();
        },
        scrollBottomToLoadInit(offset = 0) {
            let target = this.$refs.main;
            target.addEventListener("scroll", (event) => {
                if (
                    target.scrollTop + offset >=
                    target.scrollHeight - target.clientHeight
                )
                    this.loadNext();
            });
        },
        scrollTopToLoadInit(offset = 0) {
            let target = this.$refs.main;
            target.addEventListener("scroll", (event) => {
                if (target.scrollTop <= 80) this.loadPrev();
            });
        },
        rangeTimerInit() {
            clearInterval(this.timer.updateRange);
            this.timer.updateRange = setInterval(() => {
                try {
                    let scrollTop = this.$refs.main.scrollTop;
                    scrollTop = scrollTop + this.size * 2;
                    scrollTop = (scrollTop / this.size) * 7;
                    scrollTop = Math.floor(scrollTop);
                    this.currentRange = this.days[scrollTop + 6];
                } catch (e) {
                    this.currentRange = { year: 0, month: 0, no: 0 };
                }
            }, 300);
        },
        async loadPrev() {
            let nowday = new Date();
            let count = 0;
            nowday.setDate(this.days[0].no);
            nowday.setMonth(this.days[0].month);
            nowday.setFullYear(this.days[0].year);
            if (nowday.getDate() != 1) {
                for (let j = nowday.getDate() - 2; j >= 0; j--) {
                    this.days.splice(0, 0, {
                        year: nowday.getFullYear(),
                        month: nowday.getMonth(),
                        no: j + 1,
                    });
                    count++;
                }
            }
            if (nowday.getFullYear() == this.start && nowday.getMonth() == 0)
                return 0;
            nowday.setDate(1);
            nowday.setMonth(this.days[0].month - 1);
            for (
                let j =
                    this.dayList[this.leapYear(nowday.getFullYear())][
                        nowday.getMonth()
                    ] - 1;
                j >= 0;
                j--
            ) {
                this.days.splice(0, 0, {
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1,
                });
                count++;
            }

            let lastday = this.$SDate.Parse(this.$SDate.DateToString(nowday));
            lastday.setMonth(lastday.getMonth() - 1);
            let remain = nowday.getDay() + 14;
            for (
                let j =
                    this.dayList[this.leapYear(lastday.getFullYear())][
                        lastday.getMonth()
                    ] - 1;
                j >=
                this.dayList[this.leapYear(lastday.getFullYear())][
                    lastday.getMonth()
                ] -
                    remain;
                j--
            ) {
                this.days.splice(0, 0, {
                    year: lastday.getFullYear(),
                    month: lastday.getMonth(),
                    no: j + 1,
                });
                count++;
            }

            count = Math.floor(count / 7);
            await this.delay(30);
            this.$refs.main.scrollTop =
                this.$refs.main.scrollTop + count * this.size;
        },
        async loadNext() {
            let nowday = new Date();
            nowday.setDate(1);
            nowday.setMonth(this.days[this.days.length - 1].month);
            nowday.setFullYear(this.days[this.days.length - 1].year);
            if (nowday.getFullYear() == this.end && nowday.getMonth() == 11)
                return 0;
            nowday.setMonth(this.days[this.days.length - 1].month + 1);
            for (
                let j = 0;
                j <
                this.dayList[this.leapYear(nowday.getFullYear())][
                    nowday.getMonth()
                ];
                j++
            ) {
                this.days.push({
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1,
                });
            }
            await this.delay(30);
        },
        async slide(val) {
            if (!this.lock.slide) return 0;
            this.lock.slide = false;
            let val_date = this.$SDate.Parse(
                `${val.year}-${val.month + 1}-1 0:0:0`
            );
            let current_date = this.$SDate.Parse(
                `${this.currentRange.year}-${this.currentRange.month + 1}-${
                    this.currentRange.no
                } 0:0:0`
            );
            clearInterval(this.timer.scroller);
            return await new Promise((resolve) => {
                this.timer.scroller = setInterval(() => {
                    let target = this.days.find(
                        (item) =>
                            item.year == val.year &&
                            item.month == val.month &&
                            item.no == 1
                    );
                    if (target == undefined) {
                        if (this.$SDate.DisTime(val_date, current_date) > 0)
                            this.loadPrev();
                        else this.loadNext();
                        return 0;
                    }
                    let index = this.days.indexOf(target);
                    let height = Math.floor(index / 7) * this.size;
                    let speed = -Math.floor(
                        (this.$refs.main.scrollTop - height) / 2
                    );
                    this.$refs.main.scrollTop =
                        this.$refs.main.scrollTop + speed;
                    if (speed == 0) {
                        this.$refs.main.scrollTop = height;
                        this.lock.slide = true;
                        resolve(0);
                        clearInterval(this.timer.scroller);
                    }
                }, 60);
            });
        },
        leapYear(num) {
            if (num % 4 == 0 && num % 100 != 0) return "leap";
            else if (num % 400 == 0) return "leap";
            else return "default";
        },
        choose(item) {
            if (this.multiple == "single") this.currentChoose = [item];
            else if (this.multiple == "multiple") this.currentChoose.push(item);
            else if (this.multiple == "range") {
                let item_index = this.days.indexOf(item);
                let last_index = this.days.indexOf(
                    this.currentChoose[this.currentChoose.length - 1]
                );
                if (this.currentChoose.length == 0) this.currentChoose = [item];
                else if (item_index >= last_index) {
                    for (let i = last_index + 1; i <= item_index; i++) {
                        this.currentChoose.push(this.days[i]);
                    }
                } else this.currentChoose = [item];
            }
            this.$emit("choosen-dates", this.currentChoose);
            this.$emit("choose", item);
        },
        async delay(millionseconds) {
            return await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(millionseconds);
                }, millionseconds);
            });
        },
        isChoose(item) {
            return this.currentChoose.indexOf(item) > -1;
        },
    },
    beforeDestroy() {
        clearInterval(this.timer.updateRange);
        clearInterval(this.timer.scroller);
    },
};
</script>