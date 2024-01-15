import Cookies from 'js-cookie'

const TokenKey = 'pc_login_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const storeMobile = 'crm_Mobile';
export function getMobile() {
  return Cookies.get(storeMobile)
}
export function setMobile(mobile) {
  return Cookies.set(storeMobile, mobile)
}

export function removeMobile() {
  return Cookies.remove(storeMobile)
}
const storeId = 'crm_Id';
export function getId() {
  return Cookies.get(storeId)
}
export function setId(id) {
  return Cookies.set(storeId, id)
}

export function removeId() {
  return Cookies.remove(storeId)
}
