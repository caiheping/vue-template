import HttpRequest from '@/utils/request'

// 查询列表
export function listUser (params = {}) {
  return HttpRequest('/user', 'get', params)
}

// 查询某个用户
export function getUser (id) {
  console.log(id)
  return HttpRequest('/user/' + id, 'get')
}

// 删除
export function delUser (params = {}) {
  return HttpRequest('/user', 'delete', params)
}

// 新增
export function addUser (params = {}) {
  return HttpRequest('/user', 'post', params)
}

// 修改
export function updateUser (params = {}) {
  return HttpRequest('/user', 'put', params)
}

// 导出
export function exportUser (params = {}) {
  return HttpRequest('/user/export', 'get', params)
}

// 重置密码
export function resetUserPwd (userId, params = {}) {
  return HttpRequest(`/user/${userId}/resetPwd`, 'post', params)
}

// 用户状态修改
export function changeUserStatus (userId, params = {}) {
  return HttpRequest(`/user/${userId}/updateStatus`, 'put', params)
}

// 导出模板
export function importTemplate (params = {}) {
  return HttpRequest('/user/import', 'get', params)
}
