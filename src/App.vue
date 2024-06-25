<template>
    <HeaderA v-if="path !== '/login'" />
    <!-- <Category /> -->

    <!-- <Header /> -->
    <!-- <div class="fixed top-0 h-[120px]">header</div>
    <div class="main">
        <main>main</main>
        <div>footer</div>
    </div> -->
    <RouterView />
    <ModalsContainer />
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Header from '@/components/the-header.vue'
import HeaderA from '@/components/the-header-2.vue'
import Category from '@/components/home/category.vue'

const router = useRouter()
const route = useRoute()

const path = computed(() => {
    return route.path
})
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
