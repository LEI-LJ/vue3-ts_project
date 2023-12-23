// import axios from ''
// console.log(axios)
import type { CodeType, User } from '@/types/user'
import { myGet, myPost } from '@/utils/request'
// console.log(axios)
type UserType = {
  mobile: string
  password: string
}
// 手机号密码登录
export const login = ({ mobile, password }: UserType) =>
  myPost<User>('/login/password', { mobile, password })
// 手机号验证码登录
export const CodeLogin = ({
  mobile,
  code
}: {
  mobile: string
  code: string
}) => {
  return myPost<User>('/login', { mobile, code })
}
// 发送验证码的方法
export const sendMobileCode = ({
  mobile,
  type
}: {
  mobile: string
  type: CodeType
}) => myGet<{ code: string }>('/code', { mobile, type })
