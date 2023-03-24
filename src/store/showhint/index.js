export default {
    namespaced: true,
    state: {
        isshowhint: false,
        hintmsg: "",

    },
    mutations: {
        changeisshowhint(state, paylosd) {
            state.isshowhint = paylosd.isshowhint
            state.hintmsg = paylosd.hintmsg
        }
    },
    actions: {
        async Changeisshowhint(context, payload) {
            context.commit("changeisshowhint", {
                isshowhint: true,
                hintmsg: payload.hintmsg
            })

            setTimeout(() => {
                context.commit("changeisshowhint", { isshowhint: false, hintmsg: payload.hintmsg })
            }, 1500)
        }

    }
}