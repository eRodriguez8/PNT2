import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let initialState = {
  username: null,
  token: null
}

const store = new Vuex.Store({
  state: initialState,
  mutations: {
    login: function (state, username, token) {
      state.username = username
      state.token = token
    },
    logout: function (state) {
      state.username = null
      state.token = null
    }
  },
  getters: {
    isLogged: function (state) {
      return state.username != null && state.username.length > 0
    }
  }
})

export default store
