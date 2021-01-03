let id = 1;
export default {
    data() {
        return {
            revealEffectName: "revealEffect" + (id++)
        }
    },
    computed: {
        revealEffectClass() {
            return this.revealEffect ? [this.revealEffectName] : []
        }
    },
    methods: {
        isUrl(iconName){
            if (/^http[s]?:\/\/([\w\-\.]+)+[\w-]*([\w\-\.\/\?%&=]+)?$/ig.test(iconName)){
                return true
            }else{
                return false
            }
        }
    }
}