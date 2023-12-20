<template>
  <div>
    <vanButton type="primary">你好</vanButton>
    <button @click="handleClick">登录</button>

    <button @click="userStore.delUser()">退出</button>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from './stores/user'
import { ref } from 'vue'
import { useUserStore } from './stores'
import { login } from './apis/login'
const value1 = ref(0)
const value2 = ref('a')
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
]

// 模拟登录按钮
const userStore = useUserStore()
const handleClick = async () => {
  userStore.setUser({
    token: 'token',
    id: '1121',
    account: '1212',
    mobile: '1212',
    avatar: '1212'
  })
  const res = await login({ mobile: 13210090581, password: '121212' })
  console.log(res)
}
</script>
<style scoped></style>
