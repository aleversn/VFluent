<template>
    <fv-table-view-head-base
        :value="value"
        :index="index"
        :i18n="i18n"
        :foreground="foreground"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :theme="theme"
        :wrapperWidth="'260px'"
        :dragItem="dragItem"
        :formatFunction="formatDateHead"
        @duplicate-column="$emit('duplicate-column', $event)"
        @drop-item="$emit('drop-item', $event)"
        @delete-column="$emit('delete-column', $event)"
    >
        <template v-slot:menu>
            <div class="fv-tableview-default-edittool-row between">
                <span style="margin-left: 10px">{{ i18n('Date Format') }}</span>
                <fv-drop-down
                    v-model="currentDateFormats"
                    :options="dateFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Date Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
            <div
                class="fv-tableview-default-edittool-row between"
                style="margin-top: 10px; margin-bottom: 10px"
            >
                <span style="margin-left: 10px">{{ i18n('Time Format') }}</span>
                <fv-drop-down
                    v-model="currentTimeFormats"
                    :options="timeFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Time Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
        </template>
    </fv-table-view-head-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: ''
        },
        dragItem: {
            type: Object,
            default: null
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            currentDateFormats: [],
            currentTimeFormats: [],
            dateFormatList: [
                { key: 'full', text: 'Full Date' },
                { key: 'mm/dd/YYYY', text: 'Month/Day/Year' },
                { key: 'dd/mm/YYYY', text: 'Day/Month/Year' },
                { key: 'YYYY/mm/dd', text: 'Year/Month/Day' },
                { key: 'relative', text: 'Relative' }
            ],
            timeFormatList: [
                { key: 'hidden', text: 'Hidden' },
                { key: '12', text: '12 Hour' },
                { key: '24', text: '24 Hour' }
            ]
        };
    },
    watch: {
        'value.dateFormat'() {
            this.dateFormatInit();
        },
        'value.timeFormat'() {
            this.timeFormatInit();
        },
        currentDateFormats() {
            let format = this.currentDateFormats[0].key;
            this.$set(this.value, 'dateFormat', format);
        },
        currentTimeFormats() {
            let format = this.currentTimeFormats[0].key;
            this.$set(this.value, 'timeFormat', format);
        }
    },
    computed: {},
    mounted() {
        this.dateFormatInit();
        this.timeFormatInit();
    },
    methods: {
        dateFormatInit() {
            let currentFormat = this.dateFormatList.find(
                (it) => it.key === this.value.dateFormat
            );
            if (currentFormat) this.currentDateFormats = [currentFormat];
            else this.currentDateFormats = [];
        },
        timeFormatInit() {
            let currentFormat = this.timeFormatList.find(
                (it) => it.key === this.value.timeFormat
            );
            if (currentFormat) this.currentTimeFormats = [currentFormat];
            else this.currentTimeFormats = [];
        },
        formatDateHead(value) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '📅',
                type: 'number',
                minWidth: 60,
                width: 100,
                dateFormat: 'full',
                timeFormat: 'hidden',
                showEndDate: false,
                fixed: false,
                fixedSide: false,
                wrap: false,
                visible: true
            };
            for (let key in defaultHead) {
                if (!value[key]) this.$set(value, key, defaultHead[key]);
            }
            if (!value.__guid)
                this.$set(value, '__guid', this.GuidWithoutDash());
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
