<template>
    <div class="flex h-dvh flex-col">
        <Header v-if="path !== '/login' && path !== '/register' && user" />
        <div class="grow"><RouterView /></div>
        <Footer v-show="path !== '/login' && path !== '/register' && user" />
        <ModalsContainer />
    </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import { ref, computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Header from '@/components/global/header.vue'
import Footer from '@/components/global/footer.vue'

import { getUserState } from '@/api/api.js'

const router = useRouter()
const route = useRoute()

const user = ref(null)
const path = computed(async () => {
    console.log(route.path)
    try {
        user.value = await getUserState()
    } catch (e) {
        user.value = e
    }
    return route.path
})
</script>

<style scoped></style>
