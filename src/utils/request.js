import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '../router'
import { baseUrl } from './config'

axios.defaults.withCredentials = true // 跨域访问需要发送cookie时一定要加这句

// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(function (config) {
  store.state.common.requestTime = new Date().getTime()
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (response) {
  // 隐藏loading
  store.state.common.loading = false
  Message({
    type: 'error',
    message: '服务器连接失败'
  })
  throw new Error('服务器连接失败')
}

// 封装数据返回成功提示函数
function successState (response) {
  // 隐藏loading
  const timeInterval = new Date().getTime() - store.state.common.requestTime
  if (timeInterval < store.state.common.minLoading) {
    setTimeout(() => {
      store.state.common.loading = false
    }, store.state.common.minLoading)
  } else {
    store.state.common.loading = false
  }
  // 登录超时
  if (response.code && response.code === 401) {
    // 清楚登录标记
    sessionStorage.setItem('isLogin', false)
    if (document.title !== '登录') {
      Message({
        type: 'error',
        message: response.message
      })
    }
    document.title = '登录'
    router.replace('/login')
    return response
  }
  // 如果code不等于0，提示错误信息
  if (response.code && response.code !== 0) {
    Message({
      type: 'error',
      message: response.message
    })
  }
  return response
}

// 封装axios
function HttpRequest (url, method = 'GET', params = {}, isLoading = true) {
  if (isLoading) {
    store.state.common.loading = true
  }
  // 设置token
  const token = sessionStorage.getItem('token')
  method = method.toUpperCase()
  const httpDefault = {
    method: method,
    url: baseUrl + url,
    headers: {
      withCredentials: true,
      token: token,
      operating_system: store.state.common.operating_system,
      version_name: store.state.common.version_name,
      'Content-Type': 'application/json; charset=utf-8'
    },
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 60000
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault).then((response) => {
      successState(response)
      resolve(response)
    }).catch((response) => {
      errorState(response)
      reject(response)
    })
  })
}

export default HttpRequest
