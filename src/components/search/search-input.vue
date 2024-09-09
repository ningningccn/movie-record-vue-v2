<template>
    <div class="flex items-center">
        <i class="icon-search text-[48px]"></i>
        <input
            type="text"
            class="text-body-xxl-medium w-full bg-transparent text-white placeholder:text-enable focus:outline-none md:ml-4"
            placeholder="輸入關鍵字"
            v-model="search"
            ref="searchInputRef"
            @keyup.enter="emit('searchClick')"
        />
        <div class="w-[45px] overflow-hidden">
            <button
                type="button"
                class="flex items-center transition-transform duration-300"
                :class="[{ 'translate-x-10': !showClose }]"
                @click="clearSearch()"
            >
                <i class="icon-close text-[32px]"></i>
            </button>
        </div>
        <button type="button" @click="emit('searchClick')" class="rounded-[8px] border px-4 py-2">
            Search
        </button>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const emit = defineEmits(['searchClick'])
const search = defineModel('search')
const showClose = ref(false)
const searchInputRef = ref(null)
watch(
    () => search.value,
    (newValue) => {
        if (newValue?.length > 0) showClose.value = true
        else showClose.value = false
    },
)
const clearSearch = () => (search.value = '')

onMounted(() => {
    searchInputRef.value.focus()
})
</script>

<style lang="scss" scoped></style>
