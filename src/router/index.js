import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
// import store from '../store/index'
// import { pagePermission } from '../utils/permission'

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const _import = require('./_import_' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: _import('user/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: _import('errorPage/401'),
    meta: {
      title: '401'
    }
  },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 路由导航钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  next()
  // 先判断是否为登录，登录了才能获取到权限
  // if (JSON.parse(sessionStorage.getItem('isLogin'))) {
  //   try {
  //     // 这里获取 permissionList
  //     await store.dispatch('getPermissionList')
  //     // 这里判断当前页面是否需要权限(如果路由有写name属性就代表需要权限)
  //     const permissions = to.name
  //     if (permissions) {
  //       const hasPermission = pagePermission(permissions)
  //       // 判断是否有页面权限，没有就跳到401页面
  //       if (!hasPermission) next({ path: '/401', replace: true })
  //     }
  //     next()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // } else {
  //   if (to.path === '/login') {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
