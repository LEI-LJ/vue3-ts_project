<script setup lang="ts">
// import { ref } from 'vue'
// import cpNavbar from '@/components/cpNavbar.vue'
import type { PatientListType } from '@/types/user'
import { nameRules, idCardRules } from '@/utils/rules'
import {
  addPatient,
  getPatientList,
  editPatient,
  deletePatient
} from '@/apis/user'
import { useConsultStore } from '@/stores'
import { ref, computed } from 'vue'
import type { FormInstance } from 'vant'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
const store = useConsultStore()
const PatientList = ref<PatientListType[]>()
const patientId = ref<string>()
const getData = async () => {
  PatientList.value = (await getPatientList()).data
  console.log(PatientList.value)
  PatientList.value.forEach((item) => {
    if (item.defaultFlag === 1) {
      patientId.value = item.id
    }
  })
}
getData()
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
  { label: '人妖', value: 2 }
]
// const gender = ref(1)
const show = ref(false)

const patient = ref<PatientListType>({
  defaultFlag: 0,
  gender: 1,
  id: '',
  idCard: '',
  name: ''
})
const defaultFlag = computed({
  get: () => patient.value.defaultFlag,
  set: (v) => {
    console.log(v)
    // 重新将 1 或者是 0 返回过去
    patient.value.defaultFlag = v ? 1 : 0
  }
})
const form = ref<FormInstance>()
const onSubmit = async () => {
  // 不能放字符串
  await form.value?.validate()
  console.log('-----校验通过----')
  // 拿身份证倒数第二位
  if (+patient.value.idCard.slice(-2, -1) % 2 !== patient.value.gender) {
    await showConfirmDialog({
      title: '提示',
      message: '填写的性别和身份证号中的不一致\n您确认提交吗?'
    })
  }
  if (patient.value.id) {
    await editPatient(patient.value)
  } else {
    await addPatient(patient.value)
  }
  show.value = false
  await getData()
}

const showPopup = (item?: PatientListType) => {
  if (item) {
    // 有item就是编辑
    console.log(item)
    const { defaultFlag, id, gender, idCard, name } = { ...item }
    patient.value = { defaultFlag, gender, id, idCard, name }
  } else {
    patient.value = {
      defaultFlag: 0,
      gender: 1,
      idCard: '',
      name: ''
    }
  }
  show.value = true
}
const onDeletePatient = async () => {
  await deletePatient(patient.value.id as string)
  showSuccessToast('删除成功')
  show.value = false
  getData()
}
const route = useRoute()
const router = useRouter()
// console.log(route)
const isChange = computed(() => {
  return route.query.isChange
})
const next = () => {
  if (!patientId.value) return showToast('请选就诊择患者')
  store.setPatient(patientId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cpNavbar :title="isChange ? '选择患者' : '家庭档案'"></cpNavbar>
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        :class="{ selected: patientId === item.id }"
        v-for="item in PatientList"
        :key="item.id"
        @click="patientId = item.id"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2')
          }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit" @click.stop="showPopup(item)" />
        </div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>
      <div
        class="patient-add"
        v-if="!PatientList?.length || PatientList?.length < 6"
        @click="showPopup()"
      >
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 底部按钮 -->
    <div class="patient-next" v-if="isChange" @click="next">
      <van-button type="primary" round block>下一步</van-button>
    </div>
    <van-popup v-model:show="show" position="right">
      <cpNavbar
        :back="() => (show = false)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="onSubmit"
      ></cpNavbar>
      <van-form autocomplete="off" ref="form">
        <van-field
          label="真实姓名"
          placeholder="请输入真实姓名"
          v-model="patient.name"
          :rules="nameRules"
        />
        <van-field
          label="身份证号"
          placeholder="请输入身份证号"
          v-model="patient.idCard"
          :rules="idCardRules"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cpRadioBtn
              :options="options"
              v-model="patient.gender"
            ></cpRadioBtn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <!-- 底部 -->
      <van-action-bar v-if="patient.id">
        <van-action-bar-button text="删除" @click="onDeletePatient" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
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
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
