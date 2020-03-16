<template>
<div :class="['fv-'+$theme+'-InfoBox', mode, {acrylic: acrylic}]">
    <div class="sinfo-box-block" :class="[iconList[status].background]">
        <div class="title-bar">
            <i class="ms-Icon icon-block" :class="[`ms-Icon--${iconList[status].icon}`]"></i>
            <span class="title-content">{{title}}</span>
        </div>
        <span class="info-box-content-block">
            <slot name="msg">
                Info Box Content.
            </slot>
        </span>
        <div class="info-box-control-block">
            <fv-button :theme="$theme" style="width: 100%; margin-right: 2.5px;" @click="confirm">{{confirmTitle}}</fv-button>
            <fv-button :theme="$theme" style="width: 100%; margin-left: 2.5px;" @click="destroySelf">{{cancelTitle}}</fv-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
	name: "FvInfoBox",
	props: {
        title: {
            default: 'Tip'
        },
		status: {
			default: "default"
		},
		mode: {
			default: "relative"
        },
        toast: {
            default: false
        },
        confirmTitle: {
            default: '确定'
        },
        cancelTitle: {
            default: '取消'
        },
        acrylic: {
            default: false
        },
		theme: {
			type: String,
			default: "system"
		}
	},
	data() {
		return {
			iconList: {
				default: { icon: "Error", background: "" },
				warning: { icon: "Warning", background: "brown" },
				correct: { icon: "Completed", background: "green" },
				blocked: { icon: "Blocked12   ", background: "red" },
				error: { icon: "ErrorBadge", background: "red" }
			}
		};
	},
	computed: {
		$theme() {
			if (this.theme == "system") return this.$fvGlobal.state.theme;
			return this.theme;
		}
    },
    methods: {
        confirm () {
            if(this.toast === false)
                this.$emit('confirm');
            else
                this.close('confirm');
        },
        destroySelf () {
            if(this.toast === false)
                this.$emit('close');
            else
                this.close('close');
        },
        close (str) {
            this.$el.remove();
            this.$emit(str);
            this.$destroy();
        }
    }
};
</script>
