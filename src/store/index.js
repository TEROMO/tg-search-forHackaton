import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import search from './search'
import get from './get'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: 'admin@admin.com'
    },
    // user: null,
    error: null
  },
  getters: {
    error: s => s.error,
    mainEmail: s => s.user.email
  },
  actions: {
    updateEmail({ commit }, email) {
      try {
        // запрос на бекенд
        return new Promise(resolve => {
          setTimeout(() => {
            // для демо
            commit('setEmail', email)
            resolve()
          }, 1000)
        })
      } catch (e) {
        commit('setError', e) // если нет, то выбрасываем ошибку, вызывая мутацию setError
        throw e
      }
    }
  },
  mutations: {
    setEmail(state, email) {
      state.user.email = email
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  modules: {
    auth,
    search,
    get
  }
})
