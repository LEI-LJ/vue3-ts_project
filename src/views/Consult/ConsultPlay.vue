<script setup lang="ts">
import {
  PatientInfo,
  orderPreInfo,
  generateOrder,
  payInterface
} from '@/apis/consult'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { PatientListType } from '@/types/user'
import { showToast } from 'vant'
import { ref } from 'vue'
const store = useConsultStore()
const preInfo = ref<ConsultOrderPreData>()
const patientInfo = ref<PatientListType>()
const getData = () => {
  getPreInfo()
  getPatientInfo()
}
const getPreInfo = async () => {
  preInfo.value = (
    await orderPreInfo({
      type: store.consult.type,
      illnessType: store.consult.illnessType
    })
  ).data
}
const getPatientInfo = async () => {
  patientInfo.value = (
    await PatientInfo(store.consult.patientId as string)
  ).data
}
getData()
const show = ref(false)
const agree = ref(false)
const isWeixin = ref('0')

const submit = async () => {
  if (!agree.value) return showToast('请勾选支付协议!')
  if (isWeixin.value === '0') return showToast('当前不支持这个方式支付!')
  const orderId = (await generateOrder(store.consult)).data.id
  console.log(orderId)
  // console.log()
  const resUrl = await payInterface({
    orderId,
    payCallback: 'http://127.0.0.1:5173/room',
    paymentMethod: isWeixin.value
  })
  store.clear()
  location.href = resUrl.data.payUrl
}
</script>

<template>
  <div class="consult-pay-page" v-if="preInfo && patientInfo">
    <cp-navbar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ preInfo?.actualPayment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" value="-¥10.00" />
      <van-cell title="积分抵扣" value="-¥10.00" />
      <van-cell title="实付款" value="¥29.00" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell title="患者信息" value="李富贵 | 男 | 30岁"></van-cell>
      <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model:model-value="agree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :price="preInfo.actualPayment * 100"
      @click="show = true"
      button-text="立即支付"
      text-align="left"
    />
    <van-action-sheet v-model:show="show" title="选择支付方式">
      <div class="pay-type">
        <p class="amount">￥20.00</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="isWeixin = '0'">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra
              ><van-checkbox :model-value="isWeixin === '0'"
            /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="isWeixin = '1'">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra
              ><van-checkbox :model-value="isWeixin === '1'"
            /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button @click="submit" type="primary" round block
            >立即支付</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
  <div v-else>
    <van-skeleton title :row="13" />
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
