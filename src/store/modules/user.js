import {
  login,
  logout,
  getInfo,
  backlog
} from '@/api/login'
import {
  Message
} from 'element-ui'
import {
  getToken,
  setToken,
  removeToken,
  getMobile,
  setMobile,
  removeMobile,
  getId,
  setId,
  removeId
} from '@/utils/auth'

const user = {
  state: {
    crm_token: getToken(),
    crm_id:'',
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    crm_mobile: '',
    agent_number: '', //代办数
    ineffective_count:'',//已过期
    will_effective_count:'',//即将过期
    customer_store_ids:'',
  },

  mutations: {
    SET_TOKEN: (state, crm_token) => {
      state.crm_token = crm_token
    },
    SET_ID: (state, crm_id) => {
      state.crm_id = crm_id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions || []
    },
    SET_MOBILE: (state, crm_mobile) => {
      state.crm_mobile = crm_mobile
    },
    SET_PERSONA: (state, persona) => {
      state.persona = persona
    },
    // 代办数
    SET_AGENT_NUMBER: (state, agent_number) => {
      state.agent_number = agent_number
    },
    // 已过期
    SET_INEFFECTIVE_COUNT: (state, ineffective_count) => {
      state.ineffective_count = ineffective_count
    },
    // 即将过期
    SET_WILL_EFFECTIVE_COUNT: (state, will_effective_count) => {
      state.will_effective_count = will_effective_count
    },
    // 代办事项分配给我的客户跳转客户列表参数
    SET_CUSTOMER_STORE_IDS: (state, customer_store_ids) => {
      state.customer_store_ids = customer_store_ids
    },
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login({
          mobile: username.trim(),
          passwd: password
        }).then(res => {
          console.log('dd:'+res.data.pc_login_token)
          setToken(res.data.pc_login_token)
          sessionStorage.setItem("pc_login_token", JSON.stringify(res.data.pc_login_token));
          commit('SET_TOKEN', res.data.pc_login_token)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({
      commit,
      dispatch,
      state
    }) {

      return new Promise((resolve, reject) => {
        getInfo(state.crm_token).then(res => {
          // const avatar = res.data.headImgUrl == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + res.data.headImgUrl;
          // const avatar = require("@/assets/image/profile.jpg");
          let role = []
          // if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   let arr = []
          //   arr = res.data.roles.filter(item => {
          //     return item.code == 'ADMIN' || item.code == 'admin'
          //   })
          //   if (arr.length > 0) {
          //     role = ['admin']
          //   } else {
          //     if (res.data.permissions == null) {
          //       role = []
          //     } else {
          //       role = res.data.permissions
          //     }
          //   }
          //   if (!role.length) {
          //     Message({
          //       message: '没有访问权限',
          //       type: 'warning'
          //     })
          //     removeToken()
          //     return
          //   }
          //   commit('SET_ROLES', res.data.roles)
          //   commit('SET_PERMISSIONS', role)
          // } else {
          //   commit('SET_ROLES', ['ROLE_DEFAULT'])
          // }

          //
          // setMobile(res.data.mobile)
          // setId(res.data.id)
          // commit('SET_ID', res.data.id)
          // commit('SET_NAME', res.data.nickname)
          // commit('SET_AVATAR', avatar)
          // commit('SET_MOBILE', res.data.mobile)



          let json = res.data;

          if(json.can_audit_user == 1){
            role.push('can_audit_user')
          }
          if(json.can_deal_comlaint == 1){
            role.push('can_deal_comlaint')
          }
          if(json.can_deal_income == 1){
            role.push('can_deal_income')
          }
          if(json.can_query_supplier == 1){
            role.push('can_query_supplier')
          }
          if(json.can_query_operations == 1){
            role.push('can_query_operations')
          }
          if(json.can_query_user == 1){
            role.push('can_query_user')
          }
          if(json.can_manage_perm == 1){
            role.push('can_manage_perm')
          }

            if (!role.length) {
              Message({
                message: '没有访问权限',
                type: 'warning'
              })
              removeToken()
              return
            }
            commit('SET_ROLES', role);
            commit('SET_PERMISSIONS', role);
          commit('SET_NAME', res.data.name);
          commit('SET_PERSONA', res.data.role);





          // //未调用getInfo接口
          // role = ['admin']
          // // debugger
          // // removeToken()
          // commit('SET_ROLES', ['admin'])
          // commit('SET_PERMISSIONS', ['admin'])


          resolve(role)
        }).catch(error => {

          console.log('跳转登录')
          // removeToken()

          reject(error)
        })

      })
    },

    // 退出系统
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout({
          access_token: state.crm_token
        }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ID', '')
          commit('SET_NAME', '')
          commit('SET_PERSONA', '');
          commit('SET_AVATAR', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          commit('SET_MOBILE', '')
          removeToken()
          sessionStorage.setItem("pc_login_token", '');
          removeMobile()
          removeId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ID', '');
        commit('SET_NAME', '');
        commit('SET_PERSONA', '');
        commit('SET_AVATAR', '');
        commit('SET_ROLES', []);
        commit('SET_PERMISSIONS', []);
        commit('SET_MOBILE', '');
        removeToken();
        removeId();
        sessionStorage.setItem("pc_login_token", '');
        resolve()
      })
    },
  }
}

export default user
