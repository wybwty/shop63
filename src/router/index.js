import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Users from '@/components/users.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/',
            component: Home,
            children: [{
                name: 'users',
                path: '/users',
                component: Users
            }]
        }

    ]
})