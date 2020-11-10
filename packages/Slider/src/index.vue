<template>
    <div
        :class="['fv-'+$theme+'-slider',{active:isActive},{vertical:vertical}]"
        ref="slider"
    >
        <div
            class="fv-slider__bar"
            @mousedown="click($event) && moveable($event)"
            @touchstart="click($event.targetTouches[0]) && moveable($event.targetTouches[0])"
            :class="[{vertical:vertical},{disabled:disabled}]"
            :style="style.bar"
            ref="bar"
        >
            <template v-if="scale">
                <div
                    class="fv-slider__scale-up"
                    v-for="index in (maxinum-mininum)/scaleUnit()-1"
                    :key="'scale:'+index"
                    :style="scaleStyle(index,true)"
                ></div>
                <div
                    class="fv-slider__scale-down"
                    v-for="index in (maxinum-mininum)/scaleUnit()-1"
                    :key="'scale-d:'+index"
                    :style="scaleStyle(index,false)"
                ></div>
            </template>
            <div class="fv-slider__bar-bg"></div>
            <div
                class="fv-slider__progress"
                ref="progress"
                :style="progressStyle"
                :class="[{anime:rejust}]"
            ></div>
            <div
                class="fv-slider__button ms-Icon"
                :class="[`ms-Icon--${icon}`,{disabled:disabled},{anime:rejust}]"
                :style="buttonStyle"
                ref="button"
                @mousedown="moveable"
            ></div>
        </div>
        <div
            class="fv-slider__label"
            :class="{vertical:vertical}"
            v-if="showLabel"
        >
            <slot :value="getValue(progress,mininum,maxinum)"></slot>
        </div>
    </div>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
export default {
    name: "FvSlider",
    data() {
        return {
            progress: 0, //percent
            isActive: false,
            rejust: false,
            style: {
                bar: {},
            },
        };
    },
    props: {
        theme: {
            type: String,
            default: "system",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Number,
            default: 0,
        },
        unit: {
            type: Number,
            default: 1,
        },
        maxinum: {
            type: Number,
            default: 100,
        },
        mininum: {
            type: Number,
            default: 0,
        },
        icon: {
            type: String,
            default: "LocationFill",
            // default:"StatusCircleOuter"
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        showLabel: {
            type: Boolean,
            default: false,
        },
        scale: {
            type: [Boolean, Number],
            default: false,
        },
        color: {
            type: String,
        },
    },
    computed: {
        $theme() {
            if (this.theme === "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        buttonStyle() {
            let color = this.color;
            if (this.vertical) {
                return {
                    top: this.progress + "%",
                    transform: "translate(-50%,-50%) rotate(90deg)",
                    left: "2px",
                    color,
                };
            } else {
                return {
                    left: this.progress + "%",
                    transform: "translate(-50%,-50%)",
                    top: "2px",
                    color,
                };
            }
        },
        progressStyle() {
            let color = this.color;
            if (this.vertical) {
                return {
                    height: this.progress + "%",
                    backgroundColor: color,
                };
            } else {
                return {
                    width: this.progress + "%",
                    backgroundColor: color,
                };
            }
        },
    },
    watch: {
        value(val) {
            // sync progress
            if (!this.isActive)
                this.setProgress(val, this.mininum, this.maxinum);
        },
        progress(val) {
            this.$emit(
                "change",
                this.getValue(val, this.mininum, this.maxinum)
            );
            // sync Value
            if (this.isActive) {
                this.setValue(val, this.mininum, this.maxinum);
            }
        },
    },
    mounted() {
        // set client height/width
        this.resize();
    },
    methods: {
        click(evt) {
            if (this.isActive || this.disabled) return false;
            let box = this.$refs.bar.getBoundingClientRect();
            let button = this.$refs.button.getBoundingClientRect();
            let x = this.vertical
                ? evt.clientY - box.top
                : evt.clientX - box.left;
            let origin = this.vertical
                ? button.top - box.top
                : button.left - box.left;
            this.move(x, origin);
            return true;
        },
        scaleUnit() {
            let unit =
                !this.scale || this.scale == true ? this.unit : this.scale;
            return unit;
        },
        scaleStyle(index, up) {
            let unit = Math.round(
                (this.scaleUnit() / (this.maxinum - this.mininum)) * 100
            );
            return this.vertical
                ? {
                      left: up ? "7px" : "-7px",
                      top: index * unit + "%",
                      height: "1px",
                      width: "5px",
                  }
                : {
                      top: up ? "7px" : "-7px",
                      left: index * unit + "%",
                      height: "5px",
                      width: "1px",
                  };
        },
        resize() {
            this.setProgress(this.value, this.mininum, this.maxinum);
        },
        moveable(evt) {
            this.$refs.button.ondragenter = event.preventDefault();
            this.$refs.button.ondragover = event.preventDefault();
            if (this.isActive || this.disabled) return;
            this.$emit("click");
            this.isActive = true;
            let origin = this.vertical ? evt.clientY : evt.clientX;
            let move = (evt) => {
                if(evt.type === 'touchmove') {
                    evt.preventDefault();
                    evt = evt.targetTouches[0];
                }
                let x = this.vertical ? evt.clientY : evt.clientX;
                this.move(x, origin);
                origin = x;
            };
            let removeMove = () => {
                this.isActive = false;
                this.rejustProgress();
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", removeMove);
                window.removeEventListener("mouseleave", removeMove);
                window.removeEventListener("touchmove", move);
                window.removeEventListener("touchend", removeMove);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseleave", removeMove);
            window.addEventListener("mouseup", removeMove);
            window.addEventListener("touchmove", move);
            window.addEventListener("touchend", removeMove);
        },
        setProgress(value, min, max) {
            this.progress = ((value - min) / (max - min)) * 100;
            this.progress = Math.max(0, this.progress);
            this.progress = Math.min(100, this.progress);
        },
        setValue(value, min, max) {
            this.$emit("input", this.getValue(value, min, max));
        },
        getValue(value, min, max) {
            return Math.round((value * (max - min)) / 100) + min;
        },
        rejustProgress() {
            if (this.rejust) return;
            this.rejust = true;
            this.isActive = true;
            let value = this.getValue(
                this.progress,
                this.mininum,
                this.maxinum
            );
            if (value < this.maxinum)
                value =
                    Math.round((value - this.mininum) / this.unit) * this.unit +
                    this.mininum;
            else value = this.maxinum;
            this.setProgress(value, this.mininum, this.maxinum);
            setTimeout(() => {
                this.rejust = false;
                this.isActive = false;
            }, 300);
        },
        move(x, origin) {
            let length = this.vertical
                ? this.$refs.bar.clientHeight
                : this.$refs.bar.clientWidth;
            let val = this.progress + ((x - origin) * 100) / length;
            val = Math.max(val, 0);
            val = Math.min(val, 100);
            this.progress = val;
        },
    },
};
</script>
