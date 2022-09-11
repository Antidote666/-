import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const server = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

server.interceptors.request.use((config) => {
  if (store.getters.isLogin) {
    config.headers.Authorization = `Bearer ${store.state.tokenObj.token}`
  }
  return config
})

server.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  ({ response }) => {
    const { data, status } = response
    if (status >= 400 && status <= 500) {
      Toast.fail(data.message)
    }
    return Promise.reject(data)
  }
)

export default server
