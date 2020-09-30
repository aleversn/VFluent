<template>
<div :class="'fv-'+$theme+'-DetailsList'">
    <div class="list-head" :class="{'fv-custom-head': true}">
        <span v-show="multiSelection" class="icon-block" :style="styles.listHead" @click="chooseAll">
            <span class="icon" :class="{choose:currentChoosenAll}">
                <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
                <i class="ms-Icon ms-Icon--CircleRing ll"></i>
                <i class="ms-Icon ms-Icon--Completed ll"></i>
            </span>
        </span>
        <span v-show="showGroup" class="col" style="width: 36px; padding: 0px;" :style="styles.listHead">
            <span class="expand" :class="{choose: currentExpandAll}" @click="expandAll">
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </span>
        </span>
        <span v-show="item.show" v-for="(item, index) in thisHead" class="col" :key="`head: ${index}`" :style="{'min-width': colWidth[index], width: colWidth[index], background: styles.listHead.background}">
            <span class="col-content" @click="sortClick(item)">
                <slot name="head" :item="item" :index="index">
                    <p class="default-title">{{item.content}}</p>
                </slot>
                <i v-show="item.sortName === sort.name" class="ms-Icon sort" :class="[`ms-Icon--${sort.desc ? 'Down' : 'Up'}`]"></i>
            </span>
            <spliter style="height: 100%;" @mousedown="resizeDown($event, index)" @mousemove="resizeMove($event, index)"></spliter>
        </span>
    </div>
    <div v-if="!showGroup" class="list-content" ref="l1" :class="{compact: compact, 'auto-height': autoHeight}">
        <transition-group name="details-list" tag="div">
        <div v-show="item.show" v-for="(item, index) in thisValue" class="content-row" :key="`row: ${index}`" :draggable="allowDrag" :class="{choose: item.choosen, 'fv-custom-row': true}" @drag="drag($event, item)" @dragover="$event.preventDefault()" @drop="drop(item)" @contextmenu="rightClick($event, item)">
            <span v-show="multiSelection" class="icon-block icon" key="multi-col" @click="itemChooseClick(item)">
                <span class="icon" :class="{choose: item.choosen}">
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
            <slot name="row_expand" :item="item" :row_index="index"></slot>
        </div>
        </transition-group>
    </div>
    <div v-if="showGroup" class="list-content" ref="l2" :class="{compact: compact, 'auto-height': autoHeight}">
        <div v-for="(gi, i) in thisGroup" :key="`group: ${i}`">
            <div class="content-row" :class="{choose: isGroupChooseAll(gi), 'fv-custom-group-row': true}">
                <slot name="group" :item="gi" :index="i" :isMulti="multiSelection" :isChoose="isGroupChooseAll(gi)">
                    <span v-show="multiSelection" class="icon-block icon" key="multi-col" @click="chooseGroup(gi)">
                        <span class="icon" :class="{choose: isGroupChooseAll(gi)}">
                            <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
                            <i class="ms-Icon ms-Icon--CircleRing ll"></i>
                            <i class="ms-Icon ms-Icon--Completed ll"></i>
                        </span>
                    </span>
                    <span class="expand" :class="{choose: gi.expand}" @click="expandGroup(gi)">
                        <i class="ms-Icon ms-Icon--ChevronRight"></i>
                    </span>
                    <span class="col" style="min-width: 150px;">
                        <p>{{gi.name}}</p>
                    </span>
                </slot>
            </div>
            <transition name="zoom-in-top">
            <div v-show="gi.expand">
            <div v-show="item.show" v-for="(item, index) in gi.data" class="content-row" :key="`group: ${i} row: ${index}`" :class="{choose:item.choosen, 'fv-custom-row': true}" @contextmenu="rightClick($event, item)">
                <span v-show="multiSelection" class="icon-block icon" key="multi-col">
                    <span class="icon" :class="{choose:item.choosen}" @click="itemChooseClick(item)">
                        <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
                        <i class="ms-Icon ms-Icon--CircleRing ll"></i>
                        <i class="ms-Icon ms-Icon--Completed ll"></i>
                    </span>
                </span>
                <span class="col" style="width: 36px;" @click="chooseCurrent(item)"></span>
                <span v-show="col.show" v-for="(col, idx) in thisHead" class="col" :key="`group: ${i} row: ${index} col: ${idx}`" :style="{width: colWidth[idx]}" @click="chooseCurrent(item)">
                    <slot :name="`column_${idx}`" :item="item" :row_index="index" :col_index="idx">
                        <p>{{`row: ${index} col: ${idx}`}}</p>
                    </slot>
                </span>
                <slot name="row_expand" :item="item" :row_index="index"></slot>
            </div>
            </div>
            </transition>
        </div>
    </div>
    <transition name="zoom-in-top">
        <div v-show="show.rightMenu" class="fv-rightMenu" ref="rightMenu" :style="{left: posX + 'px', top: posY + 'px', width: rightMenuWidth + 'px'}">
            <slot name="menu">
                <div>
                    <span>
                        <p>{{currentChoosenNum}} Selected</p>
                    </span>
                </div>
            </slot>
        </div>
    </transition>
</div>
</template>

<script>
import spliter from './sub/spliter.vue';
import { FluentRevealEffect } from "fluent-reveal-effect";

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
        group: {
            default: () => []
        },
        filter: {
            default: () => {
                return {
                    key: "any",
                    value: ""
                }
            }
        },
        showGroup: {
            default: false
        },
        autoHeight: {
            default: false
        },
        headBackground: {
            default: ""
        },
        compact: {
            default: false
        },
        multiSelection: {
            default: false
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
            thisGroup: [],
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
            styles: {
                listHead: {
                    background: ""
                }
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
                let col = this.thisHead.find(item => item.sortName === this.sort.name);
                if(col != undefined)
                    this.sortClick(col, false);
            }
            this.groupInit();
        },
        head (val) {
            this.headInit();
        },
        group (val) {
            this.groupInit();
        },
        filter (val) {
            this.filterValue();
        },
        "filter.value" (val) {
            this.filterValue();
        },
        thisGroup (val) {
            this.getGroupDataInit();
        },
        headBackground (val) {
            this.stylesInit();
        },
        multiSelection (val) {
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = false;
                this.$set(this.thisValue, i, t);
            }
        },
        listWidth (val) {
            this.widthFormat(0);
        },
        "show.rightMenu" (val) {
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
        currentChoosen () {
            let result = [];
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen && this.thisValue[i].show)
                    result.push(this.thisValue[i]);
            }
            return result;
        },
        currentChoosenAll () {
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen != true && this.thisValue[i].show)
                    return false;
            }
            return true;
        },
        currentChoosenNum () {
            let count = 0;
            for (let i = 0; i < this.thisValue.length; i++) {
                if(this.thisValue[i].choosen && this.thisValue[i].show)
                    count++;
            }
            return count;
        },
        currentExpandAll () {
            for (let i = 0; i < this.thisGroup.length; i++) {
                if(this.thisGroup[i].expand != true)
                    return false;
            }
            return true;
        },
        borderLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor () {
            if(this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        }
    },
    mounted () {
        this.headInit();
        this.valueInit();
        this.groupInit();
        this.lazyLoadInit();
        this.rightMenuClearInit();
        this.listWidthRefreshInit();
        this.filterValue();
        this.FRInit();
        this.stylesInit();
    },
    methods: {
        FRInit () {
            FluentRevealEffect.applyEffect('body', {
                clickEffect: true,
                lightColor: this.borderLightColor,
                gradientSize: 80,
                isContainer: true,
                children: {
                    borderSelector: `.fv-${this.$theme}-DetailsList .list-head, .fv-${this.$theme}-DetailsList .rightMenu div`,
                    elementSelector: `.fv-${this.$theme}-DetaislList .list-head .col, .fv-${this.$theme}-DetailsList .rightMenu div span`,
                    lightColor: this.backgroundLightColor,
                    gradientSize: 120
                }
            });
        },
        stylesInit () {
            this.styles.listHead.background = this.headBackground;
        },
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
            for (let i = 0; i < val.length; i++) {
                val[i].choosen = val[i].choosen == undefined ? false : val[i].choosen;
                val[i].show = true;
            }
            this.thisValue = val;
            this.filterValue();
        },
        groupInit () {
            let model = {
                name: "",
                key: 60,
                value: 80,
                data: [],
                expand: true
            };
            this.thisGroup = [];
            for(let item of this.group) {
                let m = JSON.parse(JSON.stringify(model));
                if(typeof(item) == "string")
                    m.name = item;
                else
                {
                    for(let iter in item)
                        m[iter] = item[iter];
                }
                this.thisGroup.push(m);
            }
        },
        getGroupDataInit () {
            let group = this.thisGroup;
            for(let i = 0; i < group.length; i++) {
                group[i].data = [];
                for(let item of this.thisValue) {
                    if(item[group[i].key] == group[i].value)
                        group[i].data.push(item);
                }
            }
        },
        listWidthRefreshInit () {
            this.timer.width = setInterval(() => {
                let w = this.$el.clientWidth;
                if(this.multiSelection)
                    w-=50;
                if(this.showGroup)
                    w-=36;
                this.listWidth = w;
            }, 30);
        },
        lazyLoadInit () {
            this.$SUtility.ScrollToLoadInit(this.$refs.l1, () => {
                this.$emit('lazyload', this.thisValue);
            });
            this.$SUtility.ScrollToLoadInit(this.$refs.l2, () => {
                this.$emit('lazyload', this.thisValue);
            });
        },
        rightMenuClearInit () {
            window.addEventListener('click', event => {
                let x = event.target;
                if(x !== this.$refs.rightMenu)
                    this.show.rightMenu = false;
            });
        },
        filterValue () {
            let filter = this.filter;
            if(typeof(this.filter) == "string")
                filter = {
                    key: "any",
                    value: this.filter
                };
            if(filter.key == undefined || filter.value == undefined) {
                console.warn(this.filter, "Invalid filter.");
                return 0;
            }
            if(filter.key == "any") {
                for(let i = 0; i < this.thisValue.length; i++) {
                    let status = false;
                    let item = this.thisValue[i];
                    for(let it in this.thisValue[i]) {
                        if(typeof(item[it]) != "string")
                            continue;
                        if(item[it].toLowerCase().indexOf(filter.value.toLowerCase()) > -1) {
                            status = true;
                            break;
                        }
                    }
                    item.show = status;
                    this.$set(this.thisValue, i, item);
                }
            }
            else
            {
                for(let i = 0; i < this.thisValue.length; i++) {
                    let item = this.thisValue[i];
                    let status = (this.thisValue[i][this.filter.key].toLowerCase().indexOf(filter.value.toLowerCase()) > -1);
                    item.show = status;
                    this.$set(this.thisValue, i, item);
                }
            }
            this.$emit("change-value", this.thisValue);
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
        itemChooseClick (item) {
            let index = this.thisValue.indexOf(item);
            let t = item;
            t.choosen = !t.choosen;
            this.$set(this.thisValue, index, t);
            this.$emit("change-value", this.thisValue);
            this.$emit("choose-items", this.currentChoosen);
        },
        chooseCurrent (item) {
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = false;
                this.$set(this.thisValue, i, t);
            }
            item.choosen = true;
            this.$set(this.thisValue, this.thisValue.indexOf(item), item);
            this.$emit("change-value", this.thisValue);
            this.$emit("choose-items", this.currentChoosen);
        },
        chooseAll () {
            let status = !this.currentChoosenAll;
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = status;
                this.$set(this.thisValue, i, t);
            }
            this.$emit("change-value", this.thisValue);
            this.$emit("choose-items", this.currentChoosen);
        },
        isGroupChooseAll (group) {
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                if(!t.choosen)
                    return false;
            }
            return true;
        },
        chooseGroup (group) {
            let status = !this.isGroupChooseAll(group);
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                t.choosen = status;
                this.$set(this.thisValue, this.thisValue.indexOf(t), t);
            }
            this.$emit("change-value", this.thisValue);
            this.$emit("choose-items", this.currentChoosen);
        },
        expandGroup (group) {
            let index = this.thisGroup.indexOf(group);
            let g = group;
            g.expand = !g.expand;
            this.$set(this.thisGroup, index, g);
        },
        expandAll () {
            let status = !this.currentExpandAll;
            for (let i = 0; i < this.thisGroup.length; i++) {
                let g = this.thisGroup[i];
                g.expand = status;
                this.$set(this.thisGroup, i, g);
            }
        },
        rightClick (event, item) {
            event.preventDefault();
            this.show.rightMenu = true;
            let bounding = this.$el.getBoundingClientRect();
            let targetPos = {};
            targetPos.x = event.x;
            targetPos.y = event.y;
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
        sortClick (item, reverse=true) {
            /* 当要取消升降切换时将reverse设为false */
            let desc = this.sort.desc;
            if(item.sortName == false)
                return 0;
            if(this.sort.name != item.sortName)
                desc = false;
            else
                desc = reverse ? !this.sort.desc : this.sort.desc;
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
            if(this.currentChoosenNum == 0)
                this.dragTransfer = item;
            else if(!item.choosen)
            {
                this.chooseCurrent(item);
                this.dragTransfer = item;
            }
            else
                this.dragTransfer = this.currentChoosen;
        },
        drop (item) {
            let target = this.dragTransfer;
            let current = item;
            let c_index = this.thisValue.indexOf(current);
            if(this.currentChoosenNum > 0 && target[0].choosen) {
                for(let i = target.length - 1; i >= 0; i--)
                    this.thisValue.splice(this.thisValue.indexOf(target[i]), 1);
                if(current.choosen)
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
