import { createRouter, createWebHistory } from 'vue-router'
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
router.beforeEach(async (to) => {
    if (to.fullPath === '/login' || to.fullPath === '/register') return

    if (to.meta.requiresAuth) {
        try {
            const user = await getUserState()
            if (user) return
        } catch (error) {
            console.error('Auth check failed:', error)
        }
        return '/login'
    }
})

export default router
