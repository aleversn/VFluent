<template>
    <div :class="['fv-'+$theme+'-Pagination']">
        <div class="fv-pagination-container">
            <fv-button :disabled="thisValue == 1 || isDisabled" :class="{small: small, shadow: shadow}" class="page-btn" :theme="theme" :background="background" borderRadius="3" @click="prev">
                <i class="ms-Icon ms-Icon--ChevronLeft"></i>
            </fv-button>
            <fv-button v-show="item.show" v-for="(item, index) in itemList" :key="index" :class="{small: small, shadow: shadow}" class="page-btn" :theme="theme" :disabled="isDisabled" :background="background" :foreground="thisValue == item.num ? foreground : ''" borderRadius="3" fontWeight="bold" @click="handleClick(item)">
                <p :class="[{'ms-Icon ms-Icon--More': item.num < 0}]">{{item.num >= 0 ? item.num : ''}}</p>
            </fv-button>
            <fv-button :disabled="thisValue == total || isDisabled" :class="{small: small, shadow: shadow}" class="page-btn" :theme="theme" :background="background" borderRadius="3" @click="next">
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </fv-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvPagination',
    props: {
        value: {
            default: 1
        },
        foreground: {
            default: "rgba(0, 120, 212, 1)"
        },
        background: {
            default: "transparent"
        },
        total: {
            default: 10
        },
        maxVisual: {
            default: 7
        },
        small: {
            default: false
        },
        shadow: {
            default: false
        },
        disabled: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            itemList: []
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
            this.pageItem();
        },
        total (val) {
            if(val <= 0)
                this.itemList = [];
            else
                this.pageItem();
        }
    },
    computed: {
        isDisabled() {
			return (
				this.disabled.toString() == "true" ||
				this.disabled == "disabled" ||
				this.disabled === ""
			);
		},
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        if(this.total <= 0)
            this.itemList = [];
        else
            this.pageItem();
    },
    methods: {
        pageItem () {
            let result = [];
            let l = (this.thisValue - 2) * 2 + 3 <= this.maxVisual;
            let r = (this.total - this.thisValue - 1) * 2 + 3 <= this.maxVisual;
            if(this.total <= this.maxVisual)
                l = r = true;
            let remain = (this.thisValue == 1 || this.thisValue == this.total) ? this.maxVisual - 2 : this.maxVisual - 3;
            for(let i = 0; i < this.total; i++) {
                result.push({
                    num: i + 1,
                    index: i,
                    show: false
                });
            }
            result[0].show = true;
            result[result.length - 1].show = true;
            let cur_index = (result.find(item => item.num === this.thisValue)).index;
            result[cur_index].show = true;
            for(let i = 1; cur_index + i < result.length || cur_index - i > 0; i++) {
                if(cur_index - i > 0 && remain > 0) {
                    result[cur_index - i].show = true;
                    remain--;
                }
                if(cur_index + i < result.length - 1 && remain > 0) {
                    result[cur_index + i].show = true;
                    remain--;
                }
            }
            if(!l)
                result.splice(1, 0, {
                    num: -1,
                    index: -1,
                    show: true
                });
            if(!r)
                result.splice(this.total - 1, 0, {
                    num: -2,
                    index: -2,
                    show: true
                });
            this.itemList = result;
        },
        next () {
            this.thisValue++;
            this.$emit('next-click', this.thisValue);
        },
        prev () {
            this.thisValue--;
            this.$emit('prev-click', this.thisValue);
        },
        handleClick (item) {
            if(item.index >= 0)
                this.thisValue = item.num;
            else if(item.index == -1)
                this.thisValue = this.thisValue - this.maxVisual + 2 >= 1 ? this.thisValue - this.maxVisual + 2 : 1;
            else if(item.index == -2)
                this.thisValue = this.thisValue + this.maxVisual - 2 <= this.total ? this.thisValue + this.maxVisual - 2 : this.total;
            this.$emit('page-click', this.thisValue);
        }
    }
}
</script>
