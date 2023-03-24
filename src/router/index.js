import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Commodity from '../views/Commodity.vue'
import Personal from '../views/Personal.vue'
import Details from '../views/Details.vue'
import Notfound from '../views/Personal/Notfound.vue'
import loginornot from '../views/Personal/loginornot.vue'
import shoppingcard from '../views/Personal/shoppingcard.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/Home',
            component: Home
        },
        {
            path: '/Commodity',
            component: Commodity
        },
        {
            path: '/Welfare',
            component: Notfound
        },
        {
            path: '/Personal',
            component: Personal,
            children: [
                {
                    path: '/Personal/loginornot',
                    component: loginornot
                },
                {
                    path: '/Personal/shoppingcard',
                    component: shoppingcard,

                },
                {
                    path: '/Personal/Notfound',
                    component: Notfound
                }
            ]


        },



        {
            path: '/Details',
            component: Details
        },
        {
            path: '/Notfound',
            component: Notfound
        }
    ]
})

export default router

