import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  PageParams,
  SubDep,
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
