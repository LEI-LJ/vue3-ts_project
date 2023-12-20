import axios from 'axios'
import { useUserStore } from '@/stores'
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: 'https://consult-api.itheima.net',
  timeout: 10000
})
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // TODO 2. 携带token
    if (userStore.user) {
      config.headers.Authorization = userStore.user.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败

    // TODO 4. 摘取核心响应数据
    return res
  },
  (err) => {
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default instance
