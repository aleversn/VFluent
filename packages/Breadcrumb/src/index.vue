<template>
    <div :class="['fv-'+$theme+'-Breadcrumb', { readOnly: readOnly, 'editor-mode': mode === 'editor', disabled: isDisabled }]" :style="{'border-radius': `${borderRadius}px`, 'border-color': mode === 'editor' ? borderColor : '', 'outline-color': mode === 'editor' ? borderColor : ''}">
        <div class="fv-bc-route-list" ref="main" @click="editorMode">
            <div v-show="showRoot" class="fv-bc-route-item">
                <slot name="root">
                    <i class="fv-bc-separator-content ms-Icon" :class="[`ms-Icon--${rootIcon}`]"></i>
                    <i class="fv-bc-separator-icon ms-Icon" :class="[separatorIcon ? `ms-Icon--${separator}` : '']">{{separatorIcon ? '' : separator}}</i>
                </slot>
            </div>
            <div v-show="mode == 'default'" v-for="(item, index) in routeList" :key="index" class="fv-bc-route-item" @click="routeItemClick(item, index)">
                <slot name="route-item" :item="item" :index="index">
                    <p class="fv-bc-separator-content">{{item}}</p>
                    <i class="fv-bc-separator-icon ms-Icon" :class="[separatorIcon ? `ms-Icon--${separator}` : '']">{{separatorIcon ? '' : separator}}</i>
                </slot>
            </div>
            <input v-show="mode == 'editor'" v-model="tempValue" class="fv-bc-route-text-box" type="text" ref="editor" @keyup="handleEnter">
        </div>
    </div>
</template>

<script>
export default {
    name: 'FvBreadcrumb',
    props: {
        value: {
            default: ''
        },
        separator: {
            type: String,
            default: '/'
        },
        separatorChar: {
            type: String,
            default: '/'
        },
        showRoot: {
            default: true
        },
        rootIcon: {
            default: 'FolderHorizontal'
        },
        readOnly: {
            default: true
        },
        borderColor: {
            default: ''
        },
        disabled: {
            default: false
        },
        borderRadius: {
            default: '2'
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            mode: "default",
            thisValue: this.value,
            tempValue: ""
        }
    },
    watch: {
        mode (val) {
            if(val == 'editor') {
                let route = this.thisValue;
                if(route[0] == this.separatorChar)
                    route = route.slice(1, route.length);
                this.tempValue = route;
            }
            else
            {
                let route = this.tempValue;
                if(route[0] == this.separatorChar)
                    route = route.slice(1, route.length);
                if(this.thisValue[0] == this.separatorChar)
                    this.thisValue = `${this.separatorChar}${route}`;
                else
                    this.thisValue = route;
            }
        }
    },
    computed: {
        separatorIcon () {
            if(this.separator.length > 1)
                return true;
            return false;
        },
        routeList () {
            let route = this.thisValue;
            if(route[0] == this.separatorChar)
                route = route.slice(1, route.length);
            if(route == '')
                return [];
            return route.split(this.separatorChar);
        },
        isDisabled() {
			return (
				this.disabled.toString() == "true" ||
				this.disabled == "disabled" ||
				this.disabled === ""
			);
		},
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        }
    },
    mounted () {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit () {
            window.addEventListener("click", event => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                    if (x == this.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.mode = 'default';
            });
        },
        editorMode (event) {
            if(this.isDisabled)
                return 0;
            if(this.readOnly)
                return 0;
            if(event.target !== this.$refs.main)
                return 0;
            event.preventDefault();
            event.stopPropagation();
            this.mode = 'editor';
            setTimeout(() => {
                this.$refs.editor.focus();
                this.$refs.editor.select();
            }, 300);
        },
        handleEnter (event) {
            if(event.keyCode === 13)
                this.mode = 'default';
        },
        routeClick () {
            if(this.isDisabled)
                return 0;
            this.$emit('root-click', {
                path: this.thisValue,
                pathList: this.routeList
            });
        },
        routeItemClick (item, index) {
            if(this.isDisabled)
                return 0;
            let path = '';
            let pathList = [];
            for(let i = 0; i <= index; i++)
                pathList.push(this.routeList[i]);
            pathList.forEach(el => {
                if(path == '')
                    path = el;
                else
                    path += `${this.separatorChar}${el}`;
            });
            this.$emit('item-click', {
                path: path,
                fullPath: `${this.separatorChar}${path}`,
                pathList: pathList,
                current: item
            });
        }
    }
}
</script>
