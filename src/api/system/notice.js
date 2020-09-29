import HttpRequest from '@/utils/request'

// 获取路由
export function listNotice (params = {}) {
  return HttpRequest('/system/notice', 'get', params)
}
