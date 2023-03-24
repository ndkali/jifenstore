<template>
    <div class="commess">
        <div class="top">
            <div class="l">{{ this.name }}</div>
            <div class="r"><a href="#" @click="gotocommdity()">{{ this.meun }}></a></div>
        </div>

    </div>
</template>
<script>
// import { INSPECT_MAX_BYTES } from 'buffer';

export default {
    name: 'CommodityMess',
    props: ['name', 'meun'],
    methods: {
        gotocommdity() {
            if (this.name === "精品推荐") {
                this.$router.push("/Commodity?did=1")
            } else if (this.name === "热门兑换") {
                this.$router.push("/Commodity?did=2")
            }
        }

    }

}
</script>
<style scoped>
.commess {
    width: 1200px;
    margin: 60px auto 0 auto;
    background-color: rgb(245, 245, 245);
    font-size: 30px;

}

.commess .top {
    display: flex;
    justify-content: space-between;
    height: 50px;
}

.commess .top .r {
    margin-right: 10px;
    font-size: 16px;
    color: black
}
</style>