<template>
<div :class="['fv-'+$theme+'-AnimatedIcon']" :style="[{width: `${fontSize * 1 + 3}px`, background: background, fontSize: `${fontSize}px`}]" @mousedown="down" @mouseup="up" @touchstart="down" @touchend="up" @mouseenter="enter" @mousemove="move" @touchmove="move" @mouseleave="leave" @click="onClick">
    <div draggable="false" class="fv-animated-icon-container" :style="[animatedStyle]">
        <slot>
            <i ref="a" class="ms-Icon" :class="[`ms-Icon--${icon}`]"></i>
        </slot>
    </div>
    <div v-show="!hideContent" class="fv-animated-content-block">
        <slot name="content"></slot>
    </div>
</div>
</template>

<script>

export default {
    name: 'FvAnimatedIcon',
    props: {
        value: {
            default: 'scaleDown'
        },
        icon: {
            default: 'Search'
        },
        customizeAnimation: {
            default: false
        },
        background: {
            default: ''
        },
        fontSize: {
            default: 16
        },
        hideContent: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            thisValue: this.value,
            animations: {
                scaleDown: {
                    down: {
                        transform: 'scale(0.8)',
                        transition: `transform 0.2s`
                    },
                    up: [
                        {
                            transform: 'scale(1.1)',
                            transition: `transform 0.2s`
                        },
                        {
                            transform: 'scale(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ],
                    leave: [
                        {
                            transform: 'scale(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ]
                },
                scaleXDown: {
                    down: {
                        transform: 'scaleX(0.6)',
                        transition: `transform 0.2s`
                    },
                    up: [
                        {
                            transform: 'scaleX(1.1)',
                            transition: `transform 0.2s`
                        },
                        {
                            transform: 'scaleX(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ],
                    leave: [
                        {
                            transform: 'scaleX(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ]
                },
                scaleYDown: {
                    down: {
                        transform: 'scaleY(0.6)',
                        transition: `transform 0.2s`
                    },
                    up: [
                        {
                            transform: 'scaleY(1.1)',
                            transition: `transform 0.2s`
                        },
                        {
                            transform: 'scaleY(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ],
                    leave: [
                        {
                            transform: 'scaleY(1)',
                            transition: `transform 0.05s ease-out`
                        }
                    ]
                },
                backScale: {
                    down: {
                        transform: 'scale(0.8)',
                        'transform-origin': '100% 50%',
                        transition: `transform 0.2s`
                    },
                    up: [
                        {
                            transform: 'scale(1.1)',
                            'transform-origin': '100% 50%',
                            transition: `transform 0.2s`
                        },
                        {
                            transform: 'scale(1)',
                            'transform-origin': '100% 50%',
                            transition: `transform 0.05s ease-out`
                        }
                    ],
                    leave: [
                        {
                            transform: 'scale(1)',
                            'transform-origin': '100% 50%',
                            transition: `transform 0.05s ease-out`
                        }
                    ]
                },
                bounceRotate: {
                    down: {
                        transform: 'rotate(-15deg)',
                        transition: `transform 0.1s`
                    },
                    up: [
                        {
                            transform: 'rotate(360deg)',
                            transition: `transform 0.3s`
                        },
                        {
                            transform: 'rotate(0deg)'
                        }
                    ],
                    leave: [
                        {
                            transform: 'rotate(360deg)',
                            transition: `transform 0.3s`
                        },
                        {
                            transform: 'rotate(0deg)'
                        }
                    ]
                }
            },
            animatedStyle: {},
            animationsQueue: []
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit("input", val);
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.animationInit();
    },
    methods: {
        animationInit () {
            this.$el.addEventListener('transitionend', event => {
                this.popAnimation();
            });
        },
        enter () {
            let animation = this.getAnimation('enter');
            if(!animation)
                return false;
            if(!animation.length)
                animation = [animation];
            this.animationsQueue = [];
            this.animationsQueue = this.animationsQueue.concat(animation);
            this.popAnimation();
        },
        move () {
            let animation = this.getAnimation('move');
            if(!animation)
                return false;
            if(!animation.length)
                animation = [animation];
            this.animationsQueue = [];
            this.animationsQueue = this.animationsQueue.concat(animation);
            this.popAnimation();
        },
        down (event) {
            event.preventDefault();
            let animation = this.getAnimation('down');
            if(!animation)
                return false;
            if(!animation.length)
                animation = [animation];
            this.animationsQueue = [];
            this.animationsQueue = this.animationsQueue.concat(animation);
            this.popAnimation();
        },
        up (event) {
            event.preventDefault();
            let animation = this.getAnimation('up');
            if(!animation)
                return false;
            if(!animation.length)
                animation = [animation];
            this.animationsQueue = [];
            this.animationsQueue = this.animationsQueue.concat(animation);
            this.popAnimation();
        },
        leave () {
            let animation = this.getAnimation('leave');
            if(!animation)
                return false;
            if(!animation.length)
                animation = [animation];
            this.animationsQueue = [];
            this.animationsQueue = this.animationsQueue.concat(animation);
            this.popAnimation();
        },
        getAnimation (name) {
            if(this.customizeAnimation) {
                if(!this.customizeAnimation[name])
                    return false;
                return this.customizeAnimation[name];
            }
            if(!this.animations[this.thisValue])
                return false;
            let animation = this.animations[this.thisValue];
            if(!animation[name])
                return false;
            return animation[name];
        },
        popAnimation () {
            if(this.animationsQueue.length == 0)
                return 0;
            let animation = this.animationsQueue[0];
            this.animatedStyle = animation;
            this.animationsQueue.splice(0, 1);
        },
        onClick (event) {
			this.$emit("click", event);
		}
    }
}
</script>
