<template>
  <div id="app">
    <!-- keyvalue变化时topbar重载 -->
    <TopBar :key="keyvalue"></TopBar>
    <Header></Header>
    <router-view @fu="reloadtopbar"></router-view>
    <Bottom></Bottom>
    <Login v-show="isshowloginmodel"></Login>
    <Transition class="fade">
      <Toalt></Toalt>
    </Transition>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Bottom from './components/Bottom.vue'
import TopBar from './components/TopBar.vue'
import Login from './components/Login.vue'
import Toalt from './components/toalt.vue'

import { mapState, mapActions } from "vuex"

export default {
  name: 'App',
  data() {
    return {
      keyvalue: 0
    }

  },
  methods: {
    ...mapActions({
      Changeuserinfo: "state/userinfo/Changeuserinfo"
    }),
    reloadtopbar() {
      this.keyvalue++;
    }
  },
  computed: {
    ...mapState({
      isshowloginmodel: state => state.isshowloginmodel.isshowloginmodel
    })
  },
  watch: {
    "$route.path": {
      handler() {
        this.keyvalue++
      }
    },

  },

  components: {
    TopBar,
    Header,
    Bottom,
    Login,
    Toalt,
  },


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  background-color: rgb(245, 245, 245);

}


.fade-enter,
.fade-leave {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-to {
  opacity: 1;
}

.active {
  color: blue;
}
</style>
