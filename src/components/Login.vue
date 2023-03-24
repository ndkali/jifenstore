<template>
    <div class="login">
        <div class="background" @click="closeshowloginmodel()">

        </div>
        <div class="loginblo">

            <button @click="closeshowloginmodel()" class="close">×</button>

            <div class="loginstyle">

                <li @click="changeshowwhatlogint">手机号登录</li>
                <li>|</li>
                <li @click="changeshowwhatloginf">微信扫码登录</li>
            </div>



            <div class="loginbto" v-show="showwhatlogin">

                <input class="tele height" placeholder="请输入手机号" v-model="phonenum" ref="phone" />

                <div class="yanzheng">
                    <input class="height" placeholder="请输入验证码" v-model="SMScode" />
                    <button @click="getsmscode" v-show="showlogin">获取验证码</button>
                    <span v-show="!showlogin">{{ count }}</span>
                </div>
                <!-- 引入外部图形验证模块 -->
                <!-- <div>
                    <slide-verify :l="42" :r="20" :w="300" :h="140" @success="onSuccess" @fail="onFail" @refresh="onRefresh"
                        :style="{ width: '100%' }" class="slide-box" ref="slideBlock" :slider-text="msg"></slide-verify>
                </div> -->
                <button @click="submitlogin">登录</button>
            </div>
            <div class="erweima" id="weixin" v-show="!showwhatlogin">

            </div>

        </div>
    </div>
</template>
<script>

import { mapActions, mapMutations, mapState } from "vuex";
import { getsmsAPI, phoneloginAPI, bindteleAPI } from "../request/api"
export default {
    name: 'Login',
    data: function () {
        return {
            payload: false,
            showwhatlogin: true,
            msg: "向右滑动",
            //用户输入的手机号码
            phonenum: "15918796216",
            count: 60,
            showlogin: true,
            SMScode: ""
        };
    },
    computed: {
        ...mapState({

            isshowloginbtn: state => state.showhint.isshowhint,
            hintmsg: state => state.showhint.hintmsg
        }),
    },
    methods: {
        ...mapMutations({
            changeshowloginmodel: 'isshowloginmodel/changeshowloginmodel',
            changeshowloginbtn: "loginstate/changeshowloginbtn",

        }),
        ...mapActions({
            Changeisshowhint: "showhint/Changeisshowhint",
            Changeuserinfo: "userinfo/Changeuserinfo"
        }),
        closeshowloginmodel(payload) {
            // this.$store.commit('changeshowloginmodel', payload)
            this.changeshowloginmodel(payload)
        },
        changeshowwhatlogint() {
            this.showwhatlogin = true
        },
        // 微信登录窗口
        changeshowwhatloginf() {
            this.showwhatlogin = false
            let _this = this;
            new WxLogin({
                id: "weixin",
                appid: "wx67cfaf9e3ad31a0d",
                scope: "snsapi_login",
                redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",// state填写编码后的ur1
                state: encodeURIComponent(window.btoa("http://127.0.0.1:8080" + _this.$route.path)),
                href: "",

            });

        },
        onSuccess(times) {
            let ms = (times / 1000).toFixed(1);
            this.msg = "登录成功，耗时" + ms + "s";

        },
        onFail() {
            this.onRefresh()
        },
        onRefresh() {
            this.msg = "try again"
        },
        async submitlogin() {
            //图片验证码的判断
            // if (this.msg === "try again" || this.msg === "向右滑动") {
            //     this.Changeisshowhint({
            //         hintmsg: "请将滑块滑至正确位置"
            //     })
            //     return
            // }
            let myuuid = localStorage.getItem("uuid")
            let res = ""
            if (myuuid) {
                res = await bindteleAPI({
                    phone: this.phonenum.trim(),
                    verifyCode: this.SMScode.trim(),
                    uuid: myuuid
                })
                console.log(res)
                if (res) {
                    this.Changeisshowhint({
                        hintmsg: "手机号绑定成功·"
                    })
                    // 自动退出登录框

                    this.changeshowloginmodel(false)
                    //保存token值到localstorage
                    localStorage.setItem("x-auth-token", res["x-auth-token"])
                    // console.log(this.isshowloginbtn)

                    //将登录按钮变为购物车
                    this.changeshowloginbtn(this.payload)
                    //登录状态的切换，用户名的显示
                    this.Changeuserinfo()


                    // 
                    localStorage.removeItem("uuid")
                    this.$router.push(this.$route.path)
                    console.log(this.$router.path)
                } else {
                    this.Changeisshowhint({
                        hintmsg: "登录失败"
                    })
                }
            }
            else {
                res = await phoneloginAPI({
                    phone: this.phonenum.trim(),
                    verifyCode: this.SMScode.trim(),

                })
                console.log(res)
                if (res) {
                    this.Changeisshowhint({
                        hintmsg: "登录成功"
                    })
                    // 自动退出登录框

                    this.changeshowloginmodel(false)
                    //保存token值到localstorage
                    localStorage.setItem("x-auth-token", res["x-auth-token"])
                    console.log(this.isshowloginbtn)

                    //将登录按钮变为购物车
                    this.changeshowloginbtn(this.payload)
                    //登录状态的切换，用户名的显示
                    this.Changeuserinfo()

                    // localStorage.removeItem("uuid")
                    // this.$router.push(this.$route.path)
                } else {
                    this.Changeisshowhint({
                        hintmsg: "登录失败"
                    })
                }
            }

        },
        countdown() {
            let _this = this

            let timer = setInterval(function () {
                _this.count--
                if (_this.count === 0) {
                    clearInterval(timer)
                    _this.showlogin = true;
                    _this.count = 60
                }
            }, 1000)
        },

        async getsmscode() {
            //telephone的正则表达式
            let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (!reg.test(this.phonenum)) {
                this.Changeisshowhint({
                    hintmsg: "手机号格式错误"
                })
                this.$refs.phone.focus()
                return
            }
            //check  huakuai yanzhengma

            // if (this.msg == "try again" || this.msg == "向右滑动") {
            //     alert("请输入正确的图片验证码")
            //     return
            // }


            let res = await getsmsAPI({
                phone: this.phonenum.trim(),

            })
            if (res.code == 0) {
                this.showlogin = false
                this.countdown()


            } else {
                console.log(res.message)
            }


        }

    }

}
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;
    top: 0;
}

input {
    border-radius: 10px;
    border: none;
    background-color: rgba(249, 252, 255, 0.3);
    outline-color: rgb(139, 164, 186)
}

button {
    height: 32px;
    border-radius: 10px;
    border: none;
    background-color: rgba(82, 119, 152, 0.9);
    color: rgb(215, 226, 235);
}

.background {
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}

.loginblo {
    width: 350px;
    height: 500px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(133, 161, 185, 0.9);
    border-radius: 10px;
    box-shadow: 2px 2px;
}

.height {
    height: 30px;
}

.loginblo .close {
    align-self: end;
    background-color: rgba(133, 161, 185, 0.8);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 30px;

}

.loginblo div {
    width: 300px;

}

.loginstyle {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.loginbto .tele {
    width: 250px;
    margin-bottom: 20px;
    margin-top: 20px;

}

.loginbto .yanzheng {
    margin-bottom: 20px;
}

.loginbto .yanzheng input {
    width: 145px;
    margin-right: 5px;
}

.loginbto .yanzheng button {
    width: 100px;
}

.loginbto button {
    width: 258px;
}

.erweima {

    align-self: center;
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.slide-box {
    width: 100%;
    position: relative;
    box-sizing: border-box;

    /* display: none; */

}

.slide-box canvas {
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
}

.slide-box .slide-verify-block {
    width: 85px;
    height: 136px;
}

.slide-box .slide-verify-refresh-icon {
    top: -120px;
    display: none;
}


.slide-box canvas:hover {
    display: block;
}

.slide-box .slide-verify-refresh-icon:hover {
    display: block;

}
</style>