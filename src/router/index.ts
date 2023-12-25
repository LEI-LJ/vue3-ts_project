import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
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
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Layout/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          component: () => import('@/views/Layout/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          component: () => import('@/views/Layout/Notify/index.vue'),
          meta: {
            title: '消息中心'
          }
        },

        {
          path: '/user',
          component: () => import('@/views/Layout/User/index.vue'),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录'
      }
    }
  ]
})
router.beforeEach((to) => {
  // 判断 有没有登录 如果没有登录就跳转到登录界面
  // 没有登录也能访问的界面就是白名单
  // console.log('----from----', from)
  // console.log('---to-----', to)
  const whiteList = ['/login']
  if (!useUserStore().user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
})
router.afterEach((to) => {
  console.log('---to---', to)
  document.title = `${to.meta.title || ''}优医问诊`
})
export default router
