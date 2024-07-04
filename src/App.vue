<template>
    <div class="flex h-dvh flex-col">
        <Header v-if="path !== '/login' && path !== '/register'" />
        <div class="grow"><RouterView /></div>
        <Footer v-if="path !== '/login' && path !== '/register'" />
        <ModalsContainer />
    </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Header from '@/components/the-header.vue'
import Footer from '@/components/the-footer.vue'

const router = useRouter()
const route = useRoute()

const path = computed(() => {
    return route.path
})

// globalStore.getUserState()

// const test = async () => {
//     const a = await searchMovieFetch('玩很大')
//     console.log(a)
// }

// test()
// console.log(route)
// console.log(router)
// const path = ref(route.path)
// console.log(path)
</script>

<style scoped>
/* .main {
    height: 100svh;
    display: flex;
    flex-direction: column;
    padding-top: 120px;
} */
/* main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    position: relative;
    z-index: 2;
} */
</style>
