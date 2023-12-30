import type {
  ConsultOrderPreData,
  ConsultOrderPreParams,
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  PageParams,
  PartialConsult,
  TopDep
} from '@/types/consult'
import type { PatientListType } from '@/types/user'
import { myGet, myPost } from '@/utils/request'

export const getKnowledgeList = ({
  current,
  pageSize,
  type
}: {
  current: string | number
  pageSize: string | number
  type: string | number
}) =>
  myGet<KnowledgePage>('patient/home/knowledge', { current, pageSize, type })

export const getDoctorPage = (params: PageParams) =>
  myGet<DoctorPage>('/home/page/doc', params)

/*
  首页 , - 关注操作
*/

// export const switchFollow =

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  myPost('/like', { id, type })

// 拿到所有的科室

export const allDep = () => myGet<TopDep[]>('/dep/all')

// 上传图片

export const uploadImg = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return myPost<Image>('/upload', fd)
}

// 获得患者信息

export const PatientInfo = (id: string) =>
  myGet<PatientListType>(`patient/info/${id}`)
//获取支付界面的价格信息
export const orderPreInfo = (param: ConsultOrderPreParams) =>
  myGet<ConsultOrderPreData>('/patient/consult/order/pre', param)

// 生成订单
export const generateOrder = (data: PartialConsult) =>
  myPost<{ id: string }>('/patient/consult/order', data)
//支付接口
export const payInterface = ({
  paymentMethod,
  orderId,
  payCallback
}: {
  paymentMethod: string
  orderId: string
  payCallback: string
}) =>
  myPost<{
    payUrl: string
  }>('/patient/consult/pay', { paymentMethod, orderId, payCallback })
