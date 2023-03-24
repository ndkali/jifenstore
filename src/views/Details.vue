<template>
    <div class="details">
        <div class="top">
            <div class="photo">
                <div><img :src="'https://sc.wolfcode.cn' + this.bigimg" width="457px" height="457px" /></div>
                <ul>
                    <!-- mouseenter:鼠标移入 -->
                    <li v-for="item, index in productInfo.imgAltas" :key="index" @mouseenter="changebigimg(index, item)">
                        <img :src="'https://sc.wolfcode.cn' + item.src" width="100px" height="100px" />
                    </li>

                </ul>
            </div>
            <div class="mess">
                <div>{{ this.productInfo.seriesTitle }}</div>
                <div>{{ this.productInfo.seriesSubTitle }}</div>
                <div>{{ this.productInfo.coin }}</div>
                <div v-for="item, index in this.productInfo.parameterJson" :key="index" class="goodsguige">
                    <div>{{ item.title }}</div>
                    <li v-for="val in item.parameters" :key="val.id" @click="gotodetails(val.id)"
                        active="val.currentActivate">{{ val.title
                        }} </li>


                </div>
                <div>礼品库存{{ this.productInfo.stock }}件</div>
                <div>
                    <button @click="reducegoodnum">-</button>
                    <span> {{ this.goodsnumber }} </span>
                    <button @click="addgoodnum">+</button>
                </div>
                <div>
                    <button @click="addtoshoppingcart">加入购物车</button>
                    <button>立即兑换</button>
                </div>
                <div>喜欢{{ this.productInfo.like }}</div>
            </div>
            <div class="canget">
                <ul>

                    <!-- 图片地址前缀全局通用，可设为vue.prototype -->
                    <li v-for="item in this.themYouCanBuy" :key="item.id" @click="gotodetails(item.id)">
                        <img :src="'https://sc.wolfcode.cn' + item.img" width="90px" height="90px" alt="" />
                        <div>
                            <p>{{ item.name }}</p>
                            <p>{{ item.coin }}</p>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="bottom">
            <div>
                <button @click="isshowmess = true" :class="isshowmess ? 'active' : ''">商品详情</button>
                <button @click="isshowmess = false">常见问题</button>
            </div>
            <div v-show="isshowmess" v-html="this.productInfo.description"></div>
            <div v-show="!isshowmess">我是问题</div>
        </div>
    </div>
</template>

<script>
import { detailsAPI, addtoshoppingcardAPI } from '../request/api'
export default {
    name: 'Details',
    data() {
        return {
            goodsnumber: 1,
            goodsid: '',
            isshowmess: true,
            number: 9,
            bigimg: '',//大图是哪张
            productInfo: {},
            nav: [],
            themYouCanBuy: []
        }
    },
    methods: {
        reducegoodnum() {
            if (this.goodsnumber > 1)
                this.goodsnumber -= 1
        },
        addgoodnum() {
            if (this.goodsnumber >= 0) {
                this.goodsnumber += 1;
                if (this.goodsnumber == 5) {
                    alert("限购五件")
                    return
                }
            }
        },
        async gotodetails(id) {
            // 可不刷新页面进行页面更新，直接更新数据就可
            // this.$router.push('/Details?id=' + id)
            this.goodsid = id;
            let res = await detailsAPI(this.goodsid);
            let { productInfo, themYouCanBuy } = res.data;

            this.productInfo = productInfo;
            // console.log("productinfo", productInfo)
            // 
            // this.nav = nav;
            this.themYouCanBuy = themYouCanBuy;
            this.bigimg = this.productInfo.imgAltas[0].src;
            this.productInfo.description = this.productInfo.description.replaceAll("upload/", "https://sc.wolfcode.cn/upload/");

        },
        async addtoshoppingcart() {

            let res = await addtoshoppingcardAPI({
                productId: this.goodsid,
                total: this.goodsnumber,
                immediate: 0,
                modified: 0,
            })
            if (!res) return;
            // console.log(res)
            this.$emit('fu')

        },

        changebigimg(index, item) {
            this.bigimg = item.src;
        }
    },
    async created() {
        // this.goodsid = this.$route.query.id;
        // let res = await detailsAPI(this.goodsid);
        // let { productInfo, themYouCanBuy } = res.data;

        // this.productInfo = productInfo;
        // // console.log("productinfo", productInfo)
        // // 
        // // this.nav = nav;
        // this.themYouCanBuy = themYouCanBuy;
        // this.bigimg = this.productInfo.imgAltas[0].src;
        // console.log(this.productInfo);
        let id = this.$route.query.id;
        this.gotodetails(id);


    },
    watch: {
        // 关于页面url变化但2页面不会变化，使用watch监听route，变化则刷新页面this.$router.go(0)刷新，1前进，- 1后退
        // $route.query.id也可，就不用采用深度监听了
        "$route": {
            handler() {
                this.$router.go(0)
            },
            deep: true
        }
    }
}
</script>

<style>
.details {
    max-width: 1000px;
    margin: 0 auto;
}

.details .top {
    display: flex;
    justify-content: space-between;

}

.details .top .photo ul {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.details .top .photo ul li :hover {
    box-shadow: 3px 3px rgba(182, 180, 180, 0.8);
}

.details .top .mess div {

    display: flex;
    justify-content: start;
    margin: 30px;

}

.details .top .mess .goodsguige {
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex-wrap: wrap;
}

.details .top .mess .goodsguige li {
    height: 30px;
    background-color: rgba(138, 193, 230, 0.5);
    margin: 10px;
}

.details .top .canget ul li {
    display: flex;
    margin: 20px 20px 20px 40px
}

.details .bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>