<template>
    <div :class="['fv-'+$theme+'-drawer']" :style="style.drawer">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FvDrawer',
    props: {
        theme: {
            type: String,
            default: "system"
        },
        position:{
            type:String,
            default:"bottom"
        },
        length:{
            default: 300
        },
        visible:{
        },
        zIndex:{
            type:Number,
            default:9999
        },
        focusTrap:{
            type:Boolean,
            default:false,
        }
    },
    data () {
        return {
            lock:false,
            style:{
                drawer:{
                    zIndex:this.zIndex
                }
            },
            show:{
                drawer:this.visible==undefined?false:this.visible,
            },
            window:{
                click:(evt)=>{
                    if (!this.computeVisible || this.lock) return;
                    if (this.focusTrap) return;
                    let el = evt.target;
                    let _self = false;
                    while (el){
                        if (el==this.$el){
                            _self = true;
                        }
                        if (el.parentNode)
                            el=el.parentNode;
                        else break;
                    }
                    if (!_self) this.computeVisible=false;       
                }
            }
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        computeVisible:{
            get(){
                return this.visible==undefined?this.show.drawer:this.visible;
            },
            set(val){
                this.show.drawer = val;
                this.$emit("update:visible",val);
            }
        }
    },
    watch:{
        computeVisible(){
            this.lock=true;
            this.setStyle();
            // Avoid Dumplite Touch
            setTimeout(()=>{
                this.lock=false;
            },50);
        },
    },
    mounted(){
        this.setStyle();
        this.init();
    },
    methods:{
        init(){
            for (let key in this.window){
                window.addEventListener(key,this.window[key]);
            }
        },
        setStyle(){
            let length = this.length;
            if (typeof(this.length)=="number"){
                length+='px';
            }
            if (this.position=="bottom"){
                this.style.drawer={
                    left:"0",
                    bottom:"0",
                    height:length,
                    width:"100%",
                    zIndex:this.zIndex,
                    transform:` ${this.computeVisible?"translateY(0%)":"translateY(100%)"}`
                }
            }else if (this.position=="top"){
                this.style.drawer={
                    left:"0",
                    top:"0",
                    height:length,
                    width:"100%",
                    zIndex:this.zIndex,
                    transform:`${this.computeVisible?"translateY(0%)":"translateY(-100%)"}`
                }
            }else if (this.position=="left"){
                this.style.drawer={
                    left:"0",
                    top:"0",
                    width:length,
                    height:"100%",
                    zIndex:this.zIndex,
                    transform:`${this.computeVisible?"translateX(0%)":"translateX(-100%)"}`
                }
            }else{
                this.style.drawer={
                    right:"0",
                    top:"0",
                    width:length,
                    height:"100%",
                    zIndex:this.zIndex,
                    transform:`${this.computeVisible?"translateX(0%)":"translateX(100%)"};`
                }
            }
        },
        close(){
            this.computeVisible=false;
        }
    },
    beforeDestroy(){
        for (let key in this.window){
            window.removeEventListener(key,this.window);
        }
    }
}
</script>
