<template>
	<div v-show="thisValue" :class="['fv-'+$theme+'-WebWindow', {'static-transition' : !freezeTransition, dark : theme == 'dark'}]" :style="{left: currentLeft, top: currentTop}" ref="block">
		<div draggable="false" class="title-bar" @mousedown="forward" @mouseup="stop" @touchstart="forward" @touchend="stop">
			<p style="margin-left: 10px; user-select: none;">{{title}}</p>
			<button class="control-btn shut-down" @mousedown="stopPropagation" @click="close">
				<i class="ms-Icon ms-Icon--Cancel"></i>
			</button>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	name: "FvWebWindow",
	props: {
        value: {
            default: true
        },
        title: {
            type: String,
            default: 'WebWindow'
        },
		theme: {
			type: String,
			default: "system"
		}
	},
	data() {
		return {
            thisValue: this.value,
            moveable: false,
            freezeTransition: true,
            disX: 0,
            disY: 0,
            currentLeft: "0px",
            currentTop: "0px",
            xWidth: 0,
            xHeight: 0,
            timer: null
        };
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
        }
    },
	computed: {
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		}
    },
    mounted () {
        this.Init();
        this.posInit();
    },
    methods: {
        Init() {
            window.addEventListener ("mousemove", (event => {
                if (this.moveable) {
                    this.currentLeft = `${event.clientX - this.disX}px`;
                    this.currentTop = `${event.clientY - this.disY}px`;
                }
            }));
            window.addEventListener ("touchmove", (event => {
                event = event.targetTouches[0];
                if (this.moveable) {
                    this.currentLeft = `${event.clientX - this.disX}px`;
                    this.currentTop = `${event.clientY - this.disY}px`;
                }
            }));
            window.addEventListener ("mouseup", (event => {
                if (this.moveable) {
                    this.stop();
                }
            }));
            window.addEventListener ("touchup", (event => {
                if (this.moveable) {
                    this.stop();
                }
            }));
            this.timer = setInterval(() => {
                if(this.xWidth != this.$el.clientWidth)
                {
                    this.posInit();
                    this.xWidth = this.$el.clientWidth;
                    this.xHeight = this.$el.clientHeight;
                    return 0;
                }
                if(this.xHeight != this.$el.clientHeight)
                {
                    this.posInit();
                    this.xWidth = this.$el.clientWidth;
                    this.xHeight = this.$el.clientHeight;
                    return 0;
                }
            }, 30);
        },
        posInit () {
            let el = this;
            let width = this.$el.clientWidth;
            let height = this.$el.clientHeight;
            this.currentLeft = `${window.innerWidth / 2 - width / 2}px`;
            this.currentTop = `${window.innerHeight / 2 - height / 2}px`;
        },
        forward (event) {
            this.moveable = true;
            this.freezeTransition = true;
            event.preventDefault();
            let {clientX, clientY} = event.targetTouches ? event.targetTouches[0] : event;
            this.disX = clientX - this.$el.getBoundingClientRect().left;
            this.disY = clientY - this.$el.getBoundingClientRect().top;
        },
        stop () {
            this.moveable = false;
            this.freezeTransition = false;
            if (this.$el.getBoundingClientRect().left < 0)
                this.currentLeft = `0px`;
            if (this.$el.getBoundingClientRect().top < 0)
                this.currentTop = `0px`;
            if (this.$el.getBoundingClientRect().left + this.$el.clientWidth > window.innerWidth)
                this.currentLeft = `${window.innerWidth - this.$el.clientWidth}px`;
            if (this.$el.getBoundingClientRect().top + this.$el.clientHeight > window.innerHeight)
                this.currentTop = `${window.innerHeight - this.$el.clientHeight}px`;
            setTimeout(() => {
                this.freezeTransition = true;
            }, 300);
        },
        stopPropagation (event) {
            event.stopPropagation();
        },
        close () {
            this.$emit('close');
            this.thisValue = false;
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
};
</script>
