import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求头
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = store.getters.token
  }
  console.log(config)
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
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
