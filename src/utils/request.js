import axios from 'axios'
import { Toast } from 'vant'
const server = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
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
      return data.message
    }
    return Promise.reject(data)
  }
)

export default server
