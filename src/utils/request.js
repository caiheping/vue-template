import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '../router'

axios.defaults.withCredentials = true // 跨域访问需要发送cookie时一定要加这句

// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(function (config) {
  store.state.app.requestTime = new Date().getTime()
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
function errorState (error) {
  // 隐藏loading
  store.state.app.loading = false
  console.log(error.response)

  let offset = 1
  switch (error.response.status) {
    case 400:
      for (const key in error.response.data.msg) {
        Message({
          type: 'error',
          offset: 40 * offset,
          message: error.response.data.msg[key]
        })
        offset++
      }
      break
    case 401:
      Message({
        type: 'error',
        message: error.response.data.msg
      })
      router.replace('/login')
      break
    case 403:
      Message({
        type: 'error',
        message: '拒绝访问'
      })
      break
    case 500:
      Message({
        type: 'error',
        message: error.response.data.msg
      })
      break
    default:
      Message({
        type: 'error',
        message: '服务器异常'
      })
      throw new Error('服务器异常')
  }
}

// 封装数据返回成功提示函数
function successState (response) {
  // 隐藏loading
  const timeInterval = new Date().getTime() - store.state.app.requestTime
  if (timeInterval < store.state.app.minLoading) {
    setTimeout(() => {
      store.state.app.loading = false
    }, store.state.app.minLoading)
  } else {
    store.state.app.loading = false
  }
  return response
}

// 封装axios
function HttpRequest (url, method = 'GET', params = {}, isLoading = true) {
  if (isLoading) {
    store.state.app.loading = true
  }
  // 设置token
  const token = sessionStorage.getItem('token')
  method = method.toUpperCase()
  const httpDefault = {
    method,
    baseURL: process.env.VUE_APP_BASE_API,
    url,
    headers: {
      withCredentials: true,
      token: token,
      'Content-Type': 'application/json; charset=utf-8'
    },
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 10000
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
