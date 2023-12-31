// 1. 导入组件实例
import cpNavbar from '@/components/cpNavbar.vue'
import cpIcon from '@/components/cpIcon.vue'
import type cpRadioBtn from '@/components/cpRadioBtn.vue'
// 2. 声明 vue 类型模块
declare module 'vue' {
  // 3. 给 vue  添加全局组件类型，interface 和之前的合并
  interface GlobalComponents {
    // 4. 定义具体组件类型，typeof 获取到组件实例类型
    // typeof 作用是得到对应的TS类型
    cpNavbar: typeof cpNavbar
    cpIcon: typeof cpIcon
    cpRadioBtn: typeof cpRadioBtn
  }
}
