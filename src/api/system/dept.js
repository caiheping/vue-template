import HttpRequest from '@/utils/request'

// 查询列表
export function treeselect (params = {}) {
  return HttpRequest('/allDepartment', 'get', params)
}
