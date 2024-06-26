<template>
    <div class="flex items-center">
        <i class="icon-search text-[48px]"></i>
        <div>
            <input
                type="text"
                class="text-body-xxl-medium w-full bg-transparent text-white placeholder:text-enable focus:outline-none"
                placeholder="輸入關鍵字"
                v-model="search"
            />
        </div>
        <button type="button" @click="emit('searchClick')">Search</button>
    </div>
</template>

<script setup>
const emit = defineEmits(['searchClick'])
const search = defineModel('search')
</script>

<style lang="scss" scoped></style>
