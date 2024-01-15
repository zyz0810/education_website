import request from '@/utils/request'
import Qs from 'qs'

// 登录方法
export function login(query) {
  return request({
    // url: 'api-auth/oauth/crm/login',
    // method: 'post',
    // data: Qs.stringify(data, {
    //   arrayFormat: 'indices',
    //   allowDots: true
    // })
    url: '/pc/login',
    method: 'get',
    params: query
  })
}

// 获取用户详细信息（用户权限）
export function getInfo() {
  return request({
    // url: 'api-crm-system/crm/users/current',
    // method: 'get'
    url: '/perm/getuserperm',
    method: 'get',
  })
}
/* 修改资料
 *
 */
export function userUpdate(data) {
  return request({
    url: 'api-crm-system/crm/users/saveOrUpdateSysUser',
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}
/* 修改密码
 *
 */
export function resetPassword(data) {
  return request({
    url: 'api-crm-system/crm/users/app/resetPassword',
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 退出登录
 *
 */
export function logout() {
  return request({
    url: 'pc/logout',
    method: 'get',
  })
}


/* 忘记密码 - 发送验证码
 * mobile
 */
export function sendverifycode(query) {
  return request({
    url: '/pc/sendverifycode',
    method: 'get',
    params: query
  })
}

/* 忘记密码 - 验证码校验
 * mobile 手机
 * varify_code 验证码
 */
export function checkverifycode(query) {
  return request({
    url: '/pc/checkverifycode',
    method: 'get',
    params: query
  })
}

/* 忘记密码 - 修改密码
 * passwd 密码
 * confirm_passwd 确认密码
 * temp_token 临时token
 */
export function changepasswd(query) {
  return request({
    url: '/pc/changepasswd',
    method: 'get',
    params: query
  })
}

/* 修改密码 - 修改密码
 * passwd 密码
 * confirm_passwd 确认密码
 * temp_token 临时token
 */
export function modifypasswd(query) {
  return request({
    url: '/pc/modifypasswd',
    method: 'get',
    params: query
  })
}
