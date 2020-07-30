import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
/*eslint-disable*/
export default {
  state: {
    token: '123123123'
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    clearToken(state) {
      state.token = null
    }
  },
  getters: {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token
  },
  actions: {
    async login({ dispatch, commit }, { login, password }) {
      try {
        return new Promise(resolve => {
          setTimeout(() => {
            // запрос на сервер за токеном
            // const { token } = await this.axios.$post(
            //   '/api/auth/login',
            //   formData
            // )
            const token = '123123123'
            console.log(token)
            dispatch('setToken', token)
            resolve()
          }, 1000)
        })
      } catch (e) {
        commit('setError', e) // если нет, то выбрасываем ошибку, вызывая мутацию setError
        throw e
      }
    },
    async logout({ commit }) {
      debugger
      this.axios.setToken(false)
      commit('clearToken')
      Cookies.remove('jwt-token')
      // commit('clearInfo') // очищаем объект info
    },
    setToken({ commit }, token) {
      debugger
      this.axios.setToken(token, 'Bearer')
      commit('setToken', token)
      Cookies.set('jwt-token', token) // устанавливаем в cookie токен
    },
    autoLogin({ dispatch }) {
      // Логинимся, если есть в куках токен
      const cookieStr = process.browser // если находимся на клиенте
        ? document.cookie // куки
        : this.app.context.req.headers.cookie // если на сервере, то берем из хедеров
      const cookies = Cookie.parse(cookieStr || '') || {} // парсим стоку в объект
      const token = cookies['jwt-token'] // достаем из объекта токен

      if (isJWTValid(token)) {
        // если валидный токен, то устанавливаем токен
        dispatch('setToken', token)
      } else {
        dispatch('logout')
      }
    }
  }
}

function isJWTValid(token) {
  if (!token) {
    return false
  }

  const JwtData = jwtDecode(token) || {} // данные из токена
  const expires = JwtData.exp || 0 // время жизни токена

  return new Date().getTime() / 1000 < expires // если время токена еще не вышло, то true
}
