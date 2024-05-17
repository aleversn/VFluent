<template>
    <div
        v-if="head.__guid"
        class="fv-tableview-cell-item"
        :class="[
            {
                wrappable: head.wrap,
                fixed: head.fixed,
                selected: isSelected,
                'first-selected': isFirstSelected
            }
        ]"
        :style="{
            left: head.fixed && !head.fixedSide ? fixedLeftWidth + 'px' : '',
            right: head.fixed && head.fixedSide ? fixedRightWidth + 'px' : '',
            width: head.width + 'px',
            'z-index': show.edit || isFirstSelected ? 5 : '',
            background: computedBackground,
            'outline-color': outlineColor
        }"
    >
        <div
            class="fv-tableview-cell-content"
            @mousedown="mouseFunc($event, 'down')"
            @mouseenter="mouseFunc($event, 'enter')"
            @click="clickFunc"
        >
            <slot>
                <p class="fv-tableview-default-content">
                    {{ value[head.key] }}
                </p>
            </slot>
        </div>
        <p
            v-show="isFirstSelected"
            class="fv-tableview-cell-sync-btn"
            :style="{ 'border-color': outlineColor }"
            @mousedown="mouseFunc($event, 'sync-down')"
        ></p>
        <edit-wrapper
            v-model="show.edit"
            :el="() => $el"
            :wrapperWidth="wrapperWidth"
            :isUnder="isUnder"
        >
            <slot name="entire" :value="value" :show="show.edit">
                <fv-text-box
                    v-model="value[head.key]"
                    :theme="theme"
                    underline
                    ref="text"
                    :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                    border-color="rgba(120, 120, 120, 0.1)"
                    :focus-border-color="foreground"
                    borderWidth="2"
                    is-box-shadow="true"
                    style="width: 100%"
                ></fv-text-box>
            </slot>
        </edit-wrapper>
    </div>
</template>

<script>
import one from 'onecolor';

import editWrapper from './editWrapper.vue';

export default {
    name: 'FvTableViewCellBase',
    components: {
        editWrapper
    },
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
        wrapperWidth: {
            default: '220px'
        },
        formatFunction: {
            type: Function,
            default: null
        },
        row_index: {
            type: Number,
            default: 0
        },
        col_index: {
            type: Number,
            default: 0
        },
        isUnder: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            show: {
                edit: false
            }
        };
    },
    watch: {
        value() {
            this.formatCell();
        },
        'head.key'() {
            this.formatCell();
        },
        'show.edit'(val) {
            if (val) {
                this.$nextTick(() => {
                    if (this.$refs.text) this.$refs.text.focus();
                });
            }
            this.$emit('show-edit', val);
        }
    },
    computed: {
        isSelected() {
            let start_row = -1;
            let end_row = -1;
            let start_col = -1;
            let end_col = -1;
            if (this.selectPos.start_row > this.selectPos.end_row) {
                start_row = this.selectPos.end_row;
                end_row = this.selectPos.start_row;
            } else {
                start_row = this.selectPos.start_row;
                end_row = this.selectPos.end_row;
            }
            if (this.selectPos.start_col > this.selectPos.end_col) {
                start_col = this.selectPos.end_col;
                end_col = this.selectPos.start_col;
            } else {
                start_col = this.selectPos.start_col;
                end_col = this.selectPos.end_col;
            }
            return (
                start_row <= this.row_index &&
                end_row >= this.row_index &&
                start_col <= this.col_index &&
                end_col >= this.col_index
            );
        },
        isFirstSelected() {
            return (
                this.selectPos.start_row === this.row_index &&
                this.selectPos.start_col === this.col_index
            );
        },
        selectBackground() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.1);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        },
        outlineColor() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.6);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        },
        computedBackground() {
            if (this.isSelected) return this.selectBackground;
            return '';
        }
    },
    mounted() {
        this.formatCell();
    },
    methods: {
        formatCell() {
            if (this.formatFunction) {
                this.formatFunction(this.value, this.head);
            } else {
                let defaultCell = {};
                defaultCell[this.head.key] = '';
                for (let key in defaultCell) {
                    if (!this.value[key])
                        this.$set(this.value, key, defaultCell[key]);
                }
                if (!this.value.__guid)
                    this.$set(this.value, '__guid', this.GuidWithoutDash());
            }
        },
        clickFunc() {
            this.show.edit = true;
        },
        mouseFunc(event, event_type = 'down') {
            event.preventDefault();
            this.$emit('set-select', {
                event_type,
                row_index: this.row_index,
                col_index: this.col_index
            });
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
