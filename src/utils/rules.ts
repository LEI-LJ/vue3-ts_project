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
