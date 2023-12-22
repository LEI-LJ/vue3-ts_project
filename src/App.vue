<template>
  <div>
    <van-button type="primary">你好</van-button>
    <button @click="handleClick">登录</button>

    <button @click="userStore.delUser()">退出</button>
    <div
      @click="
        async () => {
          userStore.delUser()
          const res = await text401()
          console.log(res)
        }
      "
    >
      测试401错误
    </div>
    <button
      @click="
        () => {
          arr[1] = 0
        }
      "
    >
      改变数组中的数字
    </button>
    <span v-for="(item, index) in arr" :key="index">
      {{ item }}
    </span>
  </div>
  <div @click="handleNumClick">数字点击</div>
</template>

<script setup lang="ts">
// import { useUserStore } from './stores/user'
import { ref, watch } from 'vue'
import { useUserStore } from './stores'
import { login, text401 } from './apis/login'
const arr = ref([1, 2, 3])
// 模拟登录按钮
const userStore = useUserStore()
type ResponseType<T> = {
  code: number
  data: T
}

const handleClick = async () => {
  userStore.setUser({
    token: 'token 121212',
    id: '1121',
    account: '1212',
    mobile: '1212',
    avatar: '1212'
  })
  const res = await login<ResponseType>({
    mobile: 13210090581,
    password: '121212'
  })
  console.log(res.data)
}
let a = {
  num: 1
}

const handleNumClick = () => {
  a.num = 4
}
watch(
  () => a,
  () => {
    console.log('我发生改变了')
  },
  { deep: true }
)
</script>
<style scoped></style>
