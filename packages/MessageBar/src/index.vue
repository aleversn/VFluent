<template>
<div :class="['fv-'+$theme+'-MessageBar', iconList[status].iconColor, {relative: mode == 'relative'}]">
    <span class="msg-bar-block">
        <i class="ms-Icon icon-block" :class="[`ms-Icon--${iconList[status].icon}`, iconList[status].iconColor]"></i>
        <span class="msg-content-block">
            <slot name="msg">
                Message Bar.
            </slot>
        </span>
        <i v-show="showClose" class="ms-Icon ms-Icon--Cancel close-block" @click="destroySelf"></i>
    </span>
    <span v-show="showControl" class="control-block">
        <slot name="control" :theme="$theme" :cancel="destroySelf">
            <fv-button>Yes</fv-button>
        </slot>
    </span>
</div>
</template>

<script>
import gsap from 'gsap';

export default {
    name: "FvMessageBar",
	props: {
        status: {
            default: 'default'
        },
        showControl: {
            default: false
        },
        showClose: {
            default: true
        },
        mode: {
            default: 'relative'
        },
        autoClose: {
            default: 3000
        },
		theme: {
			type: String,
			default: "system"
		}
	},
	data() {
		return {
            iconList: {
                default: { icon: 'Info2', iconColor: 'normal' },
                warning: { icon: 'Info2', iconColor: 'warning' },
                correct: { icon: 'CheckMark', iconColor: 'correct' },
                blocked: { icon: 'Remove   ', iconColor: 'error' },
                error: { icon: 'ErrorBadge12', iconColor: 'error' }
            }
        };
	},
	computed: {
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		}
    },
    mounted () {
        this.autoDestroyInit();
    },
    methods: {
        autoDestroyInit () {
            if(this.mode !== 'relative' && this.autoClose > 0)
                setTimeout(() => {
                    this.destroySelf();
                }, this.autoClose);
        },
        destroySelf () {
            if(this.mode == 'relative')
                this.$emit('close');
            else
            {
                gsap.to(this.$el, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        this.$el.remove();
                        this.$emit("close");
                        this.$destroy();
                    }
                });
            }
        }
    }
};
</script>
