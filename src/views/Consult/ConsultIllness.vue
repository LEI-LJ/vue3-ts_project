<script setup lang="ts">
import { ref } from 'vue'
import { useConsultStore } from '@/stores'
import { IllnessTime } from '@/enums'
import { uploadImg } from '@/apis/consult'
import type { ConsultIllness } from '@/types/consult'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { computed } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const fileList = ref<
  {
    url?: string
  }[]
>([])
const store = useConsultStore()
const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
// 上传图片
const afterRead: UploaderAfterRead = (item) => {
  console.log(item)
  if (Array.isArray(item)) return
  if (!item.file) return
  uploadImg(item.file)
    .then((res) => {
      item.status = 'done'
      // 删除图片的时候将返回的url给过去
      item.url = res.data.url
      item.message = undefined
      item.url = res.data.url
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
const onDelete: UploaderAfterRead = (file) => {
  if (Array.isArray(file)) return
  console.log(file)
  form.value.pictures = form.value.pictures?.filter(
    (item) => file.url !== item.url
  )
}
const router = useRouter()
// 下一步
const next = () => {
  //判断用户输入内容 , 如果不符合 ,给出提示
  if (!form.value.illnessDesc) return showToast('请输入描述')
  if (!form.value.illnessTime) return showToast('请选择时间')
  if (form.value.consultFlag === undefined) return showToast('请选择就诊情况')

  store.setIllness(form.value)
  router.push('/user/patient')
}

const disabled = computed(() => {
  if (
    !form.value.illnessDesc ||
    !form.value.illnessTime ||
    form.value.consultFlag == undefined
  ) {
    return true
  }
  return false
})
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      closeOnPopstate: false,
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？'
    })
      .then(() => {
        const { illnessDesc, illnessTime, consultFlag, pictures } =
          store.consult
        form.value = { illnessDesc, illnessTime, consultFlag, pictures }
        console.log(pictures)
        fileList.value = pictures || []
      })
      .catch(() => {
        // showToast()
      })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <cpNavbar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model:model-value="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cpRadioBtn
          :options="timeOptions"
          v-model:model-value="form.illnessTime"
        ></cpRadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cpRadioBtn
          :options="flagOptions"
          v-model:model-value="form.consultFlag"
        ></cpRadioBtn>
      </div>
      <!-- 上传图片 -->
      <div class="illness-img">
        <van-uploader
          upload-icon="photo-o"
          upload-text="上传图片"
          :after-read="afterRead"
          v-model:model-value="fileList"
          @delete="onDelete"
        ></van-uploader>
        <p class="tip" v-if="fileList.length <= 0">
          上传内容仅医生可见,最多9张图,最大5MB
        </p>
      </div>
      <!-- 按钮 -->
      <van-button :class="{ disabled }" @click="next" type="primary" block round
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
