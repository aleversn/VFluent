<template>
<div :class="'fv-'+$theme+'-CalendarView'">
    <div class="control-block">
        <p class="switcher" @click="switchView">{{statement}}</p>
        <div class="slider-bar">
            <p class="ms-Icon ms-Icon--ChevronUpMed" @click="slideUp"></p>
            <p class="ms-Icon ms-Icon--ChevronDownMed" @click="slideDown"></p>
        </div>
    </div>
    <div class="container-block">
        <transition-group :name="transitionName">
            <year-box v-if="status == 'year'" v-model="thisValue" :theme="$theme" :lan="lan" ref="year" key="1" @range-change="yearRange = $event" @choose="chooseYear"></year-box>
            <month-box v-if="status == 'month'" v-model="thisValue" :theme="$theme" :lan="lan" ref="month" key="2" @range-change="monthRange = $event" @choose="chooseMonth"></month-box>
            <date-box v-if="status == 'date'" v-model="thisValue" :theme="$theme" :lan="lan" :multiple="multiple" ref="day" key="3" @range-change="dayRange = $event" @choosen-dates="$emit('choosen-dates', $event)" @choose="chooseDate"></date-box>
        </transition-group>
    </div>
</div>
</template>

<script>
import yearBox from './sub/yearBox.vue';
import monthBox from './sub/monthBox.vue';
import dateBox from './sub/dateBox.vue';

export default {
    name: "FvCalendarView",
    components: {
        yearBox,
        monthBox,
        dateBox
    },
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
        multiple: {
            default: 'single'
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
            status: 'date',
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            yearRange: 0,
            monthRange: {year: 0, no: 0},
            dayRange: {year: 0, month: 0, no: 1},
            transitionName: 'scale-down-to-down',
            monthList: {
                en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        };
    },
    watch: {
        value (val, from) {
            if(!this.$SDate.IsSameDate(val, from))
                this.thisValue = this.$SDate.Parse(this.$SDate.DateToString(val));
        }
    },
    computed: {
        $theme () {
            if(this.theme == 'system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        statement () {
            if(this.status == 'date') {
                if(this.lan == 'en')
                    return `${this.monthList['en'][this.dayRange.month]} ${this.dayRange.year}`;
                else
                    return `${this.dayRange.year}年${this.dayRange.month + 1}日`;
            }
            else if(this.status == 'month')
                if(this.lan == 'en')
                    return `${this.monthRange.year}`;
                else
                    return `${this.monthRange.year}年`;
            return `${this.yearRange} - ${this.yearRange + 9}`;
        }
    },
    methods: {
        slideUp () {
            if(this.status == 'year')
                this.$refs.year.slide(this.yearRange - 10);
            else if(this.status == 'month') {
                this.monthRange.year -= 1;
                this.$refs.month.slide(this.monthRange);
            }
            else
                this.daySlide(-1);
        },
        slideDown () {
            if(this.status == 'year')
                this.$refs.year.slide(this.yearRange + 10);
            else if(this.status == 'month') {
                this.monthRange.year += 1;
            this.$refs.month.slide(this.monthRange);
            }
            else
                this.daySlide();
        },
        daySlide (a=1) {
            let d = this.$SDate.Parse(`${this.dayRange.year}-${this.dayRange.month + 1}-${this.dayRange.no} 0:0:0`);
            d.setDate(1);
            d.setMonth(d.getMonth() + a);
            this.$refs.day.slide({year: d.getFullYear(), month: d.getMonth(), no: d.getDate()});
        },
        switchView () {
            this.transitionName = 'scale-down-to-down';
            if(this.status == 'date') {
                this.status = 'month';
            }
            else if(this.status == 'month') {
                this.status = 'year';
            }
        },
        chooseYear (item) {
            this.transitionName = 'scale-up-to-up';
            this.thisValue.setFullYear(item);
            this.status = 'month';
            this.$emit('choose-year', item);
        },
        chooseMonth (item) {
            this.transitionName = 'scale-up-to-up';
            this.thisValue.setDate(1);
            this.thisValue.setMonth(item.no);
            this.thisValue.setFullYear(item.year);
            this.status = 'date';
            this.$emit('choose-month', this.thisValue);
        },
        chooseDate (item) {
            this.thisValue.setDate(item.no);
            this.thisValue.setMonth(item.month);
            this.thisValue.setFullYear(item.year);
            this.$emit('choose-date', this.thisValue);
            this.$emit('input', this.$SDate.Parse(this.$SDate.DateToString(this.thisValue)));
        }
    }
};
</script>
