import HttpRequest from '@/utils/request'

// 获取路由
export function getRouters (params = {}) {
  return HttpRequest('/menu', 'get', params)
}
