import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: window.sessionStorage,
})
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        user: "",
        mode: "month"
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getMode(state) {
            return state.mode
        }
    },
    mutations: {
        setUser(state, params) {
            state.user = params
        },
        setMode(state, params) {
            state.mode = params
        }
    },
    actions: {
        setUser({ commit }, params) {
            commit('setUser', params)
        },
        setMode({ commit }, params) {
            commit('setMode', params)
        }
    },
})
