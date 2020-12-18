import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideBarOpen: false,
        url : {
            // BASE_API : 'http://localhost:8080/api',
            // BASE_API : 'http://localhost/absensiapi/public/api',
            BASE_API : 'http://192.168.1.103/absensiapi/public/api',
        }
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        }
    },
    mutations: {
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        }
    }
})
