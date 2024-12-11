import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import MissionList from '@/views/MissionList.vue'
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
    name: 'Mission',
    component: AppLayout,
    meta: {
      title: '任務',
      show: true,
      requiresAuth: true
    },
    children: [
      {
        path: '/mission/list',
        name: 'MissionList',
        component: MissionList,
        meta: {
          title: '任務列表',
          show: true,
          requiresAuth: true
        }
      },
      {
        path: '/mission/create',
        name: 'MissionCreate',
        component: MissionEdit,
        meta: {
          title: '建立任務',
          show: true,
          requiresAuth: true
        }
      },
      {
        path: '/mission/edit',
        name: 'MissionEdit',
        component: MissionEdit,
        meta: {
          title: '編輯任務',
          show: false,
          requiresAuth: true
        }
      },
      {
        path: '/mission/mine',
        name: 'MissionMine',
        component: AppLayout,
        meta: {
          title: '我的任務',
          show: false,
          requiresAuth: true
        },
        children: [
          {
            path: '/mission/deploy',
            name: 'MissionDeploy',
            component: MissionList,
            meta: {
              title: '已發布任務',
              show: true,
              requiresAuth: true
            }
            // children: [
            //   {
            //     path: '/mission/hihi',
            //     name: 'MissionHIHI',
            //     component: MissionList,
            //     meta: {
            //       title: '測試',
            //       show: true
            //     }
            //   }
            // ]
          },
          {
            path: '/mission/store',
            name: 'MissionStore',
            component: MissionEdit,
            meta: {
              title: '已儲存任務',
              show: true,
              requiresAuth: true
            }
          },
          {
            path: '/mission/apply',
            name: 'MissionDeploy',
            component: MissionEdit,
            meta: {
              title: '已應徵任務',
              show: true,
              requiresAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '用戶資料',
      show: true,
      requiresAuth: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: AppLayout,
    meta: {
      title: '設定',
      show: true,
      requiresAuth: true
    },
    children: [
      {
        path: '/setting/account',
        name: 'AccountSetting',
        component: AccountSetting,
        meta: {
          title: '帳號設定',
          show: true,
          requiresAuth: true
        }
      },
      {
        path: '/setting/notify',
        name: 'NotifySetting',
        component: NotifySetting,
        meta: {
          title: '通知設定',
          show: true,
          requiresAuth: true
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

function isTokenValid(token: string) {
  try {
    // 解析 JWT Payload
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = JSON.parse(atob(base64))
    // console.log(jsonPayload)

    // 獲取過期時間 (exp)
    const expirationTime = jsonPayload.exp

    // 目前的時間 (秒數)
    const currentTime = Math.floor(Date.now() / 1000)
    
    // 比較過期時間與當前時間
    return expirationTime > currentTime
  } catch (error) {
    console.error("Invalid JWT token", error)
    return false
  }
}

router.beforeEach((to, _from, next) => {
  // 路由需要token驗證, login和register除外
  if (to.meta.requiresAuth) {
    const accessToken = window.localStorage.getItem('access_token')

    if (accessToken) {
      if (isTokenValid(accessToken)) {
        next() // 允許進入
      } else {
        localStorage.removeItem('access_token')
        next({ name: 'Login' })
      }
    } else {
      localStorage.removeItem('access_token')
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router