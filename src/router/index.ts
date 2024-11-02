import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import MissionList from '@/views/MissionList.vue'
import MissionCreate from '@/views/MissionEdit.vue'
import MissionEdit from '@/views/MissionEdit.vue'
import User from '@/views/UserPage.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import AppLayout from '@/views/AppLayout.vue'
import NotifySetting from '@/views/NotifySetting.vue'

// 定義路由的型別
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Login,
    meta: {
      title: '',
      show: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '',
      show: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '',
      show: false
    }
  },
  {
    path: '/mission',
    name: '',
    component: AppLayout,
    meta: {
      title: '任務',
      show: true
    },
    children: [
      {
        path: '/mission/list',
        name: 'MissionList',
        component: MissionList,
        meta: {
          title: '任務列表',
          show: true
        }
      },
      {
        path: '/mission/create',
        name: 'MissionCreate',
        component: MissionCreate,
        meta: {
          title: '建立任務',
          show: true
        }
      },
      {
        path: '/mission/edit',
        name: 'MissionEdit',
        component: MissionEdit,
        meta: {
          title: '編輯任務',
          show: false
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '用戶資料',
      show: true
    }
  },
  {
    path: '/setting',
    name: '',
    component: AppLayout,
    meta: {
      title: '設定',
      show: true
    },
    children: [
      {
        path: '/setting/account',
        name: 'AccountSetting',
        component: AccountSetting,
        meta: {
          title: '帳號設定',
          show: true
        }
      },
      {
        path: '/setting/notify',
        name: 'NotifySetting',
        component: NotifySetting,
        meta: {
          title: '通知設定',
          show: true
        }
      }
    ]
  }
]

export function getRouter() {
  return routes
}

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router