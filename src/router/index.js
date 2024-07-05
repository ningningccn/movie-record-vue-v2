import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from '@/function/api'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*', // router 4
            redirect: 'login',
        },
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/index.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/register.vue'),
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/search.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/:mediaType/:mediaID',
            name: 'searched',
            component: () => import('@/views/search-detail.vue'),
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    console.log(to.meta.requiresAuth)
    if (to.meta.requiresAuth) {
        // console.log("to.meta.requiresAuth: ", to.meta.requiresAuth);
        // console.log(`這需要認證`);
        const user = await getUserState()
        console.log(user)
        if (user) {
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        console.log('沒有登入')
        next({ path: '/login' })
    }
})

export default router
