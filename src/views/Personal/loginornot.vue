<template>
    <div class="loginornot">
        <button @click="exitlogin()">解绑微信</button>
        <button @click="exitlogin()">退出登陆</button>
    </div>
</template>

<script>
export default {
    name: 'loginornot',
    methods: {
        exitlogin() {
            localStorage.removeItem("x-auth-token")
        }
    }
}
</script>
<style></style>