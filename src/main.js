// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueCookies from 'vue-cookie'
import qs from 'qs'
import * as echarts from 'echarts';


// 引入vuex-store

axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(axios)
Vue.use(VueCookies)

// 判断访问路径是否需要登录
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      // 判断store中是否存储了staff的信息，若存在则放行，否则跳转到登录界面
      if (this.$cookie.get('name')) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
