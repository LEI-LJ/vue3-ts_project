<script setup lang="ts">
import { useRouter } from 'vue-router'
const prop = defineProps<{
  title?: string
  rightText?: string
}>()
// 触发右键点击事件
const emits = defineEmits<{ (e: 'click-right'): void }>()
// 添加右侧属性和事件
const clickRight = () => {
  // 如果没有右侧文字就不触发事件
  if (!prop.rightText) return
  emits('click-right')
}
const router = useRouter()
const clickLeft = () => {
  if (history.state.back) {
    console.log(history)
    // console.log(useRouter())
    console.log()
    router.back()
    router.back()
  } else {
    useRouter().push('/me')
  }
}
</script>

<template>
  <div class="cpNavar-page">
    <van-nav-bar
      fixed
      :title="title"
      @click-left="clickLeft"
      @click-right="clickRight"
      :right-text="rightText"
      left-arrow
    />
  </div>
</template>

<style lang="scss" scoped>
/* :deep() */
:deep() {
  .van-icon-arrow {
    &-left {
      color: var(--cp-text1);
    }
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
