<script setup lang="ts">
import { allDep } from '@/apis/consult'
import { ref } from 'vue'
import type { TopDep } from '@/types/consult.ts'
const active = ref(0)
const list = ref<TopDep[]>([])
const getList = async () => {
  const res = await allDep()
  console.log(res.data)
  list.value = res.data
}
getList()
</script>

<template>
  <div class="consult-dep-page">
    <cpNavbar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
        />
        <!-- <van-sidebar-item title="外科" />
        <van-sidebar-item title="皮肤科" />
        <van-sidebar-item title="骨科" /> -->
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="item in list[active]?.child"
          :key="item.id"
          >{{ item.name }}</router-link
        >
        <!-- <router-link to="/consult/illness">科室二</router-link>
        <router-link to="/consult/illness">科室三</router-link> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
