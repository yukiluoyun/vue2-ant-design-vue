import axios from 'axios'
import { message, Modal } from 'ant-design-vue'

const baseUrl =
  process.env.VUE_APP_MOCK === 'TRUE' ? '' : process.env.VUE_APP_BASEURL //对照.env.development
console.log('process.env.VUE_APP_MOCK ==', process.env.VUE_APP_MOCK)
console.log('baseUrl ==', baseUrl)
const http = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})
const httpZx = axios.create({
  baseURL: process.env.VUE_APP_BASEURL_ZX,
  timeout: 50000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})
const httpMap = axios.create({
  baseURL: process.env.VUE_APP_MAP,
  timeout: 50000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    // if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (res) => {
    // console.log('interceptors.responseaaa==', res)
    const { data } = res
    if (res.status === 200) {
      console.log('interceptors-data==', data)
      return Promise.resolve(data)
    } else if (data.code === 101) {
      Modal.confirm({
        title: '提示',
        content: '您的token已失效，请重新登录',
        maskClosable: false,
        closable: false,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk: () => {
          localStorage.removeItem('token')
          location.reload()
        },
        onCancel() {}
      })
      return Promise.reject(data.data)
    } else {
      message.warning({
        content:
          data.msg + 'interceptors.js ' || data.message + '--interceptors.js'
      })
      return Promise.reject(data)
    }
  },
  (error) => {
    let status = ''
    if (error.request) {
      status = error.request
    } else if (error.response) {
      status = error.response
    }

    if (status) {
      switch (status.status) {
        case 500:
          error.message = '服务器错误（500）'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    }

    return Promise.reject(error)
  }
)
export { http, httpZx, httpMap }
