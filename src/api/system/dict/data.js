import HttpRequest from '@/utils/request'

// 查询字典数据列表
export function listData (params) {
  return HttpRequest('/system/dict_data', 'get', params)
}

// 查询字典数据详细
export function getData (dictCode) {
  return HttpRequest('/system/dict_data', 'get', dictCode)
}

// 根据字典类型查询字典数据信息
export function getDicts (dictType) {
  return HttpRequest('/system/dict_data/' + dictType, 'get')
}

// 新增字典数据
export function addData (params) {
  return HttpRequest('/system/dict_data', 'post', params)
}

// 修改字典数据
export function updateData (params) {
  return HttpRequest('/system/dict_data', 'put', params)
}

// 删除字典数据
export function delData (ids) {
  return HttpRequest('/system/dict_data/' + ids, 'delete')
}

