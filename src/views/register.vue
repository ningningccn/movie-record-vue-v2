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
                    <div class="mt-[104px] text-center text-[32px] font-bold">用戶註冊</div>
                    <div class="mt-8 space-y-6">
                        <Input :placeholder="'帳戶名稱/電郵'" v-model:text="email" />
                        <Input :placeholder="'密碼'" :type="'password'" v-model:text="password" />
                    </div>
                    <Button :text="'註冊'" class="mt-8" :disable="isValid" @click="register()" />

                    <div class="text-body-s mt-8 text-center">
                        還未有帳戶?立即
                        <router-link to="/login" class="text-primary underline"> 登入 </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'

import { ref, computed, onMounted, nextTick } from 'vue'
import { createAccount } from '@/api/api.js'

import gsap from 'gsap'

const email = ref('')
const password = ref('')

const isValid = computed(() => {
    return email.value.length > 0 && password.value.length > 0
})

const register = () => {
    createAccount(email.value, password.value)
}

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
