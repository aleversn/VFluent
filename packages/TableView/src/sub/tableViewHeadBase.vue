<template>
    <div
        v-if="value.__guid"
        class="fv-tableview-head-item"
        :class="[{ onDrop: dropMode, fixed: value.fixed }]"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="dropItem"
        :style="{
            left: value.fixed && !value.fixedSide ? fixedLeftWidth + 'px' : '',
            right: value.fixed && value.fixedSide ? fixedRightWidth + 'px' : '',
            width: value.width + 'px',
            'border-color': dropMode ? foreground : '',
            'z-index': show.edit ? 6 : ''
        }"
    >
        <div
            class="fv-tableview-head-content"
            @click="show.edit = true"
            @contextmenu="
                $event.preventDefault();
                show.edit = true;
            "
        >
            <slot>
                <p style="margin-left: 5px">{{ value.emoji }}</p>
                <p style="margin-left: 5px">{{ value.name }}</p>
            </slot>
        </div>
        <spliter
            style="height: 100%"
            @mousedown="resizeDown($event)"
            @mousemove="resizeMove($event)"
            @touchstart="resizeDown($event.targetTouches[0])"
            @touchmove="resizeMove($event.targetTouches[0])"
        ></spliter>
        <edit-wrapper
            v-model="show.edit"
            :el="() => $el"
            :wrapperWidth="wrapperWidth"
            :isUnder="isUnder"
        >
            <slot name="entire" :value="value" :show="show.edit">
                <div
                    class="fv-tableview-default-edittool-row"
                    style="margin-top: 10px"
                >
                    <p class="fv-tableview-icon-block">{{ value.emoji }}</p>
                    <fv-text-box
                        v-model="value.name"
                        :placeholder="i18n('Column Name')"
                        :theme="theme"
                        underline
                        ref="text"
                        :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                        border-color="rgba(120, 120, 120, 0.1)"
                        :focus-border-color="foreground"
                        borderWidth="2"
                        is-box-shadow="true"
                        style="margin-left: 5px"
                    ></fv-text-box>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    style="margin-top: 5px"
                    @click="switchEditKey"
                >
                    <i class="row-icon ms-Icon ms-Icon--Equalizer"></i>
                    <p class="row-title">
                        {{
                            show.editKey
                                ? i18n('Save Property Key')
                                : i18n('Edit Property Key')
                        }}
                    </p>
                </div>
                <div
                    v-show="show.editKey"
                    class="fv-tableview-default-edittool-row"
                    style="margin: 10px 0px"
                >
                    <fv-text-box
                        v-model="thisKeyValue"
                        :placeholder="
                            i18n('Key Name') +
                            ' ' +
                            i18n('(Press Enter to Confirm)')
                        "
                        ref="keyName"
                        left-icon="Link"
                        underline
                        :border-color="
                            !thisKeyValue
                                ? 'rgba(200, 38, 45, 1)'
                                : 'rgba(120, 120, 120, 0.1)'
                        "
                        :focus-border-color="
                            !thisKeyValue ? 'rgba(200, 38, 45, 1)' : foreground
                        "
                        :border-width="2"
                        :is-box-shadow="true"
                        style="width: 10px; height: 35px; flex: 1"
                        @keydown.enter="saveEditKey"
                    ></fv-text-box>
                </div>
                <slot name="menu"></slot>
                <hr />
                <div class="fv-tableview-default-edittool-row lighter">
                    <i class="row-icon ms-Icon ms-Icon--Ascending"></i>
                    <p class="row-title">{{ i18n('Sort Ascending') }}</p>
                </div>
                <div class="fv-tableview-default-edittool-row lighter">
                    <i class="row-icon ms-Icon ms-Icon--Descending"></i>
                    <p class="row-title">{{ i18n('Sort Descending') }}</p>
                </div>
                <div class="fv-tableview-default-edittool-row lighter">
                    <i class="row-icon ms-Icon ms-Icon--Filter"></i>
                    <p class="row-title">{{ i18n('Filter') }}</p>
                </div>
                <hr />
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="switchHide"
                >
                    <i class="row-icon ms-Icon ms-Icon--Hide"></i>
                    <p class="row-title">{{ i18n('Hide in View') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="switchFixed"
                >
                    <i
                        class="row-icon ms-Icon"
                        :class="[`ms-Icon--${value.fixed ? 'Unpin' : 'Pin'}`]"
                    ></i>
                    <p class="row-title">
                        {{
                            value.fixed
                                ? i18n('Unfixed Column')
                                : i18n('Fixed Column')
                        }}
                    </p>
                </div>
                <div
                    v-show="value.fixed"
                    class="fv-tableview-default-edittool-row"
                    style="margin-bottom: 10px"
                >
                    <p class="row-title">{{ i18n('Fixed Side') }}</p>
                    <fv-toggle-switch
                        v-model="value.fixedSide"
                        :on="i18n('Right')"
                        :off="i18n('Left')"
                        :insideContent="true"
                        :switchOnBackground="foreground"
                        width="60"
                        style="margin-left: 15px"
                    ></fv-toggle-switch>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="
                        show.edit = false;
                        $emit('duplicate-column', index);
                    "
                >
                    <i class="row-icon ms-Icon ms-Icon--Copy"></i>
                    <p class="row-title">{{ i18n('Duplicate Column') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="deleteColumn"
                >
                    <i class="row-icon ms-Icon ms-Icon--Delete"></i>
                    <p class="row-title">{{ i18n('Delete Column') }}</p>
                </div>
                <hr />
                <div
                    class="fv-tableview-default-edittool-row"
                    style="margin-bottom: 10px"
                >
                    <p class="row-title">{{ i18n('Wrap Column') }}</p>
                    <fv-toggle-switch
                        v-model="value.wrap"
                        :on="i18n('Yes')"
                        :off="i18n('No')"
                        :insideContent="true"
                        :switchOnBackground="foreground"
                        width="60"
                        style="margin-left: 15px"
                    ></fv-toggle-switch>
                </div>
            </slot>
        </edit-wrapper>
    </div>
</template>

<script>
import spliter from './spliter.vue';
import editWrapper from './editWrapper.vue';

export default {
    name: 'FvTableViewHeadBase',
    components: {
        spliter,
        editWrapper
    },
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
        wrapperWidth: {
            default: '220px'
        },
        formatFunction: {
            default: null
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
            mouseDownPos: {
                disX: 0
            },
            dropMode: false,
            thisKeyValue: this.value.key,
            show: {
                edit: false,
                editKey: false
            }
        };
    },
    watch: {
        value() {
            this.formatHead();
            this.thisKeyValue = this.value.key;
        },
        'show.edit'(val) {
            if (val) {
                this.$nextTick(() => {
                    if (this.$refs.text) this.$refs.text.focus();
                });
            }
            this.show.editKey = false;
            this.$emit('show-edit', val);
        }
    },
    mounted() {
        this.formatHead();
    },
    methods: {
        formatHead() {
            if (this.formatFunction) this.formatFunction(this.value);
            else {
                let defaultHead = {
                    key: 'text',
                    name: '',
                    emoji: '📄',
                    type: 'text',
                    typeName: 'Text',
                    minWidth: 60,
                    width: 100,
                    fixed: false,
                    fixedSide: false,
                    wrap: false,
                    visible: true
                };
                for (let key in defaultHead) {
                    if (!this.value[key])
                        this.$set(this.value, key, defaultHead[key]);
                }
                if (!this.value.__guid)
                    this.$set(this.value, '__guid', this.GuidWithoutDash());
            }
        },
        switchHide() {
            this.show.edit = false;
            let status = !this.value.visible;
            this.$set(this.value, 'visible', status);
        },
        switchFixed() {
            this.show.edit = false;
            let status = !this.value.fixed;
            this.$set(this.value, 'fixed', status);
        },
        deleteColumn() {
            this.show.edit = false;
            this.$emit('delete-column', this.value);
        },
        resizeDown(event) {
            this.mouseDownPos.disX = event.clientX;
        },
        resizeMove(event) {
            let dis = event.clientX - this.mouseDownPos.disX;
            this.mouseDownPos.disX = event.clientX;
            let t = this.value.width + dis;
            t = t < this.value.minWidth ? this.value.minWidth : t;
            this.$set(this.value, 'width', t);
        },
        dragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dragItem === this.value) return;
            const { clientX } = event;
            const { left, width } = this.$el.getBoundingClientRect();
            if (clientX - left < width / 2) {
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
        },
        switchEditKey() {
            if (this.show.editKey) {
                this.saveEditKey();
            } else {
                this.show.editKey = true;
                this.$nextTick(() => {
                    this.$refs.keyName.focus();
                });
            }
        },
        saveEditKey() {
            if (!this.thisKeyValue) return;
            this.$set(this.value, 'key', this.thisKeyValue);
            this.show.editKey = false;
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
