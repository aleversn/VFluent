<template>
	<div :class="'fv-'+$theme+'-button'" @click="onClick">
		<div class="fv-button-reveal-border" :class="[{disabled: isDisabled}, { shadow: isBoxShadow }]" :style="styles.revealBorder">
            <div class="fv-button-reveal-container"></div>
			<button
				:disabled="disabled"
				class="button-container"
				:style="styles.buttonContainer"
			>
				<span class="content-block" :style="styles.contentBlock">
					<i
						class="ms-Icon"
						:class="`ms-Icon--${icon}`"
						:style="{'margin-right': icon != '' ? '5px': ''}"
					></i>
					<slot>Button</slot>
				</span>
			</button>
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
			default: ""
        },
        fontSize: {
			default: "",
			type: String
		},
		fontWeight: {
			default: "normal",
			type: String
        },
        isBoxShadow: {
            default: false
        },
		disabled: {
			default: false,
			type: Boolean
		},
		borderWidth: {
			default: 2,
			type: Number
		}
	},
	data() {
		return {
			styles: {
				revealBorder: {
					padding: "2px",
					borderRadius: ""
				},
				buttonContainer: {
					background: "",
					borderRadius: ""
				},
				contentBlock: {
                    color: "",
                    fontSize: "",
					fontWeight: "normal"
				}
			}
		};
	},
	watch: {
		theme(val) {
			this.FRInit();
		},
		borderWidth(val) {
			this.stylesInit();
		},
		foreground(val) {
			this.stylesInit();
		},
		background(val) {
			this.stylesInit();
		},
		borderRadius(val) {
			this.stylesInit();
        },
        fontSize(val) {
			this.stylesInit();
		},
		fontWeight(val) {
			this.stylesInit();
		}
	},
	computed: {
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		},
		borderLightColor() {
			if (this.$theme == "light") {
				return "rgba(121, 119, 117, 0.6)";
			}
			if (this.$theme == "dark" || this.$theme == "custom") {
				return "rgba(255, 255, 255, 0.6)";
			}
		},
		backgroundLightColor() {
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
		this.FRInit();
		this.stylesInit();
	},
	methods: {
		FRInit() {
            let FR = new this.$RevealEffectsMasked("body", {
                selector: this.$el.querySelectorAll('.fv-button-reveal-border')[0],
                borderGradientSize: 80,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor,
                childrenSelector: this.$el.querySelectorAll('.fv-button-reveal-container')[0]
            });
		},
		stylesInit() {
			this.styles.revealBorder.padding = `${this.borderWidth}px`;
			this.styles.revealBorder.borderRadius = `${this.borderRadius}px`;
			this.styles.contentBlock.color = this.foreground;
			this.styles.buttonContainer.background = this.background;
            this.styles.buttonContainer.borderRadius = `${this.borderRadius}px`;
            this.styles.contentBlock.fontSize = `${this.fontSize}px`;
			this.styles.contentBlock.fontWeight = this.fontWeight;
		},
		onClick(event) {
			this.$emit("click", event);
		}
	}
};
</script>
