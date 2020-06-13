<template>
	<div
		:class="['fv-'+$theme+'-Combobox', {disabled: isDisabled}]"
		ref="co_head"
		:style="{background: background, padding: borderWidth, 'border-radius': `${borderRadius}px`, 'z-index': status ? 3 : ''}"
	>
        <div class="combobox-container" @click="status = !isDisabled ? !status : false">
            <input :placeholder="placeholder" readonly :value="thisValue.text" :style="{color: inputForeground}"/>
		    <i class="ms-Icon right-icon" :class="[`ms-Icon--${dropDownIcon}`]" :style="{color: dropDownIconForeground}"></i>
        </div>
		<transition name="fv-combobox">
            <div v-show="status" class="combobox-item-container" :style="{background: background}" ref="co_items">
                <option
                    v-for="(item, index) in options"
                    class="combobox-item"
                    :class="{hr:item.type == 'divider', normal: (item.type == 'default' || item.type == undefined) && !item.disabled, disabled: item.disabled, choose: item === thisValue, title: item.type == 'header'}"
                    :style="{background: item === thisValue ? choosenBackground : '', color: item.type === 'header' ? titleForeground : ''}"
                    @click="Choose($event, item)"
                    :key="index"
                    :title="item.text"
                >{{item.type !== 'divider' ? item.text : ''}}</option>
            </div>
        </transition>
	</div>
</template>

<script>
import { FluentRevealEffect } from "fluent-reveal-effect";

export default {
	name: "FvCombobox",
	props: {
		value: {
			default: () => {
				return {};
			}
		},
		options: {
			default: () => []
		},
		borderWidth: {
			default: 2
		},
		placeholder: {
			default: "Combobox"
		},
		borderRadius: {
			default: "3"
        },
        background: {
            default: ""
        },
        choosenBackground: {
            default: ""
        },
		inputForeground: {
			default: ""
        },
        titleForeground: {
            default: ""
        },
		dropDownIcon: {
			default: "ChevronDown"
		},
		dropDownIconForeground: {
			default: ""
        },
        disabled: {
            default: false
        },
		theme: {
			type: String,
			default: "system"
		}
	},
	data() {
		return {
			thisValue: this.value,
			status: false
		};
	},
	watch: {
		value(val) {
			this.thisValue = val;
		},
		thisValue(val) {
			this.$emit("input", val);
		}
	},
	computed: {
        isDisabled () {
            return (
                this.options.length == 0 ||
                this.disabled.toString() == "true" ||
                this.disabled == "disabled" ||
                this.disabled === ""
            );
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
        },
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		}
	},
	mounted () {
        this.FRInit();
		this.outSideClickInit();
	},
	methods: {
        FRInit () {
            FluentRevealEffect.applyEffect('body', {
                clickEffect: true,
                lightColor: this.borderLightColor,
                gradientSize: 80,
                isContainer: true,
                children: {
                    borderSelector: `.fv-${this.$theme}-Combobox`,
                    elementSelector: `.fv-${this.$theme}-Combobox .combobox-container`,
                    lightColor: this.backgroundLightColor,
                    gradientSize: 120
                }
            });

            let FR = new this.$RevealEffects(this.$el, {
                selector: `.fv-${this.$theme}-Combobox .combobox-item-container option.normal`,
                borderGradientSize: 30,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
		outSideClickInit() {
			window.addEventListener("click", event => {
				let x = event.target;
				let _self = false;
				while (x.tagName.toLowerCase() != "body") {
					if (x == this.$el) {
						_self = true;
						break;
					}
					x = x.parentNode;
				}
				if (!_self) this.status = false;
			});
		},
		Choose (event, item) {
            if(item.disabled)
                return 0;
            if(item.type == 'header' || item.type == 'divider')
                return 0;
			this.thisValue = item;
            let target = event.target;
            while(target.getAttribute("class").indexOf("combobox-item") < 0) {
                target = target.parentNode;
            }
            this.$refs.co_items.scrollTop = target.offsetTop;
            this.status = false;
			this.$emit("choose-item", this.thisValue);
		}
	}
};
</script>
