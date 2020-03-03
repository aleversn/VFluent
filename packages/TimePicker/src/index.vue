<template>
  <div :class="['fv-'+$theme+'-timePicker']">
    <div class="fv-TimePicker__input" @click="focus()">
      <button
        class="fv-TimePicker__input-item"
      >{{timeType==12?(value.getHours()-1)%12+1:value.getHours()}}</button>
      <button
        class="fv-TimePicker__input-item"
        :style="{borderColor:innerBorderColor}"
      >{{value.getMinutes()}}</button>
      <button
        :style="{borderColor:innerBorderColor}"
        class="fv-TimePicker__input-item"
      >{{value.getHours() >=12 ? period[1]:period[0]}}</button>
    </div>
    <div v-show="show" class="fv-TimePicker__options">
      <div class="fv-TimePicker__options-body">
        <div class="fv-TimePicker__options-body-mask"></div>
        <div
          v-for="(col,index1) in data"
          :key="`options-col${index1}`"
          class="fv-TimePicker__options-body-col"
        >
          <div class="fv-TimePicker__options-body-col-up"></div>
          <div class="fv-TimePicker__options-body-items" :ref="`col${index1}`">
            <div
              class="fv-TimePicer__options-body-item"
              v-for="(item,index) in col"
              :key="`options-col-item${index1}${item}${index}`"
            >{{item>=0?item:''}}</div>
          </div>
          <div class="fv-TimePicker__options-body-col-down"></div>
        </div>
      </div>
      <div class="fv-TimePicker__options-bar">
        <button class="fv-TimePicker__options-bar-accept">
          <i class="ms-Icon ms-Icon--accept"></i>
        </button>
        <button class="fv-TimePicker__options-bar-canner">
          <i class="ms-Icon ms-Icon--cancer"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FvTimePicker",
  props: {
    theme: {
      type: String,
      default: "system"
    },
    timeType: {
      type: Number,
      default: 12
    },
    value: {
      type: Date,
      default: ()=>new Date()
    },
    period: {
      type: Array,
      default: () => ["A.M.", "P.M."]
    },
    innerBorderColor: {
      type: String,
      default: "#cccccc"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      data: [
        // data 1st=>hours,2nd=>minutes,3rd=>period
        [],
        []
      ],
      window: {
        event: {
          click: evt => {
            let dom = evt.target;
            let inside = false;
            while (dom) {
              if (dom == this.$el) {
                inside = true;
                break;
              }
              dom = dom.parentNode;
            }
            if (!inside) {
              this.show = false;
            }
          }
        }
      },
      config: {
        optionCount: 9,
        buffer: 1
      },
      selected:{
        date:this.value
      }
    };
  },
  computed: {
    $theme() {
      if (this.theme == "system") return this.$fvGlobal.state.theme;
      return this.theme;
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.selected.date=this.value
        this.init();
      }
    }
  },
  mounted() {
    this.init()
    this.loadEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    focus() {
      this.show = true;
    },
    init() {
      this.data = [[], []];
      if (this.timeType == "12") {
        this.data.push([]);
      }
      this.size=[this.timeType==12?12:24,60,2]
      for (let i=0;i<this.data.length;++i){
          let col = this.data[i]
          this.setOptions(col,this.size[i],i)
      }
    },
    nPrev(num, size, next = 1, offset = 1) {
      num = Math.round(num)
      let offsetSize = next * size;
      return ((num + offsetSize - offset - next) % size) + offset
    },
    nNext(num, size, next = 1, offset = 1) {
      num = Math.round(num)
      let offsetSize = offset * size;
      return ((num + offsetSize + next - offset) % size) + offset
    },
    loadEvent() {
      for (let key in this.window.event) {
        let event = this.window.event[key];
        window.addEventListener(key, event);
      }
    },
    setOptions(data,size,index){
        let count=this.config.optionCount+this.config.buffer*2;
        let num;
        let date = this.selected.date;
        switch (index){
            case 0:
                num = this.nPrev(date.getHours(),size,Math.floor(count/2))
                break;
            case 1:
                num = this.nPrev(date.getMinutes(),size,Math.floor(count/2))
                break;
            case 2:
                num = this.nPrev(date.getHours()/12,size,Math.floor(count/2),0)
                break;
        }
        for (let i=0;i<count;++i){
            if (index==2){
                if (i!=5 && i-num!=4 && i-num!=5){
                    data.push(-num)
                }else{
                    data.push(num)
                }
            }else{
                data.push(num)
            }
            num=this.nNext(num,size,1,index==2?0:1)
        }
    },
    loadSlide(col,size,index){
      let refName=`col${index}`
      let origin = (this.$refs[refName].scrollTop=40*this.config.buffer)
      if (this.options[refName].scroll){
        this.$refs[refName].removeEventListener('scroll',this.options[refName].scroll)
      }
      this.options[refName].scroll=()=>{
        if (this.options[refName].slideLock) return
        if (index==2){
          if (this.$refs[refName].scrollTop-origin>0){
            if (this.selected.date.getHours()<12){
              this.$refs[refName].scrollTop=origin
              return
            }
          }else{
            if (this.selected.date.getHours()>=12){
              this.$refs[refName].scrollTop=origin
              return
            }
          }
        }
        this.slideCol(origin,refName,()=>{
          this.data[index].unshift()
          let num;
          switch (index){
            case 0:
              num = this.nNext(this.selected.date.getHours(),size,0)
              this.selected.date.setHours(this.nNext(num,size,1))
              break;
            case 1:
              num = this.nNext(this.selected.date.getMinutes(),size,0)
              this.selected.date.setMinutes(this.nNext(num,size,1))
              break;
            case 2:
              num = this.selected.date.getHours()/12;
              if (num==0)
                this.selected.date.setHours(this.selected.date.getHours()+12)
              break;
          }
          let next = this.nNext(num,size,(this.config.optionCount-1)/2+this.config.buffer+1)
          if (index==2){
            next=-1;
          }
          this.data[index].push(next)
        },()=>{
          this.data[index].pop()
          let num;
          switch (index){
            case 0:
              num = this.nNext(this.selected.date.getHours(),size,0)
              this.selected.date.setHours(this.nPrev(num,size,1))
              break;
            case 1:
              num = this.nNext(this.selected.date.getMinutes(),size,0)
              this.selected.date.setMinutes(this.nPrev(num,size,1))
              break;
            case 2:
              num = this.selected.date.getHours()/12;
              if (num==1)
                this.selected.date.setHours(this.selected.date.getHours()-12)
              break;
          }
          let next = this.nPrev(num,size,(this.config.optionCount-1)/2+this.config.buffer+1)
          if (index==2){
            next=-1;
          }
          this.data[index].unshift(next)
        })
      }
    },
    removeEvent() {
      for (let key in this.window.event) {
        let event = this.window.event[key];
        window.removeEventListener(key, event);
      }
    },
    slideCol(origin, refName, nxtCallback, preCallback) {
      if (Math.abs(this.$refs[refName].scrollTop - origin) >= 20) {
        if (this.$refs[refName].scrollTop > origin) {
          nxtCallback();
        } else {
          preCallback();
        }
        this.$nextTick(() => {
          this.$refs[refName].scrollTop = origin;
        });
      }
    },
    async clickItem(colName, index) {
      if (this.config.clickLock) return;
      this.config.clickLock = true;
      // imitation scroll
      this.$refs[colName].scrollTop = this.config.buffer * 40;
      let origin = this.$refs[colName].scrollTop;
      this.$refs[colName].scrollTop += index - 5; // init important
      let count = Math.abs(index - 5);
      let timeout = setInterval(() => {
        if (this.$refs[colName].scrollTop == origin) {
          --count;
          if (!count) {
            clearInterval(timeout);
            this.config.clickLock = false;
            return;
          }
        }
        this.config.scrollLock = true;
        this.$refs[colName].scrollTop += (index - 5) * 3;
      }, 20);
    },
  }
};
</script>
