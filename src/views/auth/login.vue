<template>
    <div class="bg">
        <div class="container z-10">
            <div
                class="main-wrap mx-auto h-[708px] max-w-[489px] rounded-b-[50px] border-x border-b border-[#FFFFFF33] bg-[#0080ff99]"
            >
                <div class="mx-auto w-[55%] pt-[184px]">
                    <img src="/images/register-logo.png" alt="" />
                </div>
                <div class="px-20">
                    <div class="mt-[104px] text-center text-[32px] font-bold">用戶登入</div>
                    <form class="mt-8 space-y-6">
                        <Input :placeholder="'帳戶名稱/電郵'" v-model:text="email" />
                        <Input :placeholder="'密碼'" :type="'password'" v-model:text="password" />
                    </form>
                    <div class="text-body-s mt-2 text-error" v-if="errorMessage">
                        {{ errorMessage }}
                    </div>
                    <Button class="mt-8" :disable="isValid || isLoading" @click="handleLogin()">登入</Button>

                    <div class="text-body-s mt-8 text-center">
                        還未有帳戶?立即
                        <router-link to="/register" class="text-primary underline">
                            註冊
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'

import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

import gsap from 'gsap'

const { login, error, isLoading } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const isValid = computed(() => {
    return email.value.length > 0 && password.value.length > 0
})

const handleLogin = async () => {
    const success = await login(email.value, password.value)
    if (!success) {
        errorMessage.value = '身份驗證/無效憑證'
    }
}

// Watch for error changes
watch(error, (newError) => {
    if (newError) {
        errorMessage.value = '身份驗證/無效憑證'
    }
})
let t1 = gsap.timeline()
const initGsap = async () => {
    t1.fromTo(
        '.bg',
        {
            opacity: 0,
        },
        {
            duration: 1,
            delay: 0,
            opacity: 1,
        },
    )
    t1.fromTo(
        '.main-wrap',
        {
            opacity: 0,
            yPercent: -100,
        },
        {
            yPercent: 0,
            duration: 1,
            delay: 0,
            opacity: 1,
        },
    )
}

onMounted(async () => {
    await nextTick()
    await initGsap()
})
</script>

<style scoped>
.bg {
    background-image: url('images/register-bg.png');
    @apply bg-cover;
    height: 100dvh;
}
.main-wrap {
    background: linear-gradient(0deg, rgba(48, 49, 50, 0.6), rgba(48, 49, 50, 0.6)),
        linear-gradient(308.46deg, rgba(0, 0, 0, 0.3) 0.66%, rgba(0, 0, 0, 0) 81.73%);
}
</style>
