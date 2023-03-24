<template>
    <div class="items">

        <div v-for="recodata in recodatas" class="item" @click="gotodetails(recodata.id)">
            <a href="#">
                <div class="photo">
                    <img :src="'http://sc.wolfcode.cn' + recodata.coverImg">
                </div>
                <div class="name">{{ recodata.name }}</div>
                <div class="price" :style="{ 'color': 'red' }">{{ recodata.coin }}</div>
                <button>立即兑换</button>
            </a>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Items',
    props: [
        'recodatas'
    ],
    methods: {
        gotodetails(id) {
            this.$router.push('/Details?id=' + id)
        }
    }

}
</script>

<style scoped>
.items {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    color: black;

}

.item {
    width: 250px;
    height: 440px;

    background-color: rgba(255, 255, 255, 0.8);
    margin: 25px;


}

.item a {
    color: black;
}

.item img {
    height: 300px;
    width: 100%;
}

.item:hover {
    margin-top: 10px;
    margin-bottom: 30px;
}

.item .name,
.price {
    padding: 10px;
}

.item button {
    padding: 10px;
    border: rgb(154, 177, 214)
}

.item button:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(51, 51, 225);
}
</style>