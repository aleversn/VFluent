<template>
    <div
        :class="[
            'fv-' + $theme + '-CalendarDatePicker',
            { disabled: isDisabled }
        ]"
    >
        <picker-input
            v-model="dates"
            :placeholder="placeholder"
            :theme="$theme"
            :disabled="isDisabled"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :inputForeground="inputForeground"
            :inputBackground="inputBackground"
            :dropDownIcon="dropDownIcon"
            :dropDownIconForeground="dropDownIconForeground"
            @click.native="show.calendar = !isDisabled ? !show.calendar : false"
        ></picker-input>
        <transition name="fv-calendar-container">
            <div v-if="show.calendar" class="calendar-container">
                <fv-calendar-view
                    v-model="thisValue"
                    :multiple="multiple"
                    :start="start"
                    :end="end"
                    :lan="lan"
                    :choosen-dates="dates"
                    :foreground="foreground"
                    :theme="theme"
                    @choosen-dates="chooseDates"
                    @choosen-dates-obj="$emit('choosen-dates-obj', $event)"
                >
                    <template v-slot:statement="x">
                        <slot
                            name="statement"
                            :value="x.value"
                            :dayRange="x.dayRange"
                        >
                            {{ x.value }}
                        </slot>
                    </template>
                    <template v-slot:weekday_content="x">
                        <slot name="weekday_content" :value="x.value">
                            {{ x.value }}
                        </slot>
                    </template>
                </fv-calendar-view>
            </div>
        </transition>
        {{ value }}
    </div>
</template>

<script>
import pickerInput from './input/input.vue';

export default {
    name: 'FvCalendarDatePicker',
    components: {
        pickerInput
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
        lan: {
            default: 'en'
        },
        borderWidth: {
            default: 2
        },
        placeholder: {
            default: 'Pick a day'
        },
        borderRadius: {
            default: '3'
        },
        inputForeground: {
            default: ''
        },
        inputBackground: {
            default: ''
        },
        dropDownIcon: {
            default: 'CalendarDay'
        },
        dropDownIconForeground: {
            default: ''
        },
        multiple: {
            default: 'single'
        },
        choosenDates: {
            default: () => []
        },
        foreground: {
            default: ''
        },
        disabled: {
            default: false
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            dates: [],
            show: {
                calendar: false
            }
        };
    },
    watch: {
        value(val, from) {
            if (!this.$SDate.IsSameDate(val, from)) {
                this.thisValue = this.$SDate.Parse(
                    this.$SDate.DateToString(val)
                );
                if (this.multiple == 'single')
                    this.dates = [
                        {
                            year: val.getFullYear(),
                            month: val.getMonth(),
                            no: val.getDate()
                        }
                    ];
            }
        },
        thisValue(val, from) {
            this.$emit(
                'input',
                this.$SDate.Parse(this.$SDate.DateToString(this.thisValue))
            );
        }
    },
    computed: {
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted() {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
            window.addEventListener('touchend', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) this.show.calendar = false;
        },
        chooseDates(val) {
            this.dates = val;
            this.$emit('choosen-dates', val);
            if (this.multiple == 'single') this.show.calendar = false;
        }
    },
    beforeDestroy() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
