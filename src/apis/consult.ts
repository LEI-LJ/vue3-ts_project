import type {
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  PageParams,
  TopDep
} from '@/types/consult'
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
export const setIllnessDesc = () => {}
