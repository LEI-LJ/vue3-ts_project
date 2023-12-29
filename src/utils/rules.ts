// 手机号校验规则

import type { FieldRule } from 'vant/lib/field/types'

export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[0-9]{10}$/, message: '手机号不对' }
]

// 密码规则
export const passwordRules: FieldRule[] = [
  { required: true, message: '密码是必传的' },
  { pattern: /^\w{8,24}$/, message: '密码需要2-28字符' }
]
// 验证码验证

export const codeRules: FieldRule[] = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码必须是六位' }
]

// 姓名校验

export const nameRules: FieldRule[] = [
  { required: true, message: '姓名是必传的' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '必须是2-16的汉字' }
]

// 身份证号的校验

export const idCardRules: FieldRule[] = [
  { required: true, message: '必传的' },
  {
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证格式不正确'
  }
]
