import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from './static/js/elementConfig'

import { httpResponse } from './utils/httpResponse'
import { btnPermission, includePermission } from './utils/permission'

import 'nprogress/nprogress.css' // progress bar style
// import 'element-ui/lib/theme-chalk/index.css'
import './static/styles/element-variables.scss' // 自定义主题色
import './static/styles/index.scss'

import '@/static/icons'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$httpResponse = httpResponse

Vue.prototype.checkBtnPermission = btnPermission // 检查方法权限
Vue.prototype.includePermission = includePermission // 检查方法列表权限

// 按钮权限
Vue.directive('permission', {
  inserted: function (el, bind) {
    console.log(el)
    const value = bind.value
    const permissionArr = store.state.permission.btnsPermissionList
    if (!permissionArr.includes(value)) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
