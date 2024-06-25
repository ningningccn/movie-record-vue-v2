<template>
    <VueFinalModal class="relative mx-auto" content-class="bg-[#30313299]  h-full">
        <!-- content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2" -->
        <div
            class="main-gradient relative mx-auto w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-20"
        >
            <div>
                <p class="text-heading-s">添加記錄</p>
                <div class="mt-8">
                    <input
                        type="text"
                        class="h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                        placeholder="帳戶名稱/電郵"
                    />
                    <input
                        type="text"
                        class="h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                        placeholder="密碼"
                    />
                    <input
                        type="text"
                        class="h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                        placeholder="帳戶名稱/電郵"
                    />
                    <input
                        type="text"
                        class="mt-6 h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                        placeholder="密碼"
                    />
                </div>
                <div>123</div>
            </div>
            123
            <!-- <button class="ml-auto mt-1 rounded-lg border px-2" @click="emit('confirm')">
                Confirm
            </button> -->
            <div class="absolute right-16 top-20">X</div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
</script>

<style scoped>
:deep(.vfm--overlay) {
    /* @apply bg-[#303132] opacity-80;
     */
}
</style>
