import { createApp } from 'vue'
import '@/style.scss'
import '@/assets/tailwind.css' // 引入 Tailwind CSS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import "bootstrap-icons/font/bootstrap-icons.css"
import router from '@/router'
import App from './App.vue'
import i18n from '@/composables/useI18n'

const app = createApp(App)
app.use(router) // vue router
app.use(i18n)
app.use(ElementPlus, { zIndex: 10000 })
app.use(createPinia())
app.mount('#app')
