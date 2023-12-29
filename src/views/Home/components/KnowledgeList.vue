<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { getKnowledgeList } from '@/apis/consult'
import type { Knowledge, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { ref } from 'vue'
// import KnowledgeCard from './KnowledgeCard.vue'
//数据加载状态 true 代表正在加载不能加载 false 代表没有加载可以加载
const props = defineProps<{
  type: KnowledgeType
}>()

const loading = ref(false)
const finished = ref(false)
const list = ref<Knowledge[]>([])
const queryParams = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
// finished false 代表还有数据
const getList = async () => {
  const res = await getKnowledgeList(queryParams.value)
  // console.log(res)
  list.value.push(...res.data.rows)
  queryParams.value.current++
  // console.log(res)
  if (queryParams.value.current > res.data.pageTotal) {
    finished.value = true
  }
}
const onLoad = async () => {
  loading.value = true
  await getList()
  loading.value = false
}
getList()
</script>

<template>
  <div class="knowledge-list">
    <!-- <knowledge-card v-for="i in 5" :key="i"></knowledge-card> -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard
        v-for="item in list"
        :key="item.id"
        :knowledge="item"
      ></KnowledgeCard>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
