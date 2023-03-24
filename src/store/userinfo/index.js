import { userinfoAPI } from "../../request/api"
export default {

    namespaced: true,
    state: {
        carttotal: 0,
        userinfo: {
            nickName: "游客",
            coin: 0,
            headlmg: "#"
        }
    },
    mutations: {
        changeuserinfo(state, payload) {
            state.carttotal = payload.cartTotal
            state.userinfo = payload.userInfo
        },
        inituserinfo(state) {
            state.carttotal = 0
            state.userinfo = {
                nickName: "游客",
                coin: 0,
                headlmg: "#"
            }
        }



    },
    actions: {
        async Changeuserinfo({ commit }) {
            let userinfores = await userinfoAPI()
            console.log("user information", userinfores)
            commit("changeuserinfo", userinfores.data)
            console.log("aaa", userinfores.data)

        }

    }
}