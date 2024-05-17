<template>
    <div class="fv-tableview-addmenu">
        <div class="addmenu-title-block" @click="$event.stopPropagation()">
            {{ i18n('New Property') }}
        </div>
        <div
            style="position: relative; padding: 0px 10px"
            @click="$event.stopPropagation()"
        >
            <fv-text-box
                v-model="filterValue"
                :placeholder="i18n('Search Property')"
                :theme="theme"
                underline
                icon="Filter"
                :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                border-color="rgba(120, 120, 120, 0.1)"
                :focus-border-color="foreground"
                :border-width="2"
                :is-box-shadow="true"
                style="width: 100%; height: 35px; margin-bottom: 5px"
            ></fv-text-box>
        </div>
        <span
            v-show="isShow(item)"
            v-for="(item, index) in extensions"
            :key="index"
            :ref="`item-${index}`"
            @click="$emit('add-column', item)"
        >
            <div class="addmenu-left-block">
                <i
                    class="ms-Icon"
                    :class="[`ms-Icon--${computedIcon(item)}`]"
                    style="margin-left: 5px"
                ></i>
                <p>{{ item.name }}</p>
            </div>
            <div class="addmenu-right-block">
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </div>
        </span>
    </div>
</template>

<script>
import one from 'onecolor';

export default {
    props: {
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
            filterValue: ''
        };
    },
    computed: {
        computedIcon() {
            return (head) => {
                let current = this.extensions.find(
                    (it) => it.type === head.type
                );
                if (current) return current.icon;
                return 'Cancel';
            };
        },
        isShow() {
            return (item) => {
                if (!this.filterValue) return true;
                return item.name
                    .toLowerCase()
                    .includes(this.filterValue.toLowerCase());
            };
        }
    },
    methods: {}
};
</script>
