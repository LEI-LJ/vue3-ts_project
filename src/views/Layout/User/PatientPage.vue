<script setup lang="ts">
// import { ref } from 'vue'
// import cpNavbar from '@/components/cpNavbar.vue'
import type { PatientListType } from '@/types/user'
// const patientList = ref()
import { getPatientList } from '@/apis/user'
import { ref } from 'vue'

const PatientList = ref<PatientListType[]>()
const getData = async () => {
  PatientList.value = (await getPatientList()).data
  console.log(PatientList.value)
}
getData()
// const options = [
//   { label: '男', value: 1 },
//   { label: '女', value: 0 },
//   { label: '人妖', value: 2 }
// ]
// const gender = ref(1)
const show = ref(false)
</script>

<template>
  <div class="patient-page">
    <cpNavbar title="家庭档案"></cpNavbar>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in PatientList as PatientListType[]"
        :key="item.id"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$3')
          }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div class="tag">默认</div>
      </div>
      <div class="patient-add" v-if="PatientList ? PatientList.length < 6 : 0">
        <cp-icon name="user-add" @click="show = true" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- <cpRadioBtn
        :options="options"
        :modelValue="gender"
        @update:modelValue="gender = $event"
      ></cpRadioBtn> -->
    <!-- 添加患者弹层 -->
    <!-- 右侧弹出 -->
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <cpNavbar
        :back="() => (show = false)"
        title="添加患者"
        right-text="保存"
      ></cpNavbar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
