<template>
<div :class="['fv-'+$theme+'-Persona']">
    <div class="persona-avatar" :style="{width: `${size}px`, height: `${size}px`}">
        <div class="persona-bg" :style="{background: nameCardBackground, 'font-size': `${size / 2.3}px`}">{{nameCard}}</div>
        <fv-img v-if="src !== ''" :src="src" style="width: 100%; height: 100%; border-radius: 50%;"></fv-img>
        <i v-show="showStatus" class="ms-Icon status-icon" :class="[`ms-Icon--${currentIcon}`]" :style="{'font-size': `${iconFontSize}px`, color: currentIconColor}"></i>
    </div>
    <div v-show="showInfo" class="persona-content-block">
        <span class="persona-title" :style="{'font-size': `${titleFontSize}px`}">
            <slot name="name">
                <p>{{name}}</p>
            </slot>
        </span>
        <span class="persona-secondary" :style="{'font-size': `${secondaryFontSize}px`}">
            <slot name="secondary"></slot>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: 'FvPersona',
    props: {
        src: {
            default: ""
        },
        name: {
            default: ""
        },
        size: {
            default: 40
        },
        status: {
            default: ""
        },
        icon: {
            default: ""
        },
        iconColor: {
            default: ""
        },
        showInfo: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            statusList: {
                online: { icon: "FullCircleMask", color: "rgba(107, 183, 0, 1)" },
                offline: { icon: "LocationFill", color: "rgba(50, 49, 48, 1)" },
                away: { icon: "SkypeCircleClock", color: "rgba(255, 170, 68, 1)" },
                busy: { icon: "LocationFill", color: "rgba(196, 49, 72, 1)" },
                ok: { icon: "SkypeCircleCheck", color: "rgba(107, 183, 0, 1)" },
                dnd: { icon: "SkypeCircleMinus", color: "rgba(197, 15, 31, 1)" },
                blocked: { icon: "Blocked", color: "rgba(196, 49, 32, 1)" }
            },
            colorList: [
                '#d29200',
                '#ffb900',
                '#ffb900',
                '#d83b01',
                '#ea4300',
                '#ff8c00',
                '#a4262c',
                '#d13438',
                '#5c005c',
                '#b4009e',
                '#e3008c',
                '#32145a',
                '#5c2d91',
                '#b4a0ff',
                '#002050',
                '#00188f',
                '#0078d4',
                '#00bcf2',
                '#004b50',
                '#008272',
                '#00B294',
                '#004b1c',
                '#107c10',
                '#bad80a'
            ]
        }
    },
    computed: {
        nameCard () {
            return this.name[0];  
        },
        nameCardBackground () {
            let index = 0;
            if(this.name !== '')
                index = this.name[0].charCodeAt() % this.colorList.length;
            return this.colorList[index];
        },
        currentIcon () {
            if(this.icon !== "")
                return this.icon;
            if(this.status === "")
                return "";
            return this.statusList[this.status].icon;
        },
        currentIconColor () {
            if(this.iconColor != "")
                return this.iconColor;
            if(this.status === "")
                return this.statusList["online"].color;
            return this.statusList[this.status].color;
        },
        iconFontSize () {
            return this.size / 4.8 + 6;
        },
        titleFontSize () {
            return this.size / 16 + 12.5;
        },
        secondaryFontSize () {
            return this.size / 48 + 11.5;
        },
        showStatus () {
            return this.status !== '' || this.icon !== '';
        },
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    }
}
</script>
