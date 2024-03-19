<template>
    <div :class="['fv-'+$theme+'-RatingControl']">
        <div class="fv-rating-container">
            <div
                v-for="(item, index) in maxRate"
                :key="index"
                class="fv-rating-unit"
                @mousemove="handlerHover($event, index)"
                @touchmove="handlerHover($event, index)"
                @mouseleave="$set(hover, index, {status: false})"
                @touchend="$set(hover, index, {status: false})"
                @click="handlerClick($event, index)"
            >
                <i
                    class="ms-Icon background"
                    :class="[`ms-Icon--${defaultIcon}`]"
                    :style="{color: borderColor}"
                ></i>
                <div
                    v-show="itemShow(index)"
                    class="fv-rating-mask"
                    :style="{width: `${itemRatio(index)}%`}"
                >
                    <i
                        class="ms-Icon foreground"
                        :class="[`ms-Icon--${selectedIcon}`]"
                        :style="{color: selectedColor}"
                    ></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvRatingControl',
    props: {
        value: {
            default: 0
        },
        maxRate: {
            default: 5
        },
        halfRate: {
            default: false
        },
        defaultIcon: {
            type: String,
            default: 'FavoriteStar'
        },
        selectedIcon: {
            type: String,
            default: 'FavoriteStarFill'
        },
        borderColor: {
            type: String,
            default: ''
        },
        selectedColor: {
            type: String,
            default: ''
        },
        isClear: {
            default: false
        },
        readonly: {
            default: false
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            thisValue: this.value,
            hover: []
        };
    },
    watch: {
        value(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        maxRate(val) {
            this.hover = new Array(val).fill({
                status: false,
                ratio: 100
            });
        }
    },
    mounted() {
        this.thisValue = this.value;
        this.hover = new Array(this.maxRate).fill({
            status: false,
            ratio: 100
        });
    },
    computed: {
        itemShow() {
            return (index) => {
                if (this.hoverIndex < 0) return index - this.thisValue < 0;
                return index <= this.hoverIndex;
            };
        },
        itemRatio() {
            return (index) => {
                if (this.hoverIndex < 0) {
                    if (index + 1 <= parseInt(this.thisValue)) return 100;
                    return (this.thisValue - parseInt(this.thisValue)) * 100;
                }
                return this.hoverIndex === index
                    ? this.hover[index].ratio
                    : 100;
            };
        },
        hoverIndex() {
            return this.hover.findIndex((item) => item.status);
        },
        isReadOnly() {
            return (
                this.readonly.toString() == 'true' ||
                this.readonly == 'readonly' ||
                this.readonly === ''
            );
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    methods: {
        handlerHover(event, index) {
            if (this.isReadOnly) return;
            let elWidth = event.target.offsetWidth;
            let { left: elLeft } = event.target.getBoundingClientRect();
            let { clientX: mouseLeft } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            let ratio = ((mouseLeft - elLeft) / elWidth) * 100;
            let finalRatio = ratio > 50 || !this.halfRate ? 100 : 50;
            this.$emit('hover', {
                index: index,
                ratio: finalRatio
            });
            this.$set(this.hover, index, {
                status: true,
                ratio: finalRatio
            });
        },
        handlerClick(event, index) {
            if (this.isReadOnly) return;
            if (!this.halfRate) {
                if (this.isClear && this.thisValue == index + 1) {
                    this.thisValue = 0;
                    this.clearHover();
                    return;
                }
                this.thisValue = index + 1;
                return;
            }
            let elWidth = event.target.offsetWidth;
            let { left: elLeft } = event.target.getBoundingClientRect();
            let { clientX: mouseLeft } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            let ratio = ((mouseLeft - elLeft) / elWidth) * 100;
            if (
                this.isClear &&
                this.thisValue == index + 1 - (ratio > 50 ? 0 : 0.5)
            ) {
                this.thisValue = 0;
                this.clearHover();
                return;
            }
            this.thisValue = index + 1 - (ratio > 50 ? 0 : 0.5);
        },
        clearHover() {
            for (let i = 0; i < this.maxRate; i++) {
                this.$set(this.hover, i, {
                    status: false,
                    ratio: 100
                });
            }
        }
    }
};
</script>
