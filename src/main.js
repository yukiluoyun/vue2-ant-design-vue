import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/style/common.scss'
import { registerAntDesign } from '@/plugins/antDesign'
import { http } from '@/utils/interceptors.js'

import '@/plugins/vEchart'
import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import '@/plugins/flexible.js'
import animated from 'animate.css'
Vue.use(animated)

import vueWaves from '@/plugins/wave.js'
Vue.use(vueWaves)

if (process.env.VUE_APP_MOCK === 'TRUE') {
  require('./mock')
}

// import 'default-passive-events' //解决一个黄色警示报错： Added non-passive event listener to a scroll-blocking <某些> 事件. Consider marking event handler as 'passive' to make the page more responsive. See <URL>

Vue.config.productionTip = false
Vue.prototype.$http = http

registerAntDesign(Vue)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
