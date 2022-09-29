import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 对比 时间是否超时
const TimeOut = 3600
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})
// 添加请求头
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // console.log(IsCheckTimeOut())
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})
// 请求成功或者失败
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
