<template>
<div :class="'fv-'+$theme+'-DetailsList'">
    <div class="list-head">
        <span v-show="multiSelection" class="icon-block" @click="chooseAll">
            <span class="icon" :class="{choose:currentChooseAll}">
                <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
                <i class="ms-Icon ms-Icon--CircleRing ll"></i>
                <i class="ms-Icon ms-Icon--Completed ll"></i>
            </span>
        </span>
        <span v-show="item.show" v-for="(item, index) in thisHead" class="col" :key="`head: ${index}`" :style="{width: colWidth[index]}">
            <span class="col-content" @click="sortClick(item)">
                <slot name="head" :item="item" :index="index">
                    <p class="default-title">{{item.content}}</p>
                </slot>
                <i v-show="item.sortName === sort.name" class="ms-Icon sort" :class="[`ms-Icon--${sort.desc ? 'Down' : 'Up'}`]"></i>
            </span>
            <spliter style="height: 100%;" @mousedown="resizeDown($event, index)" @mousemove="resizeMove($event, index)"></spliter>
        </span>
    </div>
    <div class="list-content">
        <transition-group name="detail-list" tag="div">
        <div v-for="(item, index) in thisValue" tag="div" class="content-row" :key="`row: ${index}`" :draggable="allowDrag" :class="{choose:item.choose}" @drag="drag($event, item)" @dragover="$event.preventDefault()" @drop="drop(item)" @contextmenu="rightClick($event, item)">
            <span v-show="multiSelection" class="icon-block icon" key="multi-col" @click="itemChooseClick(index)">
                <span class="icon" :class="{choose:item.choose}">
                    <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
                    <i class="ms-Icon ms-Icon--CircleRing ll"></i>
                    <i class="ms-Icon ms-Icon--Completed ll"></i>
                </span>
            </span>
            <span v-show="col.show" v-for="(col, idx) in thisHead" class="col" :key="`row: ${index} col: ${idx}`" :style="{width: colWidth[idx]}" @click="chooseCurrent(item)">
                <slot :name="`column_${idx}`" :item="item" :row_index="index" :col_index="idx">
                    <p>{{`row: ${index} col: ${idx}`}}</p>
                </slot>
            </span>
        </div>
        </transition-group>
    </div>
    <transition name="zoom-in-top">
        <div v-show="show.rightMenu" class="rightMenu" ref="rightMenu" :style="{left: posX + 'px', top: posY + 'px', width: rightMenuWidth + 'px'}">
            <slot name="menu">
                <div>
                    <span>
                        <p>{{currentChooseNum}} Selected</p>
                    </span>
                </div>
            </slot>
        </div>
    </transition>
</div>
</template>

<script>
import spliter from './sub/spliter.vue';

export default {
    name: "FvDetailsList",
    components: {
        spliter
    },
	props: {
        value: {
            default: () => []
        },
        head: {
            default: () => []
        },
        multiSelection: {
            default: true
        },
        allowDrag: {
            default: false
        },
        rightMenuWidth: {
            default: 200
        },
		theme: {
			type: String,
			default: "system"
		}
    },
    data () {
		return {
            thisValue: [],
            listWidth: 0,
            thisHead: [],
            posX: 0,
            posY: 0,
            rightMenuHeight: 0,
            sort: {
                name: "",
                desc: false
            },
            dragTransfer: {},
            show: {
                rightMenu: false
            },
            timer: {
                width: {}
            }
        };
    },
    watch: {
        value (val) {
            this.valueInit();
            if(this.sort.name != "")
            {
                let col = this.head.find(item => item.sortName === this.sort.name);
                if(col != undefined)
                    this.sortClick(col);
            }
        },
        head (val) {
            this.headInit();
        },
        listWidth (val) {
            this.widthFormat(0);
        },
        'show.rightMenu' (val) {
            if(this.rightMenuHeight == 0)
                this.rightMenuHeight = this.$refs.rightMenu.clientHeight;
        }
    },
	computed: {
		$theme () {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
        },
        colWidth () {
            let width = [];
            for(let item of this.thisHead) {
                width.push(`${item.width}px`);
            }
            return width;
        },
        currentChoose () {
            let result = [];
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choose)
                    result.push(this.thisValue[i]);
            }
            return result;
        },
        currentChooseAll () {
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choose != true)
                    return false;
            }
            return true;
        },
        currentChooseNum () {
            let count = 0;
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choose)
                    count++;
            }
            return count;
        }
    },
    mounted () {
        this.headInit();
        this.valueInit();
        this.rightMenuClearInit();
        this.listWidthRefreshInit();
    },
    methods: {
        headInit () {
            let model = {
                content: "",
                minWidth: 60,
                width: 80,
                disX: 0,
                sortName: false,
                customSort: false,
                show: true
            };
            this.thisHead = [];
            for(let item of this.head) {
                let m = JSON.parse(JSON.stringify(model));
                if(typeof(item) == "string")
                    m.content = item;
                else
                {
                    for(let iter in item)
                        m[iter] = item[iter];
                }
                this.thisHead.push(m);
            }
        },
        valueInit () {
            let val = JSON.parse(JSON.stringify(this.value));
            for (let i = 0; i < val.length; i++)
                val[i].choose = false;
            this.thisValue = val;
        },
        listWidthRefreshInit () {
            this.timer.width = setInterval(() => {
                this.listWidth = this.$el.clientWidth > 48 ? this.$el.clientWidth - 48 : 0;
            }, 30);
        },
        rightMenuClearInit () {
            window.addEventListener('click', event => {
                let x = event.target;
                if(x !== this.$refs.rightMenu)
                    this.show.rightMenu = false;
            });
        },
        resizeDown (event, index) {
            let item = this.thisHead[index];
            item.disX = event.clientX;
            this.$set(this.thisHead, index, item);
        },
        resizeMove (event, index) {
            let item = this.thisHead[index];
            let dis = event.clientX - item.disX;
            item.disX = event.clientX;
            let t = item.width + dis;
            t = t < item.minWidth ? item.minWidth : t;
            let sum = 0;
            for(let i = 0; i < index; i++)
                sum += this.thisHead[i].width;
            t = t > (this.listWidth - sum) ? (this.listWidth - sum) : t;
            item.width = t;
            this.$set(this.thisHead, index, item);
            this.widthFormat(index);
        },
        widthFormat (index) {
            if(index < this.thisHead.length - 1)
            {
                let sum = 0;
                for(let i = 0; i <= index; i++) {
                    sum += this.thisHead[i].width;
                }
                let remain = this.listWidth - sum;
                let r = remain;
                let need = 0;
                for(let i = index + 1; i < this.thisHead.length; i++)
                    need += this.thisHead[i].width;
                for(let i = this.thisHead.length - 1; i > index; i--) {
                    let n = need - this.thisHead[i].width;
                    if(n + this.thisHead[i].minWidth <= remain) {
                        let item = this.thisHead[i];
                        item.width = remain - n;
                        item.show = true;
                        this.$set(this.thisHead, i, item);
                        break;
                    }
                    else
                    {
                        let item = this.thisHead[i];
                        item.show = false;
                        this.$set(this.thisHead, i, item);
                    }
                    need -= this.thisHead[i].width;
                }
            }
        },
        itemChooseClick (index) {
            let t = this.thisValue[index];
            t.choose = !t.choose;
            this.$set(this.thisValue, index, t);
        },
        chooseCurrent (item) {
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choose = false;
                this.$set(this.thisValue, i, t);
            }
            item.choose = true;
            this.$set(this.thisValue, this.thisValue.indexOf(item), item);
        },
        chooseAll () {
            let status = !this.currentChooseAll;
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choose = status;
                this.$set(this.thisValue, i, t);
            }
        },
        rightClick (event, item) {
            event.preventDefault();
            this.show.rightMenu = true;
            let bounding = this.$el.getBoundingClientRect();
            let targetPos = {};
            targetPos.x = event.pageX;
            targetPos.y = event.pageY;
            if(targetPos.x < bounding.left)
                targetPos.x = bounding.left;
            if(targetPos.x + this.rightMenuWidth > bounding.right)
                targetPos.x = bounding.right - this.rightMenuWidth;
            if(targetPos.y < bounding.top)
                targetPos.y = bounding.top;
            if(targetPos.y + this.rightMenuHeight > bounding.bottom)
                targetPos.y = bounding.bottom - this.rightMenuHeight;
            this.posX = targetPos.x;
            this.posY = targetPos.y;

            this.$emit('rightclick', item);
        },
        sortClick (item) {
            let desc = this.sort.desc;
            if(item.sortName == false)
                return 0;
            if(this.sort.name != item.sortName)
                desc = false;
            else
                desc = !this.sort.desc;
            this.sort.name = item.sortName;
            this.sort.desc = desc;
            desc = desc ? -1 : 1;
            if(item.customSort != false)
                this.thisValue.sort((a, b) => desc * item.customSort(a, b));
            else
                this.inteliSort(item.sortName, desc);
        },
        inteliSort (key = 0, desc = false) {
            let sortFunc = this.sortName;
            let timeReg = [/^\d{4}[-/]\d{1,2}[-/]\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/, /^\d{1,2}[-/]\d{1,2}[-/]\d{4} \d{1,2}:\d{1,2}:\d{1,2}$/, /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/, /^\d{1,2}[-/]\d{1,2}[-/]\d{4}/];
            let ex = this.thisValue[0][key];
            if(!isNaN(ex))
                sortFunc = this.sortNum;
            else
            {
                for(let reg of timeReg) {
                    if(!ex.toString().match(reg) == false)
                        sortFunc = this.sortTime;
                }
            }
            this.thisValue.sort((a, b) => desc * sortFunc(a[key], b[key]));
        },
        sortNum (item1, item2) {
            return parseFloat(item1) < parseFloat(item2) ? 1 : -1;
        },
        sortName (item1, item2) {
            return item1.localeCompare(item2);
        },
        sortTime (item1, item2) {
            return this.$SDate.Compare(
                this.$SDate.Parse(item1),
                this.$SDate.Parse(item2)
            );
        },
        drag (event, item) {
            if(this.currentChooseNum == 0)
                this.dragTransfer = item;
            else if(!item.choose)
            {
                this.chooseCurrent(item);
                this.dragTransfer = item;
            }
            else
                this.dragTransfer = this.currentChoose;
        },
        drop (item) {
            let target = this.dragTransfer;
            let current = item;
            let c_index = this.thisValue.indexOf(current);
            if(this.currentChooseNum > 0 && target[0].choose) {
                for(let i = target.length - 1; i >= 0; i--)
                    this.thisValue.splice(this.thisValue.indexOf(target[i]), 1);
                if(current.choose)
                    this.thisValue.splice(0, 0, ...target);
                else
                {
                    c_index = this.thisValue.indexOf(current);
                    this.thisValue.splice(c_index, 0, ...target);
                }
            }
            else
            {
                let t_index = this.thisValue.indexOf(target);
                this.thisValue.splice(t_index, 1);
                this.thisValue.splice(c_index, 0, target);
            }
        }
    },
    beforeDestroy () {
        for(let item in this.timer) {
            clearInterval(this.timer[item]);
        }
    }
};
</script>
