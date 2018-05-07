/**
 * 验证手机号格式是否正确
 * @param mobile
 */
export const validMobile = (mobile) => {
  mobile = mobile && mobile.replace(/\D/g, '')
  return mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile)
}

/**
 * 检验密码强度
 * @param sValue 密码
 */
export const checkPwdStrong = (sValue) => {
  let modes = 0
  // 通过前端验证的再进行验证
  // 不合格 返回0
  // 任何字符数的两类字符组合，弱， 返回值为1
  // 10位字符数以下的三类组合，中 ，返回值为2
  // 10位字符数以上的三类组合，强，返回值为3
  if (sValue.length < 8) return modes
  if (/\d/.test(sValue)) modes++ // 数字
  if (/[a-z]/.test(sValue)) modes++ // 小写
  if (/[A-Z]/.test(sValue)) modes++ // 大写
  if (/\W/.test(sValue)) modes++ // 特殊字符

  // 逻辑处理
  switch (modes) {
    case 1:
      return 0
    case 2:
      return 1
    case 3:
      if (sValue.length < 10) {
        return 2
      } else {
        return 3
      }
    case 4:
      return 3
  }
}