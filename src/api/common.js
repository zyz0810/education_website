import request from '@/utils/request'
import Qs from 'qs'

// 字典   客户来源客户级别
// 客户来源 customer_source
// 客户跟进类型设置 customer_follow
// 公海划入时间 customer_highseas
// 客户级别 customer_level
export function dict (data) {
  return request({
    url: '/api-crm-system/crm/dict',
    method: 'post',
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}

// 所有下拉用户列表数据
export function getUsersByRole (query) {
  return request({
    url: '/api-crm-system/crm/users/getUsersByRole',
    method: 'get',
    params: query
  })
}

/* 附件上传
 */
// export function uploadFiles (file, type = "license") {
//   const data = new FormData()
//   data.append('file', file)
//   data.append('type', type)
//   return request({
//     url: `api-user/file/uploadSingleFile`,

//     method: 'POST',
//     data: data
//   }).then(res => {
//     return res ? res.data : {}
//   })
// }

/* 图片上传
 */
export function uploadFile (file, type = "license") {
  const data = new FormData()
  data.append('file', file)
  data.append('type', type)
  return request({
    url: `api-user/file/uploadSingleImage`,
    method: 'POST',
    data: data
  }).then(res => {
    return res ? res.data : {}
  })
}

/* 附件上传
 */
export function uploadSingleFile(file, type = "license") {
  const data = new FormData()
  data.append('file', file)
  data.append('type', type)
  return request({
    url: `api-user/file/uploadSingleFile`,
    method: 'POST',
    data: data
  }).then(res => {
    return res ? res.data : {}
  })
}

// 供应商名称
export function getSupplier (query) {
  return request({
    url: '/api-crm-order/web/crm/supplier/getSupplier',
    method: 'get',
    params: query
  })
}


// 获取服务商接口
export function findProviderDept (query) {
  return request({
    url: '/api-crm-system/crm/dept/findProviderDept ',
    method: 'get',
    params: query
  })
}

