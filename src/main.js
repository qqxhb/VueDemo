import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './system/vuex/store'
import Content from './content.vue'
import Interaction from './interaction.vue'
import System from './system.vue'
import SystemMenu from './system/menu.vue'
import SystemRole from './system/role.vue'
import SystemUser from './system/user.vue'
import SystemInfo from './system/userInfo.vue'
import App from './App.vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)
const routes = [
  {
    path: '/content',
    component: Content
  },
  {
    path: '/interaction',
    component: Interaction
  },
  {
    path: '/system',
    redirect: '/system/user',
    component: System,
    children: [
      {
        path: 'menu',
        component: SystemMenu
      },
      {
        path: 'role',
        component: SystemRole
      },
      {
        path: 'user',
        name:'SystemUser',
        component: SystemUser
      },
      {
        path: 'info',
        name:'SystemInfo',
        component: SystemInfo
      }
    ]
  },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
})
