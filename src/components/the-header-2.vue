<template>
    <div class="container py-8">
        <div class="flex h-[48px] justify-between">
            <img src="/images/register-logo.png" alt="" />
            <div class="flex space-x-10">
                <button type="button" class="flex items-center gap-x-2 hover:text-primary">
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

<script setup></script>

<style scoped>
i {
    @apply text-[32px];
}
</style>
