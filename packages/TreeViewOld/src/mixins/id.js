export default {
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