import HttpRequest from '@/utils/request'

// 查询列表
export function listType (params = {}) {
  return HttpRequest('/system/dict_type', 'get', params)
}

// 查询某一个
export function getType (id) {
  return HttpRequest('/system/dict_type/' + id, 'get')
}
