<template>
    <fv-table-view-cell-base
        :value="value"
        :head="head"
        :i18n="i18n"
        :selectPos="selectPos"
        :foreground="foreground"
        :row_index="row_index"
        :col_index="col_index"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :theme="theme"
        :formatFunction="formatDate"
        :wrapperWidth="'300px'"
        :isUnder="true"
        @drop-item="$emit('drop-item', $event)"
        @set-select="$emit('set-select', $event)"
    >
        <template v-slot:default>
            <p
                class="fv-tableview-default-content"
                style="width: 100%; text-align: right"
            >
                {{ computedContent }}
            </p>
        </template>
        <template v-slot:entire="x">
            <div
                class="fv-tableview-default-edittool-row"
                style="margin-top: 10px"
                @click="$event.stopPropagation()"
            >
                <fv-text-box
                    :value="startDateStr"
                    :theme="theme"
                    underline
                    :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                    :border-color="'rgba(120, 120, 120, 0.1)'"
                    :focus-border-color="foreground"
                    :border-width="2"
                    :is-box-shadow="true"
                    style="height: 35px"
                ></fv-text-box>
                <fv-text-box
                    v-show="head.timeFormat !== 'hidden'"
                    :value="startTimeStr"
                    :theme="theme"
                    underline
                    :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                    :border-color="'rgba(120, 120, 120, 0.1)'"
                    :focus-border-color="foreground"
                    :border-width="2"
                    :is-box-shadow="true"
                    style="height: 35px; margin-left: 5px"
                ></fv-text-box>
            </div>
            <div
                v-show="head.showEndDate"
                class="fv-tableview-default-edittool-row"
                style="margin-top: 5px"
                @click="$event.stopPropagation()"
            >
                <fv-text-box
                    :value="endDateStr"
                    :theme="theme"
                    underline
                    :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                    :border-color="'rgba(120, 120, 120, 0.1)'"
                    :focus-border-color="foreground"
                    :border-width="2"
                    :is-box-shadow="true"
                    style="height: 35px"
                ></fv-text-box>
                <fv-text-box
                    v-show="head.timeFormat !== 'hidden'"
                    :value="endTimeStr"
                    :theme="theme"
                    underline
                    :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                    :border-color="'rgba(120, 120, 120, 0.1)'"
                    :focus-border-color="foreground"
                    :border-width="2"
                    :is-box-shadow="true"
                    style="height: 35px; margin-left: 5px"
                ></fv-text-box>
            </div>
            <fv-calendar-view
                v-model="currentDate"
                :theme="theme"
                :multiple="head.showEndDate ? 'range' : 'single'"
                ref="calendar"
                :choosenDates="currentDatesRange"
                :foreground="foreground"
                style="scale: 0.95"
                @choosen-dates-obj="selectChoosenDates"
            >
                <template v-slot:weekday_content="x">
                    {{ i18n(x.value) }}
                </template>
            </fv-calendar-view>
            <div
                v-show="head.showEndDate && head.timeFormat !== 'hidden'"
                class="fv-tableview-default-edittool-row"
            >
                <span>{{ i18n('Start Time') }}</span>
            </div>
            <div
                v-show="head.timeFormat !== 'hidden'"
                class="fv-tableview-default-edittool-row"
                style="margin-bottom: 10px"
            >
                <fv-time-picker
                    v-if="value[head.key] && value[head.key].start"
                    v-model="value[head.key].start"
                    :theme="theme"
                    :timeType="head.timeFormat == '12' ? 12 : 24"
                    style="width: 100%"
                    @change="syncStrValue"
                ></fv-time-picker>
            </div>
            <div
                v-show="head.showEndDate && head.timeFormat !== 'hidden'"
                class="fv-tableview-default-edittool-row"
            >
                <span>{{ i18n('End Time') }}</span>
            </div>
            <div
                v-show="head.showEndDate && head.timeFormat !== 'hidden'"
                class="fv-tableview-default-edittool-row"
                style="margin-bottom: 10px"
            >
                <fv-time-picker
                    v-if="value[head.key] && value[head.key].end"
                    v-model="value[head.key].end"
                    :theme="theme"
                    :timeType="head.timeFormat == '12' ? 12 : 24"
                    style="width: 100%"
                    @change="syncStrValue"
                ></fv-time-picker>
            </div>
            <hr />
            <div
                v-if="value[head.key] && head.showEndDate !== undefined"
                class="fv-tableview-default-edittool-row"
                style="margin-bottom: 10px"
            >
                <span>{{ i18n('End Date') }}</span>
                <fv-toggle-switch
                    v-model="head.showEndDate"
                    :on="i18n('Yes')"
                    :off="i18n('No')"
                    :insideContent="true"
                    :switchOnBackground="foreground"
                    width="60"
                    style="margin-left: 15px"
                ></fv-toggle-switch>
            </div>
        </template>
    </fv-table-view-cell-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        head: {
            type: Object,
            default: () => ({})
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        selectPos: {
            type: Object,
            default: () => ({})
        },
        foreground: {
            default: ''
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        row_index: {
            type: Number,
            default: 0
        },
        col_index: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            currentChoosenDates: [],
            startDateStr: '',
            endDateStr: '',
            startTimeStr: '',
            endTimeStr: '',
            currentDate: new Date()
        };
    },
    watch: {
        'head.dateFormat'() {
            this.dateInit();
        },
        'head.timeFormat'() {
            this.dateInit();
        }
    },
    computed: {
        computedContent() {
            if (this.head.timeFormat !== 'hidden') {
                if (this.head.showEndDate) {
                    return (
                        this.startDateStr +
                        ' ' +
                        this.startTimeStr +
                        ' - ' +
                        this.endDateStr +
                        ' ' +
                        this.endTimeStr
                    );
                }
                return this.startDateStr + ' ' + this.startTimeStr;
            } else {
                if (this.head.showEndDate) {
                    return this.startDateStr + ' - ' + this.endDateStr;
                }
                return this.startDateStr;
            }
        },
        currentDatesRange() {
            let final = [];
            if (this.currentChoosenDates.length === 0) return final;
            if (this.currentChoosenDates.length === 1) {
                final.push({
                    year: this.currentChoosenDates[0].getFullYear(),
                    month: this.currentChoosenDates[0].getMonth(),
                    no: this.currentChoosenDates[0].getDate()
                });
                return final;
            }
            let startDate = {
                year: this.currentChoosenDates[0].getFullYear(),
                month: this.currentChoosenDates[0].getMonth(),
                no: this.currentChoosenDates[0].getDate()
            };
            let endDate = {
                year: this.currentChoosenDates[1].getFullYear(),
                month: this.currentChoosenDates[1].getMonth(),
                no: this.currentChoosenDates[1].getDate()
            };
            for (let i = startDate.year; i <= endDate.year; i++) {
                let start = 0;
                let end = 11;
                if (i == startDate.year) start = startDate.month;
                if (i == endDate.year) end = endDate.month;
                for (let j = start; j <= end; j++) {
                    let days = this.getDaysInMonth(j + 1, i);
                    for (let k = 1; k <= days; k++) {
                        let target = {
                            year: i,
                            month: j,
                            no: k
                        };
                        if (
                            i === startDate.year &&
                            start === startDate.month &&
                            k < startDate.no
                        )
                            continue;
                        if (
                            i === endDate.year &&
                            end === endDate.month &&
                            k > endDate.no
                        )
                            continue;
                        final.push(target);
                    }
                }
            }
            return final;
        }
    },
    mounted() {
        this.dateInit();
    },
    methods: {
        formatDate(value, head) {
            let defaultCell = {};
            defaultCell[head.key] = {
                start: new Date(),
                end: new Date()
            };
            for (let key in defaultCell) {
                if (!value[key]) this.$set(value, key, defaultCell[key]);
            }
            if (!value[head.key].start) {
                let obj = {
                    start: new Date(value[head.key].toString()),
                    end: new Date(value[head.key].toString())
                };
                this.$set(value, head.key, obj);
            }
            if (!value.__guid)
                this.$set(value, '__guid', this.GuidWithoutDash());
            this.$watch(`value.${this.head.key}`, () => {
                this.dateInit();
            });
        },
        dateInit() {
            let key = this.head.key;
            let date = {
                start: new Date(),
                end: new Date()
            };
            if (this.value[key] && this.value[key].start) {
                date.start = new Date(this.value[key].start);
            }
            if (this.value[key] && this.value[key].end) {
                date.end = new Date(this.value[key].end);
            }
            this.currentDate = date.start;
            this.currentChoosenDates = [date.start, date.end];
            this.syncStrValue();
            this.$nextTick(() => {
                this.$refs.calendar.resetDate();
            });
        },
        setStartDate() {
            if (!this.value[this.head.key] || !this.value[this.head.key].start)
                return 'Invalid Date';
            let val = this.value[this.head.key].start;
            let dateFormat = this.head.dateFormat;
            if (!dateFormat || dateFormat === 'full') return val.toDateString();
            let formatStr = dateFormat;
            return this.$SDate.Format(formatStr, val);
        },
        setEndDate() {
            if (!this.value[this.head.key] || !this.value[this.head.key].end)
                return 'Invalid Date';
            let val = this.value[this.head.key].end;
            let dateFormat = this.head.dateFormat;
            if (!dateFormat || dateFormat === 'full') return val.toDateString();
            let formatStr = dateFormat;
            return this.$SDate.Format(formatStr, val);
        },
        setStartTime() {
            if (!this.value[this.head.key] || !this.value[this.head.key].start)
                return 'Invalid Time';
            let val = this.value[this.head.key].start;
            return this.timeFormat(val);
        },
        setEndTime() {
            if (!this.value[this.head.key] || !this.value[this.head.key].end)
                return 'Invalid Time';
            let val = this.value[this.head.key].end;
            return this.timeFormat(val);
        },
        syncStrValue() {
            this.startDateStr = this.setStartDate();
            this.endDateStr = this.setEndDate();
            this.startTimeStr = this.setStartTime();
            this.endTimeStr = this.setEndTime();
        },
        selectChoosenDates(dates) {
            if (this.value[this.head.key] && this.value[this.head.key].start)
                this.$set(this.value[this.head.key], 'start', dates[0]);
            if (this.value[this.head.key] && this.value[this.head.key].end)
                this.$set(
                    this.value[this.head.key],
                    'end',
                    dates[dates.length - 1]
                );
            this.syncStrValue();
        },
        timeFormat(val) {
            let timeFormat = this.head.timeFormat;
            if (timeFormat.toString() === '12') {
                let hour = val.getHours();
                let minute = val.getMinutes();
                let ampm = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12;
                hour = hour ? hour : 12;
                return (
                    this.timeValueFormat(hour) +
                    ':' +
                    this.timeValueFormat(minute) +
                    ' ' +
                    ampm
                );
            }
            return (
                this.timeValueFormat(val.getHours()) +
                ':' +
                this.timeValueFormat(val.getMinutes()) +
                ':' +
                this.timeValueFormat(val.getSeconds())
            );
        },
        timeValueFormat(val) {
            if (val < 10) return '0' + val;
            return val;
        },
        getDaysInMonth(month, year) {
            // month is 1 based
            return new Date(year, month, 0).getDate();
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    }
};
</script>
