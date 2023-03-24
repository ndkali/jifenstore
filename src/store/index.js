import Vue from 'vue'
import Vuex from 'vuex'


import isshowloginmodel from "./isshowloginmodel"
import loginstate from "./loginstate"
import showhint from "./showhint"
import userinfo from "./userinfo"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        isshowloginmodel,
        loginstate,
        showhint,
        userinfo
    }
})
