
export default {
    namespaced: true,
    state: {
        isshowloginmodel: localStorage.getItem("x-auth-token") ? false : true,
    },
    mutations: {
        changeshowloginmodel(state, payload) {
            state.isshowloginmodel = payload;
        }
    },
    actions: {

    },
}