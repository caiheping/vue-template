import { constantRoutes } from '@/router'
import { getRouters } from '@/api/system/menu'
import dynamicRouter from '@/router/dynamicRouter'

const permission = {
  state: {
    routes: [],
    menus: [],
    addRoutes: [],
    allRouterNames: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROUTER_NAME: (state, names) => {
      state.allRouterNames = names
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data).routes
          const accessedMenus = filterAsyncRouter(res.data).menus
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          commit('SET_MENUS', accessedMenus)
          // commit('SET_ROUTER_NAME', setRouterNames(this.state.permission.routes))
          resolve(accessedRoutes)
        })
      })
    }
  }
}

// 获取路由的name
// function setRouterNames (routers, names = []) {
//   routers.forEach(item => {
//     if (item.children) {
//       setRouterNames(item.children, names)
//     } else {
//       if (item.name) {
//         names.push(item.name)
//       }
//     }
//   })
//   return names
// }

// 遍历后台传来的路由，生成路由
function filterAsyncRouter (asyncRouterMap) {
  const routesObj = {}
  asyncRouterMap.forEach(item => {
    item.children = []
    item.component = dynamicRouter[item.component]
    routesObj[item.id] = item
  })
  const routes = []
  const menus = []
  asyncRouterMap.forEach(list => {
    const obj = {
      path: list.path,
      name: list.name,
      component: list.component,
      hidden: list.visible !== '0',
      children: list.children,
      meta: {
        title: list.title,
        menu_type: list.menu_type,
        icon: list.icon
      }
    }
    if (list.parentId !== 0) {
      routesObj[list.parentId].children.push(obj)
    } else {
      if (list.menu_type === 'RC') {
        routes.push({
          path: '/layout',
          name: list.name,
          component: dynamicRouter.Layout,
          hidden: list.visible !== '0',
          children: [obj],
          meta: {
            title: list.title,
            menu_type: list.menu_type,
            icon: list.icon
          }
        })
      } else {
        routes.push(obj)
      }
      menus.push(obj)
    }
  })
  return {
    routes,
    menus,
    routesObj
  }
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
