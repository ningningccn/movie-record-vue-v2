import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/index.vue'),
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
            path: '/search',
            name: 'search',
            component: () => import('@/views/search.vue'),
        },
        {
            path: '/:mediaType/:mediaID',
            name: 'searched',
            component: () => import('@/views/search-detail.vue'),
        },
    ],
})

export default router
