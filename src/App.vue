<template>
    <div class="flex h-dvh flex-col">
        <Header v-if="path !== '/login' && path !== '/register' && user" />
        <div class="grow"><RouterView /></div>
        <Footer v-show="path !== '/login' && path !== '/register' && user" />
        <ModalsContainer />
    </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter.js"
import { ModalsContainer } from "vue-final-modal"
import { ref, computed, onMounted, watch } from "vue"
import { RouterView, useRoute } from "vue-router"
import Header from "@/components/layout/header.vue"
import Footer from "@/components/layout/footer.vue"

import { getUserState } from "@/services/authService.js"
import { useGlobalStore } from "@/stores/global.js"

const filterStore = useFilterStore()
const route = useRoute()
const globalStore = useGlobalStore()

const user = ref(null)
const path = computed(() => route.path)

// Initialize user state on mount
onMounted(async () => {
    if (globalStore.user?.email) {
        user.value = globalStore.user.email
        await filterStore.setFilterLists()
    } else {
        try {
            user.value = await getUserState()
            await filterStore.setFilterLists()
        } catch (error) {
            user.value = null
            console.error("Failed to get user state:", error)
        }
    }
})

// Watch for route changes and update filter lists if user is authenticated
watch(
    () => route.path,
    async () => {
        if (user.value) {
            await filterStore.setFilterLists()
        }
    },
)
</script>

<style scoped></style>
