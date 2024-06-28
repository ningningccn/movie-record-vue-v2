<template>
    <div class="container py-6 transition-all duration-500 md:py-8">
        <div class="flex h-[32px] justify-between md:h-[48px]">
            <img src="/images/register-logo.png" alt="" />
            <div class="hidden space-x-10 md:flex">
                <button
                    type="button"
                    class="flex items-center gap-x-2 hover:text-primary"
                    @click="openAddRecord()"
                >
                    <i class="icon-plus-square"></i>
                    添加
                </button>
                <button type="button" class="flex items-center gap-x-2">
                    <i class="icon-search"></i>
                    搜尋
                </button>
                <button
                    type="button"
                    class="flex items-center gap-x-[10px] rounded-lg border border-primary px-6 py-2 text-primary"
                >
                    <i class="icon-sign-in"></i>
                    登出
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModal } from 'vue-final-modal'
import AddRecord from '@/components/header/add-record.vue'

const AddRecordModal = useModal({
    component: AddRecord,
    attrs: {
        // title: 'Hello World!',
        // onConfirm() {
        //     close()
        // },
    },
})

const openAddRecord = () => {
    AddRecordModal.open()
    console.log('test open')
}
</script>

<style scoped>
i {
    @apply text-[32px];
}
</style>
