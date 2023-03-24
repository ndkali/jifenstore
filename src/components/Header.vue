<template>
  <div class="header">
    <ul>
      <li><img src="#"></li>
    </ul>
    <ul class="menu">
      <li>
        <router-link active-class="active" to="/Home">首页</router-link>
        <!-- <a href="/Home" @click.prevent="$router.push('/Home')">首页</a> -->
      </li>
      <li>
        <router-link active-class="active" to='/Commodity'>全部商品</router-link>
      </li>
      <li>
        <router-link active-class="active" to='/Personal'>个人中心</router-link>
      </li>
      <li>
        <router-link active-class="active" to='/Notfound'>我的订单</router-link>
      </li>
      <li>
        <router-link active-class="active" to='/Welfare'>专属福利</router-link>
      </li>
    </ul>
    <ul>
      <li>
        <input v-model="putvalue" placeholder="请输入待搜索商品的关键字" @keyup.enter="submitputvalue()" />
        <button @click="submitputvalue()">submit</button>
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {

  },
  data() {
    return {
      putvalue: '',
    }
  },
  methods: {
    submitputvalue() {
      this.$router.push("/Commodity?keyword=" + this.putvalue);
      this.putvalue = '';
    }
  },
  watch: {
    '$route.params': {
      handler() {
        this.$forceUpdate()
      },
      deep: true
    }
  }

}
</script>


<style scoped>
.header {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 40px auto 20px auto;
  padding-top: 20px;
}

ul {
  display: flex;
  justify-content: space-around;

}

ul li {
  list-style: none;

}

.menu li {
  margin-right: 50px;
}
</style>
