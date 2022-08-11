import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// import $store from '@/store'

import { Modal } from 'ant-design-vue'
Vue.use(Modal)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  next()
  // console.log('router-beforeEach')
  // const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  // if (/^\/adminHome/.test(to.path) || /^\/adminDrive/.test(to.path)) {
  //   localStorage.clear()
  //   // 如果访问的是两个主入口：首页/领导驾驶舱
  //   const query = to.query || {}
  //   if (Object.keys(query).length > 0) {
  //     // const { userCode, userName, areaId, timestamp, signature } = query
  //     $store.dispatch('user/getUserInfo', query).then((res) => {
  //       // console.log('路由里的token接口res==', res)
  //       res ? next() : errModal('没有token或token失效')
  //     })
  //   } else {
  //     // url没有带参
  //     errModal('没有带参数或参数不正确，不能直接访问')
  //     return false
  //   }
  // } else {
  //   // 访问的是其他路径，比如机房画像
  //   if (userInfo && Object.keys(userInfo).length > 0) {
  //     next()
  //   } else {
  //     errModal('机房画像没有token')
  //   }
  // }
})

function errModal(msg) {
  Modal.confirm({
    title: '登录错误',
    content: msg || '您没有登录或者没有权限，请确定再访问',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    onCancel() {}
  })
}

export default router
