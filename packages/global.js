// Global Variable 
import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)
export default new vuex.Store({
    state: {
        theme:'light',
        imgUriList: []  //{data:Base64String,key:String,state:('none'|'loading'|'done')}
    },
    getters: {
        imgUri: (state) => (key) => {
            return state.imgUriList.find(item => item.key === key);
        }
    },
    mutations: {
        changeTheme (state,theme) {
            state.theme=theme
        },
        setImgUri (state,imgUri) {
            let status = imgUri.state;
            if(imgUri.key == undefined)
                return 0;
            if(status != 'none' && status != 'loading' && status != 'done')
                imgUri.state = 'none';
            let item = state.imgUriList.find(item => item.key === imgUri.key);
            if(item == undefined)
                state.imgUriList.push({data:imgUri.data,key:imgUri.key,state:imgUri.state});
            else
                vue.set(state.imgUriList,state.imgUriList.indexOf(item),{data:imgUri.data,key:imgUri.key,state:imgUri.state});
        },
        clearImgUri (state, key) {
            let item = state.imgUriList.find(item => key === item.key);
            if(item == undefined)
                return 0;
            else
                state.imgUriList.splice(state.imgUriList.indexOf(item),1);
        }
    }
})