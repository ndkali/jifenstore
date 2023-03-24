<template>
  <div class="topbar">
    <div class="wrap">
      <div class="l">

        <h1>欢迎来到严选</h1>

      </div>
      <div class="r">
        <ul>
          <li><img src="../../public/tou.png"></li>
          <li @click="clickuser()">{{ userinfo.nickName }}</li>
          <li>我的积分{{ userinfo.coin }}</li>
          <li>获取积分</li>
          <li>官网</li>
          <li v-show="isshowloginbtn" @click="openshowlogin(payload)">登录</li>
          <li v-show="!isshowloginbtn" class="cart-btn">
            <img />
            <span>购物车</span>
            <b>{{ carttotal }}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
// import { mainModule } from 'process';
// import { onBeforeMount } from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { weixinloginAPI, userinfoAPI } from '../request/api'
export default {
  name: 'TopBar',
  data() {
    return {
      payload: true,

    }
  },
  created() {

    // await weixinloginAPI({
    //   parmas: this.$route.query.code
    // })
    // nextTick
    this.$nextTick().then(async () => {
      let mycode = this.$route.query.code
      console.log(this.$route.query)
      if (mycode) {
        let res = await weixinloginAPI({
          code: mycode
        })

        // 登录成功
        if (res.code == 0) {

          this.Changeisshowhint({
            hintmsg: "login sucess"
          })

          // 自动退出登录框

          this.changeshowloginmodel(false)
          //保存token值到localstorage
          localStorage.setItem("x-auth-token", res["x-auth-token"])

          //将登录按钮变为购物车
          this.changeshowloginbtn(this.false)
          //登录状态的切换，用户名的显示

          localStorage.removeItem("uuid")
          this.$router.push(this.$route.path)

        }
        //重新登录
        else if (res.code == 400) {
          this.Changeisshowhint({
            hintmsg: "登录失败，请重新登录"
          })
          this.changeshowloginmodel(true)
        }
        else if (res.code == 407) {
          this.Changeisshowhint({
            hintmsg: "请绑定手机号"
          })
          this.changeshowloginmodel(true)
          localStorage.setItem("uuid", res.uuid)

          // 微信绑定手机号

        }


        // 绑定手机号
      }
      // 登录成功或未登录，需要根据登录状态改变用户信息
      else {
        let mytoken = localStorage.getItem('x-auth-token')
        if (!mytoken) {
          // 用户切换登录状态时需要改变登录按钮样式
          this.changeshowloginbtn(true)
          this.inituserinfo()
        }
        else {
          this.Changeuserinfo()
        }
      }
    })

  },
  methods: {
    ...mapMutations({
      changeshowloginmodel: "isshowloginmodel/changeshowloginmodel",
      changeshowloginbtn: "loginstate/changeshowloginbtn",
      changeisshowhint: "showhint/changeisshowhint",
      inituserinfo: "userinfo/inituserinfo"


    }),
    ...mapActions({
      Changeisshowhint: "showhint/Changeisshowhint",
      Changeuserinfo: "userinfo/Changeuserinfo"
    }),
    openshowlogin(payload) {
      this.changeshowloginmodel(payload)
    },
    clickuser() {
      this.Changeisshowhint({
        hintmsg: "plaese login"
      })

      // setTimeout(() => {
      //   this.changeisshowhint({ isshowhint: false })
      // }, 1500)
    },
  },
  computed: {
    ...mapState({
      isshowloginmodel: state => state.isshowloginmodel.isshowloginmodel,
      isshowloginbtn: state => state.loginstate.isshowloginbtn,
      carttotal: state => state.userinfo.carttotal,
      userinfo: state => state.userinfo.userinfo

    }),

  }

}
</script>


<style scoped>
.topbar {
  width: 100%;
  height: 40px;
  background-color: rgb(60, 60, 60);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
  font-size: 10px;
}

.wrap {
  width: 1200px;

  justify-content: space-between;
  display: flex;
  align-items: center;
}

.l {
  line-height: 60px;

}





.r ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.r ul li {
  margin-left: 20px;
  /* font-size: 10px; */
  list-style: none;
  color: aliceblue
}

ul li img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
