import request from './request.js'
import qs from 'qs'

//手机号码登录，获取验证码
export const getsmsAPI = parmas => request.post("/sendSMS", qs.stringify(parmas))

//手机号登录
export const phoneloginAPI = (parmas) => request.post("/phoneRegin", qs.stringify(parmas))

//微信登录
export const weixinloginAPI = (parmas) => request.post("/wechatUsers/PCLogin", qs.stringify(parmas))

//微信登录绑定手机号
export const bindteleAPI = (parmas) => request.post("/wechatUsers/binding", qs.stringify(parmas))

//用户信息
export const userinfoAPI = () => request.get("/shop/userProfiles")

//商品推荐
export const storeintroAPI = () => request.get("/products/recommend")

// 商品搜索
export const searchgoodAPI = (params) => request.get("/products", { params: params })

// 热门兑换
export const hotexchangeAPI = () => request.get("/products/hot")

// 商品详情
export const detailsAPI = (parmas) => request.get(`/products/${parmas}`)

// 加入到购物车
export const addtoshoppingcardAPI = (parmas) => request.post('/shop/carts/add', qs.stringify(parmas))

// 购物车详情
export const shoppingcardmessAPI = () => request.get('/shop/carts')

// 从购物车删除
export const deletegoods = (id) => request.get(`/shop/carts?productIds=${id}`)