import '@/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 将出错信息显示在页面上
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
