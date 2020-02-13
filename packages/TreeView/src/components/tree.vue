<template>
  <li class="fv-TreeView__item">
    <div class="fv-TreeView__label-border" :class="[{revealEffect:revealEffect}]">
      <div
        ref="label"
        class="fv-TreeView__label"
        :class="[{revealEffect:revealEffect}]"
        @click="!checkable && click($event)"
        @mousedown="clickItem(item)"
        :style="style.label"
      >
        <checkbox
          v-if="checkable"
          :status="item.checkboxStatus"
          @click="checkable && click($event)"
        />
        <i
          ref="expanded"
          v-if="item.children"
          class="ms-Icon"
          :class="['ms-Icon--'+(item.expanded?'ChevronDown':'ChevronRight')+'Med']"
          @click="item.expanded^=true"
        />
        <i v-else style="width:12px" />
        <template v-if="item.icon">
          <i
            v-if="/^ms\-Icon/.test(item.icon)"
            class="ms-Icon fv-TreeView__icon"
            :class="[item.icon]"
          />
          <img v-else :src="item.icon" class="fv-TreeView__icon" />
        </template>
        <span class="fv-TreeView__text">{{item.label}}</span>
      </div>
    </div>
    <tree-content
      ref="content"
      v-if="item.children"
      v-show="item.expanded"
      :items="item.children"
      :deepth="deepth"
      :viewStyle="viewStyle"
      :checkable="checkable"
      :padding="padding"
      @click="clickItem"
    ></tree-content>
  </li>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import { FluentRevealEffect } from "fluent-reveal-effect";
import one from "onecolor";

export default {
  name: "FvTreeViewItem",
  components: {
    TreeContent: () => import("./content.vue"),
    checkbox: () => import("./checkbox.vue")
  },
  props: {
    item: {
      default: () => {
        return {};
      }
    },
    theme: {
      default: "system",
      type: String
    },
    padding: {
      type: Number,
      default: 20
    },
    deepth: {
      default: 1
    },
    revealEffect: {
      type: Boolean,
      default: true
    },
    viewStyle: {},
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      event: {
        label: {
          mouseover: () => {
            this.$set(
              this.style.label,
              "backgroundColor",
              this.hoverColor(
                this.viewStyle.backgroundColor || "#fff",
                0.9,
                0.3
              ).cssa()
            );
          },
          mouseout: () => {
            if (!this.item.selected) {
              this.$set(
                this.style.label,
                "backgroundColor",
                this.viewStyle.backgroundColor || "#fff"
              );
            } else {
              this.$set(
                this.style.label,
                "backgroundColor",
                this.hoverColor(
                  this.viewStyle.backgroundColor || "#fff",
                  0.8,
                  0.2
                ).cssa()
              );
            }
          }
        }
      },
      style: {
        label: {
          paddingLeft: this.deepth * this.padding + "px"
        }
      }
    };
  },
  watch: {
    "item.selected"(val) {
      this.item.checkboxStatus = this.getStatus();
      this.setLabelBackgroundColor(val)
    },
    viewStyle: {
      handler: function() {
        this.setLabelBackgroundColor(this.item.selected)
        this.initFR()
      },
      deepth: true
    }
  },
  beforeCreate() {
    if (this.$parent.$options.name === "FvTreeViewContent") {
      this.parent = this.$parent.$parent;
    }
  },
  mounted() {
    if (!this.item.selected) {
      this.$set(this.item, "selected", false);
    }
    if (!this.item.expanded) {
      this.$set(this.item, "expanded", false);
    }
    this.$set(this.item, "checkboxStatus", this.getStatus());
    this.initEvent();
    this.$nextTick(() => {
      this.initFR();
      this.initStyle();
    });
  },
  methods: {
    initFR() {
      FluentRevealEffect.applyEffect(
        ".fv-TreeView__label-border.revealEffect",
        {
          lightColor: this.hoverColor(
            this.viewStyle.backgroundColor || "#000",
            0.3,
            1
          )
            .alpha(0.6)
            .cssa(),
          gradientSize: 120
        }
      );
    },
    initStyle() {
      this.$set(
        this.style.label,
        "backgroundColor",
        this.viewStyle.backgroundColor || "#fff"
      );
    },
    initEvent() {
      for (let key in this.event) {
        let events = this.event[key];
        for (let event in events) {
          this.$refs[key].addEventListener(event, events[event]);
        }
      }
    },
    DestroyEvent() {
      for (let key in this.event) {
        let events = this.event[key];
        for (let event in events) {
          this.$refs[key].removeEventListener(event, events[event]);
        }
      }
    },
    hoverColor(color, dark, light) {
      let onecolor = one(color);
      if (onecolor.isLight()) {
        return onecolor.lightness(dark);
      } else {
        return onecolor.lightness(+(light ? light : dark));
      }
    },
    click(evt) {
      if (evt.target === this.$refs.expanded) return;
      this.select(this.item.selected ^ true);
    },
    getStatus() {
      let selectCount = 0;
      if (!this.item.children) {
        if (this.item.selected) {
          return "checked";
        } else {
          return null;
        }
      }
      let children = this.item.children;
      for (let index in children) {
        let item = children[index];
        if (item.selected) {
          selectCount++;
        }
        if (item.checkboxStatus === "Indeterminate") {
          return "Indeterminate";
        }
      }
      if (children && selectCount === children.length) {
        return "checked";
      } else if (selectCount > 0) {
        return "Indeterminate";
      } else {
        return null;
      }
    },
    selectAll(item, status) {
      for (let index in item.children) {
        let child = item.children[index];
        this.selectAll(child, status);
      }
      item.selected = status;
    },
    updateSelect() {
      this.item.checkboxStatus = this.getStatus();
      if (this.item.checkboxStatus === "checked") {
        this.item.selected = true;
      } else {
        this.item.selected = false;
      }
      if (this.parent) {
        this.parent.updateSelect();
      }
    },
    select(status) {
      if (!this.checkable) {
        this.item.selected ^= true;
        return;
      }
      this.selectAll(this.item, status);
      this.updateSelect();
    },
    setLabelBackgroundColor(val) {
      if (val) {
        this.$set(
          this.style.label,
          "backgroundColor",
          this.hoverColor(
            this.viewStyle.backgroundColor || "#fff",
            0.8,
            0.2
          ).cssa()
        );
      } else {
        this.$set(
          this.style.label,
          "backgroundColor",
          this.viewStyle.backgroundColor || "#fff"
        );
      }
    },
    clickItem(item){
      this.$emit('click',item)
    }
  },
  beforeDestroy() {
    this.DestroyEvent();
  }
};
</script>