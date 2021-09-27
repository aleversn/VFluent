<script>
import Popper from "./popper.vue";
export default {
    name: "FvCallout",
    props: {
        visible: {
            default: false,
        },
        theme: {
            type: String,
            default: "system",
        },
        disabled: {
            default: false,
        },
        space: {
            type: Number,
            default: 0,
        },
        beak: {
            type: Number,
            default: 10,
        },
        position: {
            type: String,
            default: "bottomCenter",
        },
        lockScroll: {
            default: false,
        },
        focusTrap: {
            default: false,
        },
        delayClose: {
            type: Number,
            default: 0,
        },
        effect: {
            type: String,
            default: "click",
        },
        popperStyle: {
            default: () => {
                return {};
            },
        },
        popperClass: {
            default: () => {
                return [];
            },
        },
    },
    components: {
        Popper,
    },
    data() {
        return {
            slotName: ["header", "main", "footer"],
            isFirstOpen: false,
            window: {},
            targetEvent: {},
            popperEvent: {},
            timeout: {
                close: null,
                hoverClose: null, // 鼠标移开后延时关闭
            },
            lock: {
                popper: true,
            },
            showFunc(val) {
                this.$emit("update:visible", val);
                if (val) {
                    this.adjustPopperPosition(this.position);
                    if (this.delayClose > 0) {
                        clearTimeout(this.timeout.close);
                        this.timeout.close = setTimeout(() => {
                            this._popper.show = false;
                        }, this.delayClose);
                    }
                }
            },
        };
    },
    watch: {
        visible(val) {
            if (this._popper.show != val) {
                this._popper.show = val;
            }
        },
        $theme(val) {
            this._popper.theme = val;
        },
        position(val) {
            this._popper.position = val;
            this.adjustPopperPosition(val);
        },
        popperStyle(val) {
            this._popper.callout.style = val;
        },
        popperClass(val) {
            this._popper.callout.class = val;
        },
        disabled(val) {
            if (val) this.init();
        },
    },
    computed: {
        $theme() {
            if (this.theme == "system") return this.$fvGlobal.state.theme;
            return this.theme;
        },
        targetElement() {
            return this.$el.firstChild;
        },
    },
    methods: {
        getFirstDefaultSlotElement() {
            let vNode = this.$slots.default;
            if (!Array.isArray(vNode)) return null;
            for (let index in vNode) {
                let node = vNode[index];
                if (node.tag != undefined) {
                    if (this.slotName.indexOf(node.tag) == -1) {
                        return node;
                    }
                }
            }
            return null;
        },
        slot() {
            let vNode = this.$slots.default;
            let header = this.$slots.header || [];
            let main = this.$slots.main || [];
            let footer = this.$slots.footer || [];
            if (!Array.isArray(vNode)) return null;
            for (let index in vNode) {
                let node = vNode[index];
                if (node.tag == "header") {
                    header.push(...node.children);
                } else if (node.tag == "main") {
                    main.push(...node.children);
                } else if (node.tag == "footer") {
                    footer.push(...node.children);
                }
            }
            return {
                header,
                main,
                footer,
            };
        },
        initPopper() {
            if (this.effect != "always") this._popper.show = this.visible;
            this._popper.theme = this.$theme;
            this._popper.$nextTick(() => {
                this.adjustPopperPosition(this.position);
            });
            this._popper.callout.style = this.popperStyle;
            this._popper.callout.class = this.popperClass;
            this._popper.target = this;
        },
        adjustPopperPosition(position, changeVisible = true) {
            if (this.disabled || this.targetElement.clientHeight == 0 || this.targetElement.clientWidth == 0) {
                this._popper.show = false;
                return;
            }
            let times = 0;
            if (changeVisible && this._popper.show) {
                let event = this._popper.$el.addEventListener("transitionend", () => {
                    ++times;
                    if (this.isOutBody(this._popper.$el)) {
                        if (times == 1) {
                            this.setPopperPosition(this.reversePosition(position));
                            return;
                        } else if (times == 2) {
                            this.setPopperPosition("bottomLeft");
                            return;
                        }
                    }
                    this._popper.$el.removeEventListener("transitionend", event);
                });
            }
            this.setPopperPosition(position);
            if (!changeVisible && this._popper.show) {
                for (let times = 1; times < 2; ++times) {
                    if (this.isOutBody(this._popper.$el)) {
                        if (times == 1) {
                            this.setPopperPosition(this.reversePosition(position));
                            return;
                        } else if (times == 2) {
                            this.setPopperPosition("bottomLeft");
                            return;
                        }
                    }
                }
            }
        },
        /**
         * @summary Reverse Position
         */
        reversePosition(position) {
            if (/^left/.test(position)) return position.replace(/^left/, "right");
            else if (/^right/.test(position)) {
                return position.replace(/^right/, "left");
            } else if (/^top/.test(position)) {
                return position.replace(/^top/, "bottom");
            } else return position.replace(/^bottom/, "top");
        },
        /**
         * @summary Set Popper Position
         * @param {string} position Popper Position
         */
        setPopperPosition(position) {
            this._popper.position = this.position;
            let callout = this._popper.style.callout;
            this._popper.style.beak = {};
            let beak = this._popper.style.beak;
            let target = this.getOffsetBodyXY(this.targetElement);
            if (this.beak < 10) {
                this.$set(beak, "display", "none");
            } else {
                this.$set(beak, "display", "block");
                this.$set(beak, "width", this.beak + "px");
                this.$set(beak, "height", this.beak + "px");
            }
            let space = this.beak + this.space;
            //clear
            this.$delete(callout, "right");
            this.$delete(callout, "left");
            this.$delete(callout, "top");
            this.$delete(callout, "bottom");

            this.$set(this._popper.callout, "class", [position]);

            switch (position) {
                case "bottomLeft":
                    this.$set(callout, "top", `${target.top + target.height + space}px`);
                    this.$set(callout, "left", `${target.left}px`);
                    this.$set(beak, "top", `0`);
                    this.$set(beak, "left", `0`);
                    this.$set(beak, "transform", `translate(50%, -50%) rotate(45deg)`);
                    break;
                case "bottomRight":
                    this.$set(callout, "top", `${target.top + target.height + space}px`);
                    this.$set(callout, "left", `${target.right}px`);
                    this.$set(beak, "top", `0`);
                    this.$set(beak, "left", `100%`);
                    this.$set(beak, "transform", `translate(-140%, -50%) rotate(45deg)`);
                    break;
                case "bottomCenter":
                    this.$set(callout, "top", `${target.top + target.height + space}px`);
                    this.$set(callout, "left", `${target.left + target.width / 2}px`);
                    this.$set(beak, "top", `0px`);
                    this.$set(beak, "transform", `translate(-50%, -50%) rotate(45deg)`);
                    break;
                case "topLeft":
                    this.$set(callout, "top", `${target.top - space}px`);
                    this.$set(callout, "left", `${target.left}px`);
                    this.$set(beak, "bottom", `0px`);
                    this.$set(beak, "left", `0px`);
                    this.$set(beak, "transform", `translate(50%, 50%) rotate(45deg)`);
                    break;
                case "topRight":
                    this.$set(callout, "top", `${target.top - space}px`);
                    this.$set(callout, "left", `${target.right}px`);
                    this.$set(beak, "bottom", `0px`);
                    this.$set(beak, "left", `100%`);
                    this.$set(beak, "transform", `translate(-140%, 50%) rotate(45deg)`);
                    break;
                case "topCenter":
                    this.$set(callout, "top", `${target.top - space}px`);
                    this.$set(callout, "left", `${target.left + target.width / 2}px`);
                    this.$set(beak, "bottom", `0px`);
                    this.$set(beak, "transform", `translate(-50%, 50%) rotate(45deg)`);
                    break;
                case "leftTop":
                    this.$set(callout, "left", `${target.left - space}px`);
                    this.$set(callout, "top", `${target.top}px`);
                    this.$set(beak, "left", `100%`);
                    this.$set(beak, "top", 0);
                    this.$set(beak, "transform", `translate(-50%, 50%) rotate(45deg)`);
                    break;
                case "leftBottom":
                    this.$set(callout, "left", `${target.left - space}px`);
                    this.$set(callout, "top", `${target.bottom}px`);
                    this.$set(beak, "left", `100%`);
                    this.$set(beak, "bottom", 0);
                    this.$set(beak, "transform", `translate(-50%, -80%) rotate(45deg)`);
                    break;
                case "leftCenter":
                    this.$set(callout, "left", `${target.left - space}px`);
                    this.$set(callout, "top", `${target.top + target.height / 2}px`);
                    this.$set(beak, "left", `100%`);
                    this.$set(beak, "top", "50%");
                    this.$set(beak, "transform", `translate(-50%, -50%) rotate(45deg)`);
                    break;
                case "rightTop":
                    this.$set(callout, "left", `${target.right + space}px`);
                    this.$set(callout, "top", `${target.top}px`);
                    this.$set(beak, "left", 0);
                    this.$set(beak, "top", 0);
                    this.$set(beak, "transform", `translate(-50%, 50%) rotate(45deg)`);
                    break;
                case "rightBottom":
                    this.$set(callout, "left", `${target.right + space}px`);
                    this.$set(callout, "top", `${target.bottom}px`);
                    this.$set(beak, "left", 0);
                    this.$set(beak, "bottom", 0);
                    this.$set(beak, "transform", `translate(-50%, -80%) rotate(45deg)`);
                    break;
                case "rightCenter":
                    this.$set(callout, "left", `${target.right + space}px`);
                    this.$set(callout, "top", `${target.top + target.height / 2}px`);
                    this.$set(beak, "left", 0);
                    this.$set(beak, "top", "50%");
                    this.$set(beak, "transform", `translate(-50%, -50%) rotate(45deg)`);
                    break;
            }
        },
        isOutBody(el) {
            let target = this.getOffsetBodyXY(el);
            let maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let maxWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (target.top < 0 || target.left < 0 || target.top + target.height > maxHeight || target.left + target.width > maxWidth) {
                return true;
            }
            return false;
        },
        initWindowEvent() {
            if (this.disabled) return;
            this.window = {
                resize: () => {
                    this.adjustPopperPosition(this.position, false);
                },
                scroll: () => {
                    if (!this.lockScroll) {
                        this._popper.show = false;
                    } else this.adjustPopperPosition(this.position, false);
                },
                click: (evt) => {
                    let isOutSide = (el) => {
                        let parent = el;
                        while (parent) {
                            if (parent == this._popper.$el || parent == this.targetElement) {
                                return false;
                            }
                            parent = parent.parentNode;
                        }
                        return true;
                    };
                    if (!this.focusTrap && isOutSide(evt.target)) {
                        this._popper.show = false;
                    }
                },
            };
        },
        initTargetEvent() {
            if (this.effect === "click") {
                this.targetEvent.click = () => {
                    this._popper.show ^= true;
                };
            } else if (this.effect === "hover") {
                this.targetEvent.mouseenter = () => {
                    this.lock.popper = true;
                    clearInterval(this.timeout.hoverClose);
                    this._popper.show = true;
                };
                (this.targetEvent.mouseleave = () => {
                    if (!this.lock.popper) return;
                    this.lock.popper = false;
                    this.timeout.hoverClose = setInterval(() => {
                        this._popper.show = false;
                        this.lock.popper = true;
                        clearInterval(this.timeout.hoverClose);
                    }, 300);
                }),
                    (this.popperEvent.mouseenter = () => {
                        let el = this.$parent;
                        while (el) {
                            if (el.$options.name === "FvOutsidePopper") {
                                if (!el.show) {
                                    el.show = true;
                                    el = el.target;
                                } else {
                                    break;
                                }
                            } else {
                                el = el.$parent;
                            }
                        }
                        this.lock.popper = true;
                        this._popper.show = true;
                        clearInterval(this.timeout.hoverClose);
                    }),
                    (this.popperEvent.mouseleave = () => {
                        let el = this.$parent;
                        while (el) {
                            if (el.$options.name === "FvOutsidePopper" && el.target.effect == "hover") {
                                if (el.show) {
                                    el.show = false;
                                    el = el.target;
                                } else {
                                    break;
                                }
                            } else {
                                el = el.$parent;
                            }
                        }
                        this._popper.show = false;
                    });
            } else if (this.effect === "always") {
                this._popper.show = true;
            }
        },
        init() {
            if (this.disabled) {
                this._popper.show = false;
                return;
            }
            this.initWindowEvent();
            this.initTargetEvent();
            for (let key in this.window) {
                window.addEventListener(key, this.window[key]);
            }
            for (let key in this.targetEvent) {
                this.targetElement.addEventListener(key, this.targetEvent[key]);
            }
            for (let key in this.popperEvent) {
                this._popper.$el.addEventListener(key, this.popperEvent[key]);
            }
            this.initPopper();
            if (this.delayClose > 0 && this._popper.show) {
                this.timeout.close = setTimeout(() => {
                    this._popper.show = false;
                }, this.delayClose);
            }
        },
        getOffsetBodyXY(el) {
            return el.getBoundingClientRect();
        },
    },
    mounted() {
        this._popper = this.$refs.popper;
        // 添加到body上
        document.body.append(this._popper.$el);
        this.init();
        this._popper.theme = this.$theme;
    },
    render() {
        let target = this.getFirstDefaultSlotElement();
        let slots = this.slot();
        return (
            <div>
                {target}
                <Popper ref="popper" nodes={slots}></Popper>
            </div>
        );
    },
    beforeCreate() {
        // const PopperClass = Vue.extend(Popper);
        // this._popper = new PopperClass();
        // this._popper.$mount();
        // document.body.append(this._popper.$el);
    },
    beforeDestroy() {
        this._popper.$destroy();
        for (let key in this.timeout) {
            clearTimeout(this.timeout[key]);
        }
        for (let key in this.window) {
            window.removeEventListener(key, this.window[key]);
        }
        for (let key in this.targetEvent) {
            this.targetElement.removeEventListener(key, this.targetEvent[key]);
        }
        for (let key in this.popperEvent) {
            this._popper.$el.removeEventListener(key, this.popperEvent[key]);
        }
    },
};
</script>
