import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/LoginPage.vue'
import MissionList from '../views/MissionList.vue'

// 定義路由的型別
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mission-list',
    name: 'MissonList',
    component: MissionList
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router