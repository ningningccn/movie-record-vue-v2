<template>
    <div class="flex h-dvh flex-col">
        <Header v-if="path !== '/login' && path !== '/register' && user" />
        <div class="grow"><RouterView /></div>
        <Footer v-show="path !== '/login' && path !== '/register' && user" />
        <ModalsContainer />
    </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter.js'
import { ModalsContainer } from 'vue-final-modal'
import { ref, computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Header from '@/components/global/header.vue'
import Footer from '@/components/global/footer.vue'

import { getUserState } from '@/api/api.js'
import { useGlobalStore } from '@/stores/global.js'

const filterStore = useFilterStore()
const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()

const user = ref(null)
const path = computed(async () => {
    if (globalStore.user) {
        user.value = globalStore.user.email
        filterStore.setFilterLists()
        return route.path
    } else {
        try {
            user.value = await getUserState()
            filterStore.setFilterLists()
        } catch (e) {
            user.value = e
        }
        return route.path
    }
})
</script>

<style scoped></style>
