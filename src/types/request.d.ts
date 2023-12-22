// 封装共用的联网方法
export type ResponseType<T> = {
  code: string
  message: string
  data: T
}
