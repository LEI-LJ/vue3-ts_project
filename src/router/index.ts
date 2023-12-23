import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

// history 用来控制路由模式
// createWebHistory history模式
// createWebHashHistory hash模式
console.log(import.meta)
const router = createRouter({
  // vue3 中修改路由模式 通过createWbeHistory()  createWebHashHistory()
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Layout/Home/index.vue')
        },
        {
          path: '/article',
          component: () => import('@/views/Layout/Article/index.vue')
        },
        {
          path: '/notify',
          component: () => import('@/views/Layout/Notify/index.vue')
        },

        {
          path: '/user',
          component: () => import('@/views/Layout/User/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
