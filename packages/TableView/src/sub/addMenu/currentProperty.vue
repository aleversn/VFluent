<template>
    <div class="fv-tableview-addmenu">
        <div class="addmenu-title-block">{{ i18n('Properties') }}</div>
        <span
            v-for="(item, index) in heads"
            :key="index"
            :ref="`item-${index}`"
            @click="$event.stopPropagation()"
            :draggable="dragDown"
            @dragover="dragOver($event, index)"
            @dragleave="dragLeave"
            @drop="dropItem($event, item)"
            @dragstart="handleRowDrag($event, item)"
            @dragend="handleDragEnd"
        >
            <i
                class="onDrop"
                :style="{ background: dropHead === item ? dropBackground : '' }"
            ></i>
            <div class="addmenu-left-block">
                <i
                    class="ms-Icon ms-Icon--GripperDotsVertical"
                    @mousedown="dragDown = true"
                ></i>
                <i
                    class="ms-Icon"
                    :class="[`ms-Icon--${computedIcon(item)}`]"
                    style="margin-left: 5px"
                ></i>
                <p>{{ item.name }}</p>
            </div>
            <div class="addmenu-right-block">
                <i
                    class="ms-Icon icon-block"
                    :class="[`ms-Icon--${item.visible ? 'View' : 'Hide'}`]"
                    @click="switchVisible(item)"
                ></i>
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </div>
        </span>
        <hr />
        <span
            @click="
                $emit('add-click');
                $event.stopPropagation();
            "
        >
            <i class="ms-Icon ms-Icon--Add"></i>
            <p>{{ i18n('New Property') }}</p>
        </span>
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
        heads: {
            type: Array,
            default: () => []
        },
        extensions: {
            default: () => []
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        theme: {
            default: 'light'
        }
    },
    data() {
        return {
            dropHead: null,
            dragDown: false,
            dragItem: null
        };
    },
    computed: {
        computedProperty() {
            return (head) => {
                let current = this.extensions.find(
                    (it) => it.type === head.type
                );
                return current;
            };
        },
        computedIcon() {
            return (head) => {
                let current = this.extensions.find(
                    (it) => it.type === head.type
                );
                if (current) return current.icon;
                return 'Cancel';
            };
        },
        dropBackground() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.2);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        }
    },
    methods: {
        handleRowDrag(event, item) {
            event.stopPropagation();
            this.dragItem = item;
        },
        handleDragEnd() {
            this.dragDown = false;
        },
        dragOver(event, index) {
            event.preventDefault();
            event.stopPropagation();
            let item = this.heads[index];
            let itemTarget = this.$refs[`item-${index}`][0];
            if (this.dragItem === item) return;
            const { clientY } = event;
            const { top, height } = itemTarget.getBoundingClientRect();
            if (clientY - top < height / 2) {
                this.dropHead = item;
            } else {
                this.dropHead = null;
            }
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.dropHead = null;
        },
        dropItem(event, item) {
            event.preventDefault();
            event.stopPropagation();
            this.sortHeads(item, this.dragItem);
            this.dropHead = null;
        },
        sortHeads(drop, drag) {
            let dragIndex = this.heads.findIndex((it) => it === drag);
            let dragItem = this.heads[dragIndex];
            this.heads.splice(dragIndex, 1);
            let dropIndex = this.heads.findIndex((it) => it === drop);
            this.heads.splice(dropIndex, 0, dragItem);
        },
        switchVisible(item) {
            let visible = !item.visible;
            this.$set(item, 'visible', visible);
        }
    }
};
</script>
