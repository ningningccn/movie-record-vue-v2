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
            name: 'Home',
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
        {
            path: '/movie/:id',
            name: 'MovieDetail',
            component: () => import('@/views/movie-detail.vue'),
            meta: { requiresAuth: true },
        },
    ],
})
router.beforeEach(async (to, from) => {
    if (to.fullPath === '/login') return
    try {
        const user = await getUserState()
        if (to.meta.requiresAuth && user) {
            return
        } else {
            return
        }
    } catch (e) {
        return '/login'
    }
})

export default router
