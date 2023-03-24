<template>
    <div class="home">
        <div class="lbt" :style="{ 'background-color': changephoto() }">
            <div class="l-div" @click="changelunbobydiv(-1)"></div>

            <ul>
                <li v-for="item, index in this.lunbo" :key="index" @click="changeindexbyli(index)"></li>

            </ul>
            <div class="r-div" @click="changelunbobydiv(1)"></div>
        </div>
        <div class="commity">
            <CommodityMess :name="'精品推荐'" :meun="'更多'"></CommodityMess>
            <Items :recodatas="this.recodatas"></Items>

        </div>
        <div class="hot">
            <CommodityMess :name="'热门兑换'" :meun="'更多'"></CommodityMess>
            <Items :recodatas="this.hotrecodata"></Items>
        </div>
    </div>
</template>

<script>
import CommodityMess from "../components/home/CommodityMess.vue"
import Items from "../components/home/Item.vue"
import { hotexchangeAPI, storeintroAPI } from "@/request/api"
export default {
    name: 'Home',
    data() {
        return {
            recodatas: [],
            hotrecodata: [],
            lunbo: ['#ffc397', '#ffa998', '#18acba', '#f76566'],
            lunboindex: 0
        }

    },
    methods: {
        changelunbo(val) {

            if (val === 1 && this.lunboindex === this.lunbo.length - 1) this.lunboindex = 0
            else if (val === -1 && this.lunboindex === 0) this.lunboindex = this.lunbo.length - 1
            else this.lunboindex += val;
            // console.log(this.lunbo[this.lunboindex])
        },
        changephoto() {
            return this.lunbo[this.lunboindex]
        },
        changeindexauto() {
            setInterval(() => {
                this.changelunbo(1)
            }, 2000)
        },
        changeindexbyli(index) {
            this.lunboindex = index;
        },
        changelunbobydiv(val) {
            this.changelunbo(val);
            setTimeout(() => {

            }, 2000);
        },
        changeactive(e) {
            e.currentTarget.className = 'active'
        },
        removeactive(e) {
            e.currentTarget.className = ''
        }

    },
    components: {
        CommodityMess,
        Items
    },
    mounted() {
        this.changeindexauto()
    },
    async created() {
        let reco = await storeintroAPI()
        this.recodatas = reco.data.data.records
        console.log("hot商品", this.recodatas)

        let hotreco = await hotexchangeAPI()
        this.hotrecodata = hotreco.data.data.records
        console.log("热门兑换", this.recodata)
    },

}
</script>
<style>
.home {
    width: 100%;

}

/* .active {
    /* box-shadow: 2px 2px rgba(105, 116, 119, 0.5); */
/* background-color: rgb(255, 226, 231) !important; */
/* } */
.home .hot,
.commity {
    width: 1200px;

    margin: 0px auto;


}

.home .lbt {
    height: 400px;
    /* background-color: antiquewhite; */
    width: 1200px;

    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.home .lbt div {
    width: 0;
    height: 0;
    border: 30px solid transparent;

    border-radius: 10px;
    transition: 5s;




}

.home .lbt .l-div {
    border-right-color: rgba(105, 116, 119, 0.5);
    float: left
}

.home .lbt .r-div {
    border-left-color: rgba(105, 116, 119, 0.5);
    float: right;
}

.home .lbt ul {
    align-self: end;

}

.home .lbt ul li {
    background-color: rgba(105, 116, 119, 0.5);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 10px;
    display: inline-block;

}
</style>