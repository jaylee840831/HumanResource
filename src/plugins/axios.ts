import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
// import { useI18n } from 'vue-i18n'
import { useNotify } from '@/composables/useNotify'

// const { t } = useI18n()
const router = useRouter()
const { notify } = useNotify()

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
  timeout: 10000, // 設定請求超時時間
})

// 在發送請求之前處理
api.interceptors.request.use(
  (config) => {
    // 添加token
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    // console.log('config', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 處理請求後的響應
api.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    return response
  },
  (error) => {
    notify('error', '錯誤', error)

    // 響應錯誤處理
    if (error.response) {
      // 401身分驗證錯誤處理
      if (error.response.status === 401) {
        localStorage.removeItem('access_token')
        router.push({ name: 'Login' })
      }
      // 錯誤狀態碼處理
      console.error('Response error: ', error.response.data)
    } else if (error.request) {
      // 無響應情況
      console.error('Request error: ', error.request)
    } else {
      // 請求設置錯誤
      console.error('Error: ', error.message)
    }
    return Promise.reject(error)
  }
)

export default api