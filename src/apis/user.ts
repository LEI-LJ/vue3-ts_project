// import axios from ''
// console.log(axios)
import type { CodeType, PatientListType, User, UserInfo } from '@/types/user'
import { myDelete, myGet, myPost, myPut } from '@/utils/request'
// console.log(axios)
type UserType = {
  mobile: string
  password: string
}
// 手机号密码登录
export const login = ({ mobile, password }: UserType) =>
  myPost<User>('/login/password', { mobile, password })
// 手机号验证码登录
export const CodeLogin = ({ mobile, code }: { mobile: string; code: string }) =>
  myPost<User>('/login', { mobile, code })

// 发送验证码的方法
export const sendMobileCode = ({
  mobile,
  type
}: {
  mobile: string
  type: CodeType
}) => myGet<{ code: string }>('/code', { mobile, type })

// 获取个人信息

export const getUserInfo = () => myGet<UserInfo>('/patient/myUser')

// 获得患者列表

export const getPatientList = () => myGet<PatientListType[]>('patient/mylist')

// 添加患者信息

export const addPatient = (data: PatientListType) =>
  myPost('/patient/add', data)
// 编辑接口

export const editPatient = (data: PatientListType) =>
  myPut('/patient/update', data)

// 删除

export const deletePatient = (id: number | string) =>
  myDelete(`/patient/del/${id}`)
