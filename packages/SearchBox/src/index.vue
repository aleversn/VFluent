<template>
    <div
        :class="['fv-'+$theme+'-SearchBox', status, isFocus ? 'focus' : '', isDisabled ? 'disabled' : '', isUnderline ? 'underline': '', { shadow: isBoxShadow }]"
        :style="[{ background: background, borderRadius: `${borderRadius}px` }]"
        @keydown="show.searchResult = true"
        @keyup.delete="onBackspace"
        @click="isFocus = true"
    >
        <fv-reveal-container
            :parent="() => $el"
            class="fv-search-box-reveal-container"
            :backgroundColor="backgroundLightColor"
            :borderColor="borderLightColor"
            :backgroundGradientSize="120"
            :borderGradientSize="60"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :disabled="isDisabled || !revealBorder"
        ></fv-reveal-container>
        <div
            class="search-box-wrapper-container"
            :style="[thisBorderColor, { background: background, borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }]"
        >
            <i
                v-show="leftIcon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${leftIcon}`]"
                @click="$emit('left-icon-click', $event)"
            ></i>
            <transition name="move-left-to-right">
                <div
                    v-show="resultPlaceholder.length > 0"
                    class="search-box-placeholder"
                >
                    <slot
                        name="resultPlaceholder"
                        :resultPlaceholder="resultPlaceholder"
                    ></slot>
                </div>
            </transition>
            <div class="search-box-container">
                <input
                    v-model="thisValue"
                    :type="type"
                    :placeholder="placeholder"
                    class="input"
                    :readonly="isReadOnly"
                    :disabled="isDisabled"
                    :maxlength="maxlength"
                    ref="input"
                    :style="{'font-size': `${fontSize}px`, 'font-weight': fontWeight, color: foreground, 'text-align': textAlign}"
                    @keydown="$emit('keydown', $event)"
                    @keyup="$emit('keyup', $event)"
                    @change="$emit('change', $event)"
                    @paste="$emit('paste', $event)"
                    @focus="isFocus = true"
                    @blur="isFocus = false"
                />
            </div>
            <i
                v-show="thisValue.length > 0 || resultPlaceholder.length > 0"
                class="ms-Icon ms-Icon--Cancel icon-block"
                @click="clearValue"
            ></i>
            <i
                v-show="icon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${icon}`]"
                @click="$emit('icon-click', $event)"
            ></i>
        </div>
        <transition name="zoom-in-top">
            <div
                v-show="show.searchResult"
                class="search-result-container"
                ref="filterResult"
            >
                <slot
                    name="searchResult"
                    :data="filterOptions"
                    :chooseResult="chooseResult"
                >
                    <fv-list-view
                        v-model="filterOptions"
                        :theme="theme"
                        style="width: 100%; height: auto;"
                        @chooseItem="chooseResult"
                    ></fv-list-view>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'FvSearchBox',
    props: {
        value: {
            default: ''
        },
        options: {
            default: () => []
        },
        placeholder: {
            default: ''
        },
        type: {
            default: 'text'
        },
        readonly: {
            default: false
        },
        maxlength: {
            default: ''
        },
        customFilter: {
            default: false
        },
        resultPlaceholder: {
            default: false
        },
        focusShow: {
            default: false
        },
        leftIcon: {
            default: ''
        },
        icon: {
            default: ''
        },
        underline: {
            default: false
        },
        background: {
            default: ''
        },
        borderWidth: {
            default: 1
        },
        borderColor: {
            default: ''
        },
        focusBorderColor: {
            default: ''
        },
        foreground: {
            default: ''
        },
        fontSize: {
            default: 13.3
        },
        fontWeight: {
            default: 'normal'
        },
        textAlign: {
            default: 'left'
        },
        borderRadius: {
            default: 3
        },
        isBoxShadow: {
            default: false
        },
        revealBorder: {
            default: false
        },
        status: {
            default: ''
        },
        debounceDelay: {
            default: 300
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
            FR: null,
            thisValue: this.value,
            isFocus: false,
            filterOptions: this.options,
            show: {
                searchResult: false
            },
            timer: {
                debounce: null
            }
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            clearTimeout(this.timer.debounce);
            this.timer.debounce = setTimeout(() => {
                this.$emit('debounce-input', this.thisValue);
            }, this.debounceDelay);
            this.$emit('input', val);
            this.refreshFilter();
        },
        isFocus(val) {
            if (val && this.focusShow) this.show.searchResult = true;
        }
    },
    computed: {
        thisBorderColor() {
            if (this.isUnderline) {
                if (this.isFocus)
                    return {
                        borderBottomColor: this.focusBorderColor
                    };
                return {
                    borderBottomColor: this.borderColor
                };
            }
            if (this.isFocus)
                return {
                    borderColor: this.focusBorderColor
                };
            return {
                borderColor: this.borderColor
            };
        },
        isUnderline() {
            return (
                this.underline.toString() == 'true' ||
                this.underline == 'underline' ||
                this.underline === ''
            );
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        borderLightColor() {
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor() {
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        },
        isReadOnly() {
            return (
                this.readonly.toString() == 'true' ||
                this.readonly == 'readonly' ||
                this.readonly === ''
            );
        },
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
        this.lazyLoadInit();
        this.outSideClickInit();
    },
    methods: {
        lazyLoadInit() {
            this.$SUtility.ScrollToLoadInit(this.$refs.filterResult, () => {
                this.$emit('lazyload', this.filterOptions);
            });
        },
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
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
            if (!_self) this.show.searchResult = false;
        },
        refreshFilter() {
            let result = [];
            if (this.customFilter !== false)
                result = this.customFilter(this.options);
            else {
                for (let item of this.options) {
                    if (
                        item.name
                            .toString()
                            .toLowerCase()
                            .indexOf(this.thisValue.toLowerCase()) > -1
                    )
                        result.push(item);
                }
            }
            this.filterOptions = result;
        },
        chooseResult(event) {
            this.thisValue = event.item.name;
            this.$emit('choose-result', event.item);
            this.show.searchResult = false;
        },
        onBackspace() {
            if (this.thisValue === '' && this.resultPlaceholder.length > 0) {
                let result = this.resultPlaceholder;
                result.splice(result.length - 1, 1);
                this.$emit('update:resultPlaceholder', result);
            }
        },
        clearValue() {
            this.thisValue = '';
            this.$emit('update:resultPlaceholder', []);
            this.$emit('clear-click');
        }
    },
    beforeDestroy() {
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
