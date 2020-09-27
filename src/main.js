import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import i18n from '@/lang' // 国际化

import { httpResponse } from './utils/httpResponse'
import { btnPermission, includePermission } from './utils/permission'
import Pagination from '@/components/Pagination'
import { resetForm, handleTree } from '@/utils/base'
import { getDicts } from '@/api/system/dict/data'

import './permission' // permission control
import 'nprogress/nprogress.css' // progress bar style
// import 'element-ui/lib/theme-chalk/index.css'
import './static/styles/element-variables.scss' // 自定义主题色
import './static/styles/index.scss'

import '@/static/icons'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$httpResponse = httpResponse
Vue.prototype.resetForm = resetForm // 重置表单
Vue.prototype.getDicts = getDicts // 获取字典
Vue.prototype.checkBtnPermission = btnPermission // 检查方法权限
Vue.prototype.includePermission = includePermission // 检查方法列表权限
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('Pagination', Pagination)

// 按钮权限
// Vue.directive('permission', {
//   inserted: function (el, bind) {
//     const value = bind.value
//     const permissionArr = store.state.permission.btnsPermissionList
//     if (!permissionArr.includes(value)) {
//       el.parentNode.removeChild(el)
//     }
//   }
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
