import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './routes'

import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
  window.scroll(0, 0)
}
)

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')

