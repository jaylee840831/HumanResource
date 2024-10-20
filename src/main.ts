import { createApp } from 'vue'
import '@/style.css'
import '@/assets/tailwind.css' // 引入 Tailwind CSS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'

const app = createApp(App)
app.use(router) // vue router
app.use(ElementPlus, { zIndex: 10000 })
app.use(createPinia())
app.mount('#app')
