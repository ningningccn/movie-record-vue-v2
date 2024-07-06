<template>
    <div class="flex h-dvh flex-col">
        <Header v-if="path !== '/login' && path !== '/register' && user" />
        <div class="grow"><RouterView /></div>
        <Footer v-if="path !== '/login' && path !== '/register' && user" />
        <ModalsContainer />
    </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import { ref, computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Header from '@/components/the-header.vue'
import Footer from '@/components/the-footer.vue'

import { getUserState } from '@/function/api'

const router = useRouter()
const route = useRoute()

const path = computed(() => {
    console.log(route.path)
    return route.path
})
const user = ref(null)
onMounted(async () => {
    user.value = await getUserState()
})
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
