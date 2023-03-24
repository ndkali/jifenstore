<template>
    <div class="commodity">
        <ul>

            <li>排序:</li>
            <li v-for="item, index in this.option1" :key="index" @click="searchbycoin(index)"
                :class="index === num1 ? 'active' : ''">{{
                    item.txt }}</li>

        </ul>
        <ul>
            <li>分类:</li>
            <li v-for="item, index in this.option2" :key="index" @click="searchbyreal(index)"
                :class="index === num2 ? 'active' : ''">{{
                    item.txt }}</li>
        </ul>
        <Items :recodatas="this.recodata">
        </Items>
    </div>
</template>

<script>
import Items from "../components/home/Item.vue"
// import CommodityMess from "@/components/home/CommodityMess.vue"
import { searchgoodAPI } from "../request/api"
export default {
    name: 'Commodity',
    data() {
        return {
            recodata: '',
            did: 0,
            type: 0,
            min: 0,
            max: 0,
            keyword: '',
            option1: [
                { min: 0, max: 0, txt: '全部' },
                { min: 0, max: 100, txt: '我能兑换的' },
                { min: 0, max: 500, txt: '0-500' },
                { min: 500, max: 1000, txt: '500-1000' },
                { min: 1000, max: 1500, txt: '1000-1500' },
                { min: 1500, max: 2500, txt: '1500-2500' },


            ],
            option2: [
                { type: 0, txt: '全部商品' },
                { type: 1, txt: '实体商品' },
                { type: 2, txt: '虚拟商品' }
            ],
            num1: 0,
            num2: 0
        }

    },
    components: {
        Items,
    },
    created() {
        this.searchgood()
    },
    methods: {
        async searchgood() {
            this.keyword = this.$route.query.keyword || ''
            console.log(this.keyword, "keyword")
            let res = await searchgoodAPI({
                did: this.did,
                type: this.type,
                min: this.min,
                max: this.max,
                keyword: this.keyword,
            })
            if (!res) return
            this.recodata = res.data
            console.log("热门兑换", this.recodata)
        },
        searchbycoin(index) {
            this.min = this.option1[index].min;
            this.max = this.option1[index].max;
            this.num1 = index;
            console.log(this.min, this.max)
            this.searchgood();
        },
        searchbyreal(index) {
            this.type = this.option2[index].type;
            this.num2 = index;
            this.searchgood();
        }
    },
    watch: {
        "$route.query.keyword": {
            handler(newVal, oldVal) {
                this.keyword = newVal;
                this.searchgood();
            },
            deep: true
        }
    }
}
</script>
<style>
.commodity {
    width: 1200px;
    margin: 0 auto;

}

.commodity ul {
    display: flex;
    justify-content: start;
}

.commodity ul li {
    margin: 20px;
}

Items {
    margin: 20px;
}
</style>