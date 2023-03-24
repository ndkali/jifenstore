import store from '@/store'
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8881/cms",
    // baseURL: "/cms",
    timeout: 5000,
})

//请求拦截器，对发送的数据进行处理
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("x-auth-token")
    if (token) {
        config.headers["x-auth-token"] = token
    }
    console.log("config的值为", config)
    return config
}, err => {
    return Promise.reject(err)
})
//响应拦截器
instance.interceptors.response.use(res => {
    let res_data = res.data
    if (res_data.code != 0 && res_data.code != 400 && res_data.code != 407) {
        store._actions["showToast/asyncchangeisshowhint"][0]({
            msg: res_data.message,

        })
    }
    return res.data
}, err => {
    console.log("error")
    return Promise.reject(err)
})
export default instance