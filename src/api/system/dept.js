import HttpRequest from '@/utils/request'

// 查询列表
export function treeselect (params = {}) {
  return HttpRequest('/system/allDepartment', 'get', params)
}
