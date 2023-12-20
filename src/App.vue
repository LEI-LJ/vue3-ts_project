<template>
  <div>
    <vanButton type="primary">你好</vanButton>
    <button
      @click="
        userStore.setUser({
          token: 'token',
          id: '1121',
          account: '1212',
          mobile: '1212',
          avatar: '1212'
        })
      "
    >
      登录
    </button>
    <button @click="userStore.delUser()">退出</button>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from './stores/user'
import { useUserStore } from './stores'
// 模拟登录按钮
const userStore = useUserStore()
// const handleClick = () => {}
</script>
<style scoped></style>
