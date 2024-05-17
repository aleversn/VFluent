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
        :formatFunction="formatNumberHead"
        @duplicate-column="$emit('duplicate-column', $event)"
        @drop-item="$emit('drop-item', $event)"
        @delete-column="$emit('delete-column', $event)"
    >
        <template v-slot:menu>
            <div class="fv-tableview-default-edittool-row between">
                <span style="margin-left: 10px">{{
                    i18n('Number Format')
                }}</span>
                <fv-drop-down
                    v-model="currentFormats"
                    :options="numberFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Number Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
            <hr />
            <div class="fv-tableview-number-edittool-inside-block">
                <span class="number-edittool-title">{{ i18n('Show as') }}</span>
                <div class="hor-block">
                    <div
                        v-for="(item, index) in showAsList"
                        :key="index"
                        class="hor-item"
                        :style="{
                            color: value.showAs === item.key ? foreground : '',
                            'border-color':
                                value.showAs === item.key ? foreground : '',
                            'border-width':
                                value.showAs === item.key ? '2px' : ''
                        }"
                        @click="$set(value, 'showAs', item.key)"
                    >
                        <i
                            class="ms-Icon icon-block"
                            :class="[`ms-Icon--${item.icon}`]"
                        ></i>
                        <p class="title-block">{{ item.text }}</p>
                    </div>
                </div>
                <div class="show-as-config-block">
                    <div class="show-as-config-item">
                        <span>{{ i18n('Color') }}</span>
                        <fv-drop-down
                            v-model="currentColors"
                            :theme="theme"
                            :options="colorList"
                            style="width: 120px; margin-left: 5px"
                        >
                            <template v-slot:options="x">
                                <i
                                    class="color-block"
                                    :style="{ background: x.option.color }"
                                    style="flex-shrink: 0"
                                ></i>
                                <p style="margin-left: 5px; font-size: 12px">
                                    {{ i18n(getColorName(x.option.name)) }}
                                </p>
                            </template>
                            <template v-slot:drop-carrier="x">
                                <div class="show-as-config-custom-drop-down">
                                    <i
                                        class="color-block"
                                        :style="{
                                            background:
                                                x.value.length > 0
                                                    ? x.value[0].color
                                                    : ''
                                        }"
                                    ></i>
                                    <span>{{
                                        i18n(
                                            getColorName(
                                                x.value.length > 0
                                                    ? x.value[0].name
                                                    : ''
                                            )
                                        )
                                    }}</span>
                                    <i class="ms-Icon ms-Icon--ChevronDown"></i>
                                </div>
                            </template>
                        </fv-drop-down>
                    </div>
                    <div class="show-as-config-item">
                        <span>{{ i18n('Divide by') }}</span>
                        <fv-text-box
                            v-model="value.divideBy"
                            :placeholder="i18n('Input value')"
                            :theme="theme"
                            underline
                            ref="text"
                            :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                            borderWidth="2"
                            is-box-shadow="true"
                            style="width: 120px; margin-left: 5px"
                            @click.native="$refs.text.focus()"
                        >
                        </fv-text-box>
                    </div>
                    <div class="show-as-config-item">
                        <span>{{ i18n('Show Number') }}</span>
                        <fv-toggle-switch
                            v-model="value.showNumber"
                            :on="i18n('Yes')"
                            :off="i18n('No')"
                            :insideContent="true"
                            :switchOnBackground="foreground"
                            width="60"
                            style="margin-left: 15px"
                        ></fv-toggle-switch>
                    </div>
                </div>
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
            showAsList: [
                {
                    key: 'number',
                    text: 'Number',
                    icon: 'NumberField'
                },
                {
                    key: 'bar',
                    text: 'Bar',
                    icon: 'ChromeMinimizeContrast'
                },
                {
                    key: 'ring',
                    text: 'Ring',
                    icon: 'ProgressRingDots'
                }
            ],
            currentColors: [],
            currentFormats: [],
            colorList: [
                { name: 'gray', color: '#787774' },
                { name: 'purple', color: '#958DF1' },
                { name: 'pink', color: '#f58eda' },
                { name: 'red', color: '#F98181' },
                { name: 'orange', color: '#FBBC88' },
                { name: 'yellow', color: '#FAF594' },
                { name: 'blue', color: '#4086cb' },
                { name: 'teal', color: '#94FADB' },
                { name: 'green', color: '#B9F18D' },
                { name: 'rose', color: '#ee7686' }
            ],
            numberFormatList: [
                {
                    key: 'Number',
                    text: 'Number'
                },
                {
                    key: 'Number with commas',
                    text: 'Number with commas'
                },
                {
                    key: 'Percent',
                    text: 'Percent'
                },
                {
                    key: 'US Dollar',
                    text: 'US Dollar'
                },
                {
                    key: 'Australian dollar',
                    text: 'Australian dollar'
                },
                {
                    key: 'Canadian dollar',
                    text: 'Canadian dollar'
                },
                {
                    key: 'Singapore dollar',
                    text: 'Singapore dollar'
                },
                {
                    key: 'Euro',
                    text: 'Euro'
                },
                {
                    key: 'Pound',
                    text: 'Pound'
                },
                {
                    key: 'Yen',
                    text: 'Yen'
                },
                {
                    key: 'Ruble',
                    text: 'Ruble'
                },
                {
                    key: 'Rupee',
                    text: 'Rupee'
                },
                {
                    key: 'Won',
                    text: 'Won'
                },
                {
                    key: 'Yuan',
                    text: 'Yuan'
                },
                {
                    key: 'Real',
                    text: 'Real'
                },
                {
                    key: 'Lira',
                    text: 'Lira'
                },
                {
                    key: 'Rupiah',
                    text: 'Rupiah'
                },
                {
                    key: 'Franc',
                    text: 'Franc'
                },
                {
                    key: 'Hong Kong dollar',
                    text: 'Hong Kong dollar'
                },
                {
                    key: 'New Zealand dollar',
                    text: 'New Zealand dollar'
                },
                {
                    key: 'Krona',
                    text: 'Krona'
                },
                {
                    key: 'Norwegian krone',
                    text: 'Norwegian krone'
                },
                {
                    key: 'Mexican peso',
                    text: 'Mexican peso'
                },
                {
                    key: 'Rand',
                    text: 'Rand'
                },
                {
                    key: 'New Taiwan dollar',
                    text: 'New Taiwan dollar'
                },
                {
                    key: 'Danish krone',
                    text: 'Danish krone'
                },
                {
                    key: 'Złoty',
                    text: 'Złoty'
                },
                {
                    key: 'Baht',
                    text: 'Baht'
                },
                {
                    key: 'Forint',
                    text: 'Forint'
                },
                {
                    key: 'Koruna',
                    text: 'Koruna'
                },
                {
                    key: 'Shekel',
                    text: 'Shekel'
                },
                {
                    key: 'Chilean peso',
                    text: 'Chilean peso'
                },
                {
                    key: 'Philippine peso',
                    text: 'Philippine peso'
                },
                {
                    key: 'Dirham',
                    text: 'Dirham'
                },
                {
                    key: 'Colombian peso',
                    text: 'Colombian peso'
                },
                {
                    key: 'Riyal',
                    text: 'Riyal'
                },
                {
                    key: 'Ringgit',
                    text: 'Ringgit'
                },
                {
                    key: 'Leu',
                    text: 'Leu'
                },
                {
                    key: 'Argentine peso',
                    text: 'Argentine peso'
                },
                {
                    key: 'Uruguayan peso',
                    text: 'Uruguayan peso'
                },
                {
                    key: 'Peruvian sol',
                    text: 'Peruvian sol'
                }
            ]
        };
    },
    watch: {
        'value.showColor'() {
            this.colorInit();
        },
        'value.numberFormat'() {
            this.formatInit();
        },
        currentColors() {
            let color = this.currentColors[0].color;
            this.$set(this.value, 'showColor', color);
        },
        currentFormats() {
            let format = this.currentFormats[0].key;
            this.$set(this.value, 'numberFormat', format);
        }
    },
    computed: {
        getColorName() {
            return (item) => {
                return item.slice(0, 1).toUpperCase() + item.slice(1);
            };
        }
    },
    mounted() {
        this.colorInit();
        this.formatInit();
    },
    methods: {
        colorInit() {
            let currentColor = this.colorList.find(
                (it) => it.color === this.value.showColor
            );
            if (currentColor) this.currentColors = [currentColor];
            else this.currentColors = [];
        },
        formatInit() {
            let currentFormat = this.numberFormatList.find(
                (it) => it.key === this.value.numberFormat
            );
            if (currentFormat) this.currentFormats = [currentFormat];
            else this.currentFormats = [];
        },
        formatNumberHead(value) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '🔢',
                type: 'number',
                minWidth: 60,
                width: 100,
                numberFormat: 'Number',
                showAs: 'number',
                showColor: '#958DF1',
                divideBy: 100,
                showNumber: true,
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
