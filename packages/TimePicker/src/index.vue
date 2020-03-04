<template>
  <div :class="['fv-'+$theme+'-timePicker',{disabled:disabled}]">
    <div class="fv-TimePicker__input" @click="focus()">
      <button class="fv-TimePicker__input-item">{{showTime(0,value.getHours())}}</button>
      <button
        class="fv-TimePicker__input-item"
        :style="{borderColor:innerBorderColor}"
      >{{showTime(1,value.getMinutes())}}</button>
      <button
        :style="{borderColor:innerBorderColor}"
        class="fv-TimePicker__input-item"
        v-if="timeType==12"
      >{{showTime(2,Math.floor(value.getHours()/11.9))}}</button>
    </div>
    <div v-show="show" class="fv-TimePicker__options">
      <div class="fv-TimePicker__options-body">
        <div class="fv-TimePicker__options-body-mask"></div>
        <div
          v-for="(col,index1) in data"
          :key="`options-col${index1}`"
          class="fv-TimePicker__options-body-col"
        >
          <div class="fv-TimePicker__options-body-col-up" @click="clickItem(`col${index1}`,4)">
            <i class="ms-Icon ms-Icon--ChevronUp"></i>
          </div>
          <div class="fv-TimePicker__options-body-items" :ref="`col${index1}`">
            <div
              class="fv-TimePicker__options-body-item"
              v-for="(item,index) in col"
              :key="`options-col-item${index1}-${item}-${index}`"
              @click="clickItem(`col${index1}`,index)"
            >{{showTime(index1,item)}}</div>
          </div>
          <div class="fv-TimePicker__options-body-col-down" @click="clickItem(`col${index1}`,6)">
            <i class="ms-Icon ms-Icon--ChevronDown"></i>
          </div>
        </div>
      </div>
      <div class="fv-TimePicker__options-bar">
        <button class="fv-TimePicker__options-bar-accept" @click="accept">
          <i class="ms-Icon ms-Icon--Accept"></i>
        </button>
        <button class="fv-TimePicker__options-bar-cancel" @click="cancel">
          <i class="ms-Icon ms-Icon--Cancel"></i>
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
      default: () => new Date()
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
      selected: {
        date: this.value
      },
      options: {}
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
        this.selected.date = this.value;
        this.init();
      }
    }
  },
  mounted() {
    this.init();
    this.loadEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    focus() {
      if (this.disabled) return;
      this.show = true;
    },
    accept() {
      this.$emit("input", this.selected.date);
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    init() {
      this.data = [[], []];
      if (this.timeType == "12") {
        this.data.push([]);
      }
      this.size = [this.timeType == 12 ? 12 : 24, 60, 2];
      for (let i = 0; i < this.data.length; ++i) {
        let col = this.data[i];
        this.setOptions(col, this.size[i], i);
      }
    },
    nPrev(num, size, next = 1, offset = 1) {
      num = Math.round(num);
      let offsetSize = next * size;
      return ((num + offsetSize - offset - next) % size) + offset;
    },
    nNext(num, size, next = 1, offset = 1) {
      num = Math.round(num);
      let offsetSize = offset * size;
      return ((num + offsetSize + next - offset) % size) + offset;
    },
    loadEvent() {
      for (let key in this.window.event) {
        let event = this.window.event[key];
        window.addEventListener(key, event);
      }
    },
    setOptions(data, size, index) {
      let count = this.config.optionCount + this.config.buffer * 2;
      let num;
      let date = this.selected.date;
      switch (index) {
        case 0:
          num = this.nPrev(date.getHours(), size, Math.floor(count / 2), 0);
          break;
        case 1:
          num = this.nPrev(
            date.getMinutes(),
            size,
            Math.floor(count / 2),
            0,
            0
          );
          break;
        case 2:
          num = this.nPrev(
            Math.floor(date.getHours() / 11.9),
            size,
            Math.floor(count / 2),
            0
          );
          break;
      }
      for (let i = 0; i < count; ++i) {
        if (index == 2) {
          if (i != 5 && i - num != 5 && i - num != 4) {
            data.push(num - 3);
          } else {
            data.push(num);
          }
        } else {
          data.push(num);
        }
        num = this.nNext(num, size, 1, index == 0 ? 1 : 0);
      }
      this.$nextTick(() => {
        this.loadSlide(size, index);
      });
    },
    loadSlide(size, index) {
      let refName = `col${index}`;
      let origin = (this.$refs[refName][0].scrollTop = 40 * this.config.buffer);
      this.options[refName] = {};
      if (this.options[refName].scroll) {
        this.$refs[refName][0].removeEventListener(
          "scroll",
          this.options[refName].scroll
        );
      }
      this.options[refName].scroll = () => {
        if (this.options[refName].slideLock) return;
        if (index == 2) {
          if (this.$refs[refName][0].scrollTop > origin) {
            if (this.selected.date.getHours() > 11) {
              this.$refs[refName][0].scrollTop = origin;
              return;
            }
          } else {
            if (this.selected.date.getHours() <= 11) {
              this.$refs[refName][0].scrollTop = origin;
              return;
            }
          }
        }
        this.slideCol(
          origin,
          refName,
          () => {
            this.data[index].shift();
            let num;
            let temp;
            switch (index) {
              case 0:
                temp =
                  this.timeType == 12
                    ? this.selected.date.getHours() >= 12
                      ? 12
                      : 0
                    : 1;
                num = this.nNext(this.selected.date.getHours(), size, 0);
                this.selected.date.setHours(this.nNext(num, size, 1, temp));
                break;
              case 1:
                num = this.nNext(this.selected.date.getMinutes(), size, 0, 0);
                this.selected.date.setMinutes(this.nNext(num, size, 1, 0));
                break;
              case 2:
                num = Math.floor(this.selected.date.getHours() / 11.9);
                if (num == 0)
                  this.selected.date.setHours(
                    this.selected.date.getHours() + 12
                  );
                break;
            }
            let next = this.nNext(
              num,
              size,
              (this.config.optionCount - 1) / 2 + this.config.buffer + 1,
              0
            );
            if (index == 2) {
              next = -1;
            }
            this.data[index].push(next);
          },
          () => {
            this.data[index].pop();
            let num, temp;
            switch (index) {
              case 0:
                temp =
                  this.timeType == 12
                    ? this.selected.date.getHours() >= 12
                      ? 12
                      : 0
                    : 1;
                num = this.nNext(this.selected.date.getHours(), size, 0);
                this.selected.date.setHours(this.nPrev(num, size, 1, temp));
                break;
              case 1:
                num = this.nNext(this.selected.date.getMinutes(), size, 0, 0);
                this.selected.date.setMinutes(this.nPrev(num, size, 1, 0));
                break;
              case 2:
                num = Math.floor(this.selected.date.getHours() / 12);
                if (num == 1)
                  this.selected.date.setHours(
                    this.selected.date.getHours() - 12
                  );
                break;
            }
            let next = this.nPrev(
              num,
              size,
              (this.config.optionCount - 1) / 2 + this.config.buffer + 1,
              0
            );
            if (index == 2) {
              next = -1;
            }
            this.data[index].unshift(next);
          }
        );
      };
      this.$refs[refName][0].addEventListener(
        "scroll",
        this.options[refName].scroll
      );
    },
    removeEvent() {
      for (let key in this.window.event) {
        let event = this.window.event[key];
        window.removeEventListener(key, event);
      }
      for (let key in this.options) {
        this.$refs[key][0].removeEventListener(
          "scroll",
          this.options[key].scroll
        );
      }
    },
    slideCol(origin, refName, nxtCallback, preCallback) {
      if (Math.abs(this.$refs[refName][0].scrollTop - origin) >= 20) {
        if (this.$refs[refName][0].scrollTop > origin) {
          nxtCallback();
        } else {
          preCallback();
        }
        this.$nextTick(() => {
          this.$refs[refName][0].scrollTop = origin;
        });
      }
    },
    async clickItem(colName, index) {
      if (this.config.clickLock) return;
      this.config.clickLock = true;
      // imitation scroll
      this.$refs[colName][0].scrollTop = this.config.buffer * 40;
      let origin = this.$refs[colName][0].scrollTop;
      this.$refs[colName][0].scrollTop += index - 5; // init important
      let count = Math.abs(index - 5);
      let timeout = setInterval(() => {
        if (this.$refs[colName][0].scrollTop == origin) {
          --count;
          if (!count) {
            clearInterval(timeout);
            this.config.clickLock = false;
            return;
          }
        }
        this.config.scrollLock = true;
        this.$refs[colName][0].scrollTop += (index - 5) * 3;
      }, 20);
    },
    numberFixTwo(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    showTime(col, item) {
      if (col == 0) {
        return this.nNext(
          item,
          this.timeType == 12 ? 12 : 24,
          0,
          this.timeType == 12 ? 1 : 0
        );
      } else if (col == 1) {
        return this.numberFixTwo(this.nNext(item, 60, 0, 0));
      } else {
        return item >= 0 ? this.period[item] : "";
      }
    }
  }
};
</script>
