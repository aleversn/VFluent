<template>
    <div
        v-show="thisValue"
        draggable="false"
        class="fv-tableview-edit-wrapper-background"
        @click="
            thisValue = false;
            $event.stopPropagation();
        "
        @mousemove="$event.preventDefault()"
    >
        <fv-Affix
            :target="el"
            left="0"
            :top="isUnder ? '100%' : 0"
            :mode="thisValue ? 'fixed' : 'relative'"
        >
            <transition name="fv-tableview-edit-wrapper">
                <div
                    v-show="thisValue"
                    draggable="false"
                    class="fv-tableview-edit-wrapper-container"
                    :style="{ width: wrapperWidth }"
                    @click="$event.stopPropagation()"
                >
                    <slot></slot>
                </div>
            </transition>
        </fv-Affix>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: false
        },
        el: {
            default: () => document.body
        },
        wrapperWidth: {
            default: '300px'
        },
        isUnder: {
            default: false
        }
    },
    data() {
        return {
            thisValue: this.value
        };
    },
    watch: {
        value() {
            this.thisValue = this.value;
        },
        thisValue() {
            this.$emit('input', this.thisValue);
        }
    },
    methods: {}
};
</script>
