export const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号有误' }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /\d{6}/, message: '验证码格式错误' }
]
