<template>
<div class="spliter" @mousedown="forward" @mouseup="stop">
    <i></i>
</div>
</template>

<script>
export default {
	props: {
		theme: {
			type: String,
			default: "system"
		}
    },
    data () {
		return {
            moveavle: false
        };
	},
	computed: {
		$theme () {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		}
    },
    mounted () {
        this.Init();
    },
    methods: {
        Init () {
            window.addEventListener("mousemove", (event => {
                if (this.moveable) {
                    this.$emit("mousemove", event);
                }
            }));
            window.addEventListener("mouseup", (event => {
                if (this.moveable) {
                    this.stop();
                }
            }));
        },
        forward(event) {
            this.moveable = true;
            this.$emit("mousedown", event);
        },
        stop (event) {
            this.moveable = false;
            this.$emit("mouseup", event);
        }
    }
};
</script>
