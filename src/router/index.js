import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { getUserState } from '@/api/api.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*', // router 4
            redirect: 'login',
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/index.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue'),
        },
        {
            path: '/register',
            name: 'register',
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
        {
            path: '/list/:id',
            name: 'MovieDetail',
            component: () => import('@/views/movie-detail.vue'),
            meta: { requiresAuth: true },
        },
    ],
})
router.beforeEach(async (to, from) => {
    console.log(to.fullPath)
    if (to.fullPath === '/login' || to.fullPath === '/register') return
    try {
        const user = await getUserState()
        if (to.meta.requiresAuth && user) {
            return
        }
        return
    } catch (e) {
        if (to.fullPath === '/login') return '/login'
        if (to.fullPath === '/register') return '/register'
        return '/login'
    }
})

export default router
