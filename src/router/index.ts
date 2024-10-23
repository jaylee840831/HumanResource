import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import MissionList from '@/views/MissionList.vue'
import MissionCreate from '@/views/MissionEdit.vue'
import MissionEdit from '@/views/MissionEdit.vue'
import User from '@/views/UserPage.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import NotifySetting from '@/views/NotifySetting.vue'

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
    path: '/setting/account',
    name: 'AccountSetting',
    component: AccountSetting
  },
  {
    path: '/setting/notify',
    name: 'NotifySetting',
    component: NotifySetting
  },
  {
    path: '/mission/list',
    name: 'MissionList',
    component: MissionList
  },
  {
    path: '/mission/create',
    name: 'MissionCreate',
    component: MissionCreate
  },
  {
    path: '/mission/edit',
    name: 'MissionEdit',
    component: MissionEdit
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router