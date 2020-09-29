export default {
  Layout: () => import('@/views/layout'),
  Home: () => import('@/views/home'),
  User: () => import('@/views/system/user'),
  Role: () => import('@/views/system/role'),
  Notice: () => import('@/views/system/notice'),
  Menu: () => import('@/views/system/menu'),
  Dict: () => import('@/views/system/dict'),
  Dept: () => import('@/views/system/dept')
}
