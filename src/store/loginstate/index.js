
export default {
    namespaced: true,
    state: {
        isshowloginbtn: localStorage.getItem("x-auth-token") ? false : true,
    },
    mutations: {
        changeshowloginbtn(state, payload) {
            state.isshowloginbtn = payload;
        }
    },
    actions: {

    },
}