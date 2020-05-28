<template>
  <div
    :class="['fv-'+$theme+'-menuFlyout',{actived:callout.show},{disabled:disabled}]"
    :style="flyout"
  >
    <fv-callout
      :visible.sync="callout.show"
      :beak="beak"
      :focusTrap="callout.focusTrap"
      :popperStyle="{
				padding:'0px',
				minWidth:'300px',
				backgroundColor:backgroundColor,
				color:color,
				borderRadius:borderRadius,
				overflow:overflow,
				'box-shadow':'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
				}"
      :position="position"
      :popperClass="'fv-'+$theme+'-menuFlyoutPopper'"
      :theme="$theme"
      :disabled="disabled"
    >
      <button class="fv-menuFlyout__button" :style="{borderColor:borderColor}">
        <span>{{label?label:"Click the Menu"}}</span>
        <i class="ms-Icon ms-Icon--ChevronDown right-icon"></i>
      </button>
      <main>
        <slot></slot>
      </main>
    </fv-callout>
  </div>
</template>

<script>
import { FluentRevealEffect } from "fluent-reveal-effect";

export default {
  name: "FvMenuFlyout",
  props: {
    theme: {
      type: String,
      default: "system"
    },
    label: {
      type: String
    },
    position: {
      type: String,
      default: "bottomLeft"
    },
    beak: {
      type: Number,
      default: 0
    },
    checkable: {
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {},
    color: {},
    borderColor: {},
    borderRadius: {}
  },
  data() {
    return {
      callout: {
        show: false,
        focusTrap: false
			},
			overflow:this.borderRadius?'hidden':undefined
    };
  },
  mounted() {
    this.FRInit();
  },
  computed: {
    $theme() {
      if (this.theme == "system") return this.$fvGlobal.state.theme;
      return this.theme;
    },
    flyout() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.color
      };
    },
    borderLightColor() {
      if (this.$theme == "light") {
        return "rgba(121, 119, 117, 0.6)";
      }
      if (this.$theme == "dark" || this.$theme == "custom") {
        return "rgba(255, 255, 255, 0.6)";
      }
      return "rgba(121, 119, 117, 0.6)";
    },
    backgroundLightColor() {
      if (this.$theme == "light") {
        return "rgba(121, 119, 117, 0.3)";
      }
      if (this.$theme == "dark" || this.$theme == "custom") {
        return "rgba(255, 255, 255, 0.3)";
      }
      return "rgba(121, 119, 117, 0.3)";
    }
  },
  methods: {
    FRInit() {
      FluentRevealEffect.applyEffect("body", {
        clickEffect: true,
        lightColor: this.borderLightColor,
        gradientSize: 80,
        isContainer: true,
        children: {
          borderSelector: `.fv-${this.$theme}-menuFlyout`,
          elementSelector: `.fv-${this.$theme}-menuFlyout .fv-menuFlyout__button`,
          lightColor: this.backgroundLightColor,
          gradientSize: 120
        }
      });
    },
    show() {
      this.callout.focusTrap = true;
      setTimeout(() => {
        this.callout.focusTrap = false;
      }, 100);
    }
  }
};
</script>
