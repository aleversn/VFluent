import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)
export default new vuex.Store({
  state: {
    theme:'light'
  },
  mutations: {
    changeTheme (state,theme) {
      state.theme=theme
    }
  }
})