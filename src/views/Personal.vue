<template>
    <div class="personal">
        <div class="nav">
            <div>
                <img src="#" width="100px" height="100px" />
                <p>用户名</p>
            </div>
            <p>交易管理</p>
            <ul>
                <li><router-link to="/Personal/loginornot">账号管理</router-link></li>
                <li><router-link to="/Personal/shoppingcard">购物车</router-link></li>
                <li><router-link to="/Personal/Notfound">消息通知</router-link></li>
                <li><router-link to="/Personal/Notfound">积分明细</router-link></li>
                <li><router-link to="/Personal/Notfound">积分攻略</router-link></li>
            </ul>
            <p>个人信息管理</p>
            <ul>
                <li><router-link to="/Personal/Notfound">地址管理</router-link></li>
                <li><router-link to="/Personal/Notfound">帐号安全</router-link></li>
            </ul>
        </div>
        <div class="per-r">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from "vuex";
export default {
    name: 'Personal',
    beforeRouteEnter(to, from, next) {
        let token = localStorage.getItem("x-auth-token")
        if (token) {
            next()
        } else {

            alert("请先登录")
        }


    }

}
</script>
<style>
.personal {
    width: 1100px;
    display: flex;
    margin: 0 auto;
    padding-top: 50px;
    justify-content: space-between;

}

.personal .nav {
    width: 200px;
    height: 600px;
    background-color: rgb(234, 233, 232);
}

.personal .nav div {
    width: 100px;
    margin: 20px auto;
}

.personal .nav ul {
    margin: 20px;
}

.personal .nav li {
    padding: 10px;
}

.personal .per-r {

    width: 800px;
    background-color: rgb(240, 240, 240);
}
</style>