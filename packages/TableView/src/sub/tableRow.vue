<template>
    <div
        class="fv-tableview-data-row"
        :class="[{ choosen: row.choosen }]"
        :draggable="dragDown"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="dropItem"
        @dragstart="handleRowDrag($event, row)"
        @dragend="handleDragEnd"
        @contextmenu="rightClick($event)"
    >
        <div class="fv-tableview-quick-tool">
            <i
                class="ms-Icon ms-Icon--Add fv-tableview-icon-block fade"
                @click="$emit('add-row')"
            ></i>
            <i
                class="ms-Icon ms-Icon--GripperDotsVertical fv-tableview-icon-block fade"
                @click="rightClick($event)"
                @mousedown="dragDown = true"
            ></i>
        </div>
        <p
            class="onDrop"
            :class="[{ show: dropMode }]"
            :style="{ background: dropMode ? foreground : '' }"
        ></p>
        <div
            class="fv-tableview-cell-item check-box"
            :style="[computedRowStyles]"
        >
            <fv-check-box
                v-model="row.choosen"
                :background="foreground"
                :theme="theme"
            ></fv-check-box>
        </div>
        <component
            :is="computedCellComponent(head.type)"
            v-show="head.visible"
            :value="row"
            :head="head"
            v-for="(head, j) in value.heads"
            :key="j"
            :i18n="i18n"
            :selectPos="selectPos"
            :foreground="foreground"
            :row_index="row_index"
            :col_index="j"
            :fixedLeftWidth="fixedLeftWidth[j]"
            :fixedRightWidth="fixedRightWidth[j]"
            :theme="theme"
            :style="[computedRowStyles]"
            @drop-item="$emit('drop-item', $event)"
            @set-select="$emit('set-select', $event)"
        ></component>
        <div
            class="fv-tableview-cell-item op-tools"
            :style="[computedRowStyles]"
        ></div>
    </div>
</template>

<script>
import one from 'onecolor';

export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        row: {
            type: Object,
            default: () => ({})
        },
        row_index: {
            type: Number,
            default: 0
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
        extensions: {
            default: () => []
        },
        dragItem: {
            default: null
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            dragDown: false,
            dropMode: false
        };
    },
    watch: {
        row() {
            this.formatRow();
        }
    },
    computed: {
        fixedLeftWidth() {
            let result = [];
            let count = 0;
            this.value.heads.forEach((el) => {
                result.push(count);
                if (el.fixed && !el.fixedSide) count += el.width;
            });
            return result;
        },
        fixedRightWidth() {
            let result = [];
            let count = 0;
            this.value.heads.forEach((el) => {
                result.push(count);
                if (el.fixed && el.fixedSide) count += el.width;
            });
            return result;
        },
        choosenBackground() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.2);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        },
        computedRowStyles() {
            if (this.row.choosen)
                return {
                    background: this.choosenBackground
                };
            return {};
        },
        computedCellComponent() {
            return (type) => {
                let current = this.extensions.find((it) => it.type === type);
                if (current) return current.cellComponent;
                return null;
            };
        }
    },
    mounted() {
        this.formatRow();
    },
    methods: {
        formatRow() {
            let defaultRow = {
                choosen: false
            };
            for (let key in defaultRow) {
                if (!this.row[key]) this.$set(this.row, key, defaultRow[key]);
            }
            return defaultRow;
        },
        handleRowDrag(event, item) {
            event.stopPropagation();
            this.$emit('update-drag-item', item);
        },
        handleDragEnd() {
            this.dragDown = false;
        },
        rightClick(event) {
            let clearChoosenAll = !this.row.choosen;
            this.$set(this.row, 'choosen', true);
            this.$emit('rightclick', {
                event: event,
                row: this.row,
                row_index: this.row_index,
                clearChoosenAll: clearChoosenAll
            });
        },
        dragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dragItem === this.row) return;
            const { clientY } = event;
            const { top, height } = this.$el.getBoundingClientRect();
            if (clientY - top < height / 2) {
                this.dropMode = true;
            } else {
                this.dropMode = false;
            }
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.dropMode = false;
        },
        dropItem(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dropMode && this.dragItem) {
                this.$emit('drop-item', {
                    drop: this.value,
                    drag: this.dragItem
                });
            }
            this.dropMode = false;
        }
    }
};
</script>
