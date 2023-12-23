<script setup lang="ts">
import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
import { showToast, type FormInstance } from 'vant'
import { ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
import { CodeLogin, login, sendMobileCode } from '@/apis/user'
// const text = ref('1212')
// const inputRef = ref(null)
// nextTick(() => {
//   console.log(inputRef.value)
// })
const formRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const mobile = ref('13230000006')
const password = ref('abc12345')
const code = ref('')
const agree = ref(false)
// 切换登录
const isPass = ref(true)
//判断是否发送验证码
const isCode = ref(false)
const downLoad = ref(0)
const timeId = ref(0)
// 提交表单

const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选用户协议')
  console.log(router, route)

  // 账号密码登录
  const res = isPass.value
    ? await login({ mobile: mobile.value, password: password.value })
    : await CodeLogin({ mobile: mobile.value, code: code.value })
  console.log(res.data)
  userStore.setUser(res.data)

  router.replace({ path: (route.query.redirect as string) || '/' })
}

// 发送验证码
const sendCode = async () => {
  await formRef.value?.validate('mobile')
  if (downLoad.value > 0) return showToast('验证码正在发送')
  const res = await sendMobileCode({ mobile: mobile.value, type: 'login' })
  console.log(res.data.code)
  code.value = res.data.code
  showToast('验证码发送成功')
  if (!isCode.value) {
    downLoad.value = 60
    isCode.value = true
    timeId.value = setInterval(() => {
      if (downLoad.value <= 0) {
        clearInterval(timeId.value)
        isCode.value = false
      }
      downLoad.value--
    }, 1000)
  }
}
onUnmounted(() => {
  clearInterval(timeId.value)
})
const show = ref(false)
</script>

<template>
  <div class="login-page">
    <cpNavbar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cpNavbar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }} </span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form ref="formRef" autocomplete="off" @submit="onSubmit">
      <van-field
        placeholder="请输入手机号"
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        type="tel"
      ></van-field>
      <van-field
        placeholder="请输入密码"
        v-model="password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        v-if="isPass"
      >
        <template #button>
          <cpIcon
            @click="show = !show"
            style="margin-right: 10px"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cpIcon>
        </template>
      </van-field>
      <van-field
        v-else
        :placeholder="'请输入验证码'"
        v-model="code"
        :rules="codeRules"
        type="password"
      >
        <template #button>
          <span @click="sendCode" class="btn-send">{{
            downLoad > 0 ? downLoad : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->

    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
