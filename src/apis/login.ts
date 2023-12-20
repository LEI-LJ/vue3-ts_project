// import axios from ''
// console.log(axios)
import axios from '@/utils/request'
// console.log(axios)

export const login = ({
  mobile,
  password
}: {
  mobile: number
  password: string
}) => {
  return axios.post('/login/password', { params: { mobile, password } })
}
