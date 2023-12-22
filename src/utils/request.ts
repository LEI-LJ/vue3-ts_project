import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showToast } from 'vant'
import type { ResponseType } from '@/types/request'
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
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    if (res.data.code !== 10000) {
      // 给用户一个提示
      showToast(res.data.message)
      return Promise.reject(new Error('出错了'))
    }
    console.log(res.config)
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err) => {
    // 业务逻辑错误的统一处理 跳转到登陆页面 重新登陆
    // 打印router 可以显示当前页面信息
    // console.log(router.currentRoute.value.fullPath)
    router.push('/login?redirect=' + router.currentRoute.value.fullPath)
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)
export const myPost = <T, Data>(url: string, data: Data) => {
  return axios.post<any, ResponseType<T>>(url, data)
}

export default instance
