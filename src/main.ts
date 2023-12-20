import { createApp } from 'vue'
import pinia from './stores'
import 'vant/lib/index.css'
import '@/styles/main.scss'
// 将出错信息显示在页面上
import App from './App.vue'
import router from './router'
const app = createApp(App)
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
//
app.mount('#app')
