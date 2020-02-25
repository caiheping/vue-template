import HttpRequest from '../utils/request'

// 获取菜单
export function menuNav (query = {}) {
  return HttpRequest('/sys/menu/nav', 'GET', query)
}
