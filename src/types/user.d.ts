// 用户信息
export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id: string
  /** 用户名称 */
  account: string
  /** 手机号 */
  mobile: string
  /** 头像 */
  avatar: string
}

// 验证码类型
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'
// Omit<User,'token'> 从user中剔除token 返回一个新的类型
// Omit 的作用就是从一个类型中 剔除一项 是泛型的第二个参数
type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

type Person = {
  name: string
  age: number
  gender: '男' | '女'
}
// 从其中拿到某一类型
type PickPerson = Pick<Person, 'gender'>
