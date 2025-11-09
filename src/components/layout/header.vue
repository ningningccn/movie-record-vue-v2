<template>
    <div class="container py-6 transition-all duration-500 md:py-8">
        <div class="flex h-[32px] w-full justify-between md:h-[48px]">
            <router-link to="/" class="relative h-full" id="logo">
                <img src="/images/register-logo.png" alt="" class="relative h-full" />
            </router-link>
            <div class="hidden space-x-10 md:flex">
                <button
                    type="button"
                    class="an-btn flex items-center gap-x-2 hover:text-primary"
                    @click="openAddRecord()"
                >
                    <i class="icon-plus-square"></i>
                    添加
                </button>
                <routerLink
                    to="/search"
                    class="an-btn flex items-center gap-x-2 hover:text-primary"
                >
                    <i class="icon-search"></i>
                    搜尋
                </routerLink>
                <button
                    type="button"
                    class="an-btn flex items-center gap-x-[10px] rounded-lg border border-primary px-6 py-2 text-primary"
                    @click="handleLogout()"
                >
                    <i class="icon-sign-in"></i>
                    登出
                </button>
            </div>
            <button class="flex items-center md:hidden" @click="openMobileMenu()">
                <i class="icon-mobile-menu !text-[16px]"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useModal } from 'vue-final-modal'
import { useAuth } from '@/composables/useAuth.js'

import AddRecord from '@/components/modals/add-movie-modal.vue'
import MobileMenu from '@/components/layout/mobile-menu.vue'

import gsap from 'gsap'

const { handleLogout } = useAuth()

const AddRecordModal = useModal({
    component: AddRecord,
    attrs: {
        // title: 'Hello World!',
        // onConfirm() {
        //     close()
        // },
    },
})

const mobileMenu = useModal({
    component: MobileMenu,
    attrs: {
        clickAddRecord: () => {
            mobileMenu.close()
            AddRecordModal.open()
        },
        clickLogout: () => {
            mobileMenu.close()
            handleLogout()
        },
    },
})

const openAddRecord = () => {
    AddRecordModal.open()
}

const openMobileMenu = () => {
    mobileMenu.open()
}

let t1 = gsap.timeline()
const initGsap = () => {
    t1.fromTo(
        '#logo',
        { x: -100, opacity: 0 },
        {
            duration: 1,
            opacity: 1,
            x: 0,
        },
    )
    t1.fromTo(
        '.an-btn',
        { x: 100, opacity: 0 },
        {
            duration: 0.5,
            opacity: 1,
            stagger: 0.2,
            x: 0,
        },
        '-=0.5',
    )
}

onMounted(() => {
    initGsap()
})
</script>

<style scoped>
i {
    @apply text-[32px];
}
</style>
