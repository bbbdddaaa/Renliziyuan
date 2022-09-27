import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
      console.log(hrsaasTime)
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_HRSAAS_TIME', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      const data = await getUserInfo()
      const data1 = await getUserDetailById(data.userId)
      const result = { ...data, ...data1 }
      console.log(result)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
