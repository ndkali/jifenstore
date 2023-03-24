<template>
    <div class="toalt" v-show="isshowhint">
        <p>{{ hintmsg }}</p>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'Toalt',
    data: function () {
        return {

        }
    },
    computed: {
        ...mapState({
            isshowhint: state => state.showhint.isshowhint,
            hintmsg: state => state.showhint.hintmsg
        })
    }
}
</script>

<style scoped>
div {
    position: absolute;
    top: 50px;
    left: 50%;
    margin-left: -100px;
    width: 200px;
    padding: 10px;
    background-color: rgba(90, 90, 90);
    color: white;
}
</style>