<template>
<div :class="'fv-'+$theme+'-ImgBox'" :style="{background: onbackground ? 'url('+imgUri.data+') no-repeat' : ''}">
    <div v-show="imgUri.state!='done'" class="content">
        <fv-progress-bar v-show="imgUri.state=='none'" :loading="true" style="width: 100%;"></fv-progress-bar>
        <fv-progress-ring v-show="imgUri.state=='loading'"></fv-progress-ring>
    </div>
    <transition name="fade-in">
        <img v-if="imgUri.state=='done' && !onbackground" draggable="false" alt="" :src="imgUri.data"/>
    </transition>
</div>
</template>

<script>
export default {
    name:'FvImgBox',
    props: {
        url: {
            default: ''
        },
        onlazy: {
            default: false
        },
        onbackground: {
            default: false
        },
        theme:{
            type: String,
            default:"system"
        }
    },
    data () {
        return {
            xhr: false,
            lazy: false,
            lazyTimer: null,
            formatTimer: null
        }
    },
    watch: {
        url () {
            if(this.xhr != false)
                this.xhr.abort();
            if(this.url != '' && !this.lazy)
                this.LoadingImg();
        },
        onlazy (val) {
            this.lazy = val.toString() == 'true' ? true : false;
        },
        lazy (val) {
            if(val)
                this.lazyInit();
        }
    },
    computed: {
        $theme () {
            if (this.theme=='system')
                return this.$fvGlobal.state.theme;
            return this.theme;
        },
        imgUri () {
            if(this.$fvGlobal.getters.imgUri(this.url) == undefined)
                this.$fvGlobal.commit('setImgUri', {
                    data: '',
                    key: this.url,
                    state: 'none'
                });
            return this.$fvGlobal.getters.imgUri(this.url);
        }
    },
    mounted () {
        this.lazy = this.onlazy.toString() == 'true' ? true : false;
        if(this.url != '' && ! this.lazy)
            this.LoadingImg();
    },
    methods: {
        LoadingImg () {
            if(this.imgUri.state == 'none'){
                this.$fvGlobal.commit('setImgUri',{
                    data: '',
                    key: this.url,
                    state:'loading'
                });
                this.getUrlImg(this.url);
            }
            clearInterval(this.formatTimer);
            this.formatTimer = setInterval(() => {  // if data is none and status is not loading then active loading again. //
                if((this.$fvGlobal.getters.imgUri(this.url).data == undefined || this.$fvGlobal.getters.imgUri(this.url).data == '' || this.$fvGlobal.getters.imgUri(this.url).data == null) && (this.$fvGlobal.getters.imgUri(this.url).state == 'none' || this.$fvGlobal.getters.imgUri(this.url).state == 'done'))
                {
                    this.$fvGlobal.commit('setImgUri', {
                        data: '',
                        key: this.url,
                        state: 'loading'
                    });
                    this.getUrlImg(this.url);
                }
            },3000);
        },
        getUrlImg (url) {
            if(url == undefined)
            {
                console.warn(`imgBox can't find url: ${url}.`);
                return 0;
            }
            let xhr = new XMLHttpRequest();
            xhr.open("get",url,true);
            // define the response type what you want to translate in the xhr.response //
            xhr.responseType = "blob";
            xhr.onreadystatechange = event => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let blob = xhr.response;
                    let data_type = blob.type.split('/')[0]; // text/plain or image/[any] //
                    let FR = new FileReader();
                    FR.onload = (event) => {
                        let base64 = event.target.result;
                        this.UpdateStore(base64);
                    }
                    if(data_type === 'image')
                        FR.readAsDataURL(blob);
                    else
                        FR.readAsText(blob);
                }
                else if (xhr.readyState == 4) {

                }
            }
            xhr.send();
            xhr.onerror = event => {
                this.$emit("error", event);
                this.$fvGlobal.commit('clearImgUri', this.url);
                console.warn("Fv-ImgBox doesn't support cross-domain url.");
            }
            this.xhr = xhr;
        },
        UpdateStore (base64) {
            this.$fvGlobal.commit('setImgUri',{
                data: base64,
                key: this.url,
                state: 'done'
            });
        },
        lazyInit () {
            clearInterval(this.lazyTimer);
            this.lazyTimer = setInterval(() => {
                if(this.$el.getBoundingClientRect().top < window.innerHeight)
                {
                    this.lazy = false;
                    this.LoadingImg();
                    clearInterval(this.lazyTimer);
                }
            }, 300);
        }
    },
    beforeDestroy () {
        clearInterval(this.formatTimer);
        clearInterval(this.lazyTimer);
    }
}
</script>