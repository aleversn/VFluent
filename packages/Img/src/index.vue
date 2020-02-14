<template>
<div :class="'fv-'+$theme+'-Img'">
    <fv-ImgBox v-if="status == 'imgBox'" :url="src" :onlazy="onlazy" :onbackground="onbackground" style="width: 100%; height: 100%;" @error="status = 'image'"></fv-ImgBox>
    <fv-Image v-if="status == 'image'" :src="src" :onlazy="onlazy" style="width: 100%; height: 100%;"></fv-Image>
</div>
</template>

<script>
export default {
    name: 'FvImg',
    props: {
        src: {
            default: ''
        },
        onlazy: {
            default: false
        },
        onbackground: {
            default: false
        },
        theme: {
            type: String,
            default: "system"
        }
    },
    data () {
        return {
            status: "imgBox"
        }
    },
    computed: {
      $theme () {
          if (this.theme == 'system')
              return this.$fvGlobal.state.theme;
          return this.theme;
      }
    }
}
</script>
