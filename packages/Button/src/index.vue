<template>
	<div :class="'fv-'+$theme+'-button'" @click="onClick">
		<div class="fv-button-main-container" :class="[{disabled: isDisabled}, { shadow: isBoxShadow }]" :style="{borderRadius: `${borderRadius}px`}">
            <fv-reveal-container
                :parent="() => $el"
                class="fv-button-reveal-container"
                :backgroundColor="backgroundLightColor"
                :borderColor="borderLightColor"
                :borderGradientSize="80"
                :borderWidth="borderWidth"
                :borderRadius="borderRadius"
                :disabled="isDisabled"
            ></fv-reveal-container>
			<div
				:disabled="disabled"
				class="fv-button-container"
				:style="{background: background, 'background-repeat': 'no-repeat', 'background-clip': 'content-box', borderColor: borderColor, borderWidth: `${borderWidth}px`, borderRadius: `${borderRadius}px`}"
			>
				<span class="content-block" :style="{color: foreground, 'font-size': `${fontSize}px`, 'font-weight': fontWeight}">
					<i
						class="ms-Icon"
						:class="`ms-Icon--${icon}`"
						:style="{'margin-right': icon != '' ? '5px': ''}"
					></i>
					<slot>Button</slot>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FvButton",
	props: {
		icon: {
			default: "",
			type: String
		},
		theme: {
			default: "system",
			type: String
		},
		foreground: {
			default: "",
			type: String
		},
		background: {
			default: "",
			type: String
		},
		borderRadius: {
			default: 3
        },
        borderColor: {
            default: ""
        },
        fontSize: {
			default: 13.3,
			type: String
		},
		fontWeight: {
			default: "normal",
			type: String
        },
        revealBorderColor: {
            default: false,
        },
        revealBackgroundColor: {
            default: false,
        },
        isBoxShadow: {
            default: false
        },
		disabled: {
			default: false
		},
		borderWidth: {
			default: 1,
		}
	},
	data() {
		return {
            
		};
	},
	watch: {
		
	},
	computed: {
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		},
		borderLightColor() {
            if(this.revealBorderColor) return this.revealBorderColor;
			if (this.$theme == "light") {
                return "rgba(121, 119, 117, 0.6)";
            }
            if (this.$theme == "dark" || this.$theme == "custom") {
                return "rgba(255, 255, 255, 0.6)";
            }
		},
		backgroundLightColor() {
            if(this.revealBackgroundColor) return this.revealBackgroundColor;
			if (this.$theme == "light") {
                return "rgba(121, 119, 117, 0.3)";
            }
            if (this.$theme == "dark" || this.$theme == "custom") {
                return "rgba(255, 255, 255, 0.3)";
            }
		},
		isDisabled() {
			return (
				this.disabled.toString() == "true" ||
				this.disabled == "disabled" ||
				this.disabled === ""
			);
		}
	},
	mounted() {
		
	},
	methods: {
		onClick(event) {
            event.preventDefault();
            if(this.isDisabled)
                return 0;
			this.$emit("click", event);
		}
	},
    beforeDestroy () {

    }
};
</script>
