import { menuNav } from '../../api/menu' // 获取菜单接口
import user from './user'
import { menuRecursion } from '@/utils/tools'
const permission = {
  state: {
    permissionList: [], // 权限列表
    btnsPermissionList: ['user']
  },
  mutations: {
    updatePermissionList: (state, payload) => {
      state.permissionList = payload
    },
    updateBtnPermissionList: (state, payload) => {
      state.btnsPermissionList = payload
    }
  },
  actions: {
    getPermissionList: async ({ state, commit }) => {
      // 如果权限为空就从新请求接口
      if (!user.state.menus.length) {
        await menuNav().then(res => {
          if (res.code === 0) {
            user.state.menus = res.data
            sessionStorage.setItem('menus', JSON.stringify(res.data))
            commit('updatePermissionList', menuRecursion(user.state.menus))
            commit('updateBtnPermissionList', res.permissions)
          }
        })
      }
    },
    // 更新权限
    resetPermissionList: async ({ state, commit }) => {
      await menuNav().then(res => {
        if (res.code === 0) {
          user.state.menus = res.data
          sessionStorage.setItem('menus', JSON.stringify(res.data))
          commit('updatePermissionList', menuRecursion(user.state.menus))
          commit('updateBtnPermissionList', res.permissions)
        }
      })
    }
  }
}

export default permission
