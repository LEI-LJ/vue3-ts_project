// import axios from ''
// console.log(axios)
import axios from '@/utils/request'
import type { ResponseType } from '@/types/request'
// console.log(axios)

export const login = <T>({
  mobile,
  password
}: {
  mobile: number
  password: string
}) => {
  return axios.post<any, ResponseType<T>>('/login/password', {
    params: { mobile, password }
  })
}

export const text401 = <T>() => {
  return axios.post<any, ResponseType<T>>('/patient/myUser', {
    mobile: '13230000006',
    password: 'abc12345'
  })
}
