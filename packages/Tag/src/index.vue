<template>
    <div :class="['fv-'+$theme+'-Tag']">
        <div v-for="(item, index) in thisValue" :key="index" class="fv-tag-item" :class="[item.type ? item.type : '', size, {disabled: item.disabled}]" :style="{background: item.background ? getColor(item.background)['background'] : '', borderColor: item.background ? getColor(item.background)['borderColor'] : '', color: item.background ? getColor(item.background)['color'] : ''}" @click="$emit('tag-click', item)">
            <span class="fv-tag-content">
                <slot>
                    {{item.text}}
                </slot>
            </span>
            <i v-show="isDel && !item.disabled" class="ms-Icon ms-Icon--Cancel fv-tag-icon" @click="delTag(item)"></i>
        </div>
        <div v-show="isNewTag" ref="add" class="fv-tag-item controller" :class="[size]" :style="{background: newTagBackground ? getColor(newTagBackground)['background'] : '', borderColor: newTagBackground ? getColor(newTagBackground)['borderColor'] : '', color: newTagBackground ? getColor(newTagBackground)['color'] : ''}" @click="editable">
            <i v-show="!edit" class="ms-Icon ms-Icon--Add fv-tag-icon"></i>
            <span v-show="!edit" class="fv-tag-content">{{newTagPlaceholder}}</span>
            <fv-text-box v-show="edit" v-model="inputValue" ref="edit" :placeholder="newTagPlaceholder" style="width: auto;" @keydown.enter="addTag"></fv-text-box>
        </div>
    </div>
</template>

<script>
import one from "onecolor";

export default {
    name: 'FvTag',
    props: {
        value: {
            default: () => []
        },
        newTagPlaceholder: {
            default: 'New Tag'
        },
        size: {
            default: ''
        },
        newTagBackground: {
            default: null
        },
        isNewTag: {
            default: false
        },
        isDel: {
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
            inputValue: '',
            edit: false
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit("input", val);
        },
        edit () {
            if(this.inputValue !== '')
                this.addTag();
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener("click", (event) => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                    if (x == this.$refs.add) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) {
                    this.edit = false;
                }
            });
            window.addEventListener("touchend", (event) => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                    if (x == this.$refs.add) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) {
                    this.edit = false;
                }
            });
        },
        editable () {
            this.edit = true;
            setTimeout(() => {
                this.$refs.edit.focus();
            }, 10);
        },
        addTag () {
            this.thisValue.push({
                text: this.inputValue
            });
            this.inputValue = "";
            this.$emit('add-item', {
                text: this.inputValue
            });
        },
        delTag (item) {
            let idx = this.thisValue.indexOf(item);
            this.thisValue.splice(idx, 1);
            this.$emit('del-item', item);
        },
        getColor (color) {
            color = one(color);
            if(this.$theme == 'dark')
                return {
                    background: color.alpha(1).cssa(),
                    borderColor: color.alpha(1).cssa(),
                    color: 'whitesmoke'
                }
            return {
                background: color.alpha(0.1).cssa(),
                borderColor: color.alpha(0.1).cssa(),
                color: color.alpha(1).cssa()
            }
        }
    }
}
</script>
