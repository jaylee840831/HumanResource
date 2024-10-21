import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import MissionList from '@/views/MissionList.vue'
import User from '@/views/UserPage.vue'

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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User
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